import {
 TextField,
 TextFieldRoot,
 TextFieldLabel,
} from "@/components/ui/textfield";
import {
 RadioGroup,
 RadioGroupItem,
 RadioGroupItemControl,
 RadioGroupItemLabel,
} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { For } from "solid-js";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { action, redirect } from "@solidjs/router";

const calculateMortgage = action(async (formData: FormData) => {
 "use server";
 await new Promise((resolve, reject) => setTimeout(resolve, 1000));

 const mortgageAmount = formData.get("mortgageAmount");
 const mortgageAmountCurrency = formData.get("mortgageAmountCurrency");
 const mortgageTerm = formData.get("mortgageTerm");
 const mortgageTermDuration = formData.get("mortgageTermDuration");
 const interestRateAmount = formData.get("interestRateAmount");

 console.log(
  mortgageAmount,
  mortgageAmountCurrency,
  mortgageTerm,
  mortgageTermDuration,
  interestRateAmount
 );
});

export default function Form() {
 return (
  <form
   action={calculateMortgage}
   method="post"
   class="flex flex-col gap-6 my-2 text-slate-500"
  >
   <TextFieldRoot>
    <TextFieldLabel>Mortgage Amount</TextFieldLabel>
    <div class="flex items-center border border-input rounded-md focus-visible:ring-[1.5px] focus-visible:ring-ring">
     <Select
      options={["₦", "€", "₹", "KES", "$", "£"]}
      itemComponent={(props) => (
       <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
      defaultValue={"£"}
      name="mortgageAmountCurrency"
     >
      <SelectTrigger>
       <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent />
     </Select>
     <TextField
      class="border-none"
      type="text"
      name="mortgageAmount"
      placeholder=""
      required
     />
    </div>
   </TextFieldRoot>

   <div class="md:flex items-center justify-between gap-8">
    <TextFieldRoot>
     <TextFieldLabel>Mortgage Term</TextFieldLabel>
     <div class="flex items-center border border-input rounded-md focus-visible:ring-[1.5px] focus-visible:ring-ring">
      <TextField
       class="border-none"
       type="text"
       name="mortgageTerm"
       placeholder=""
       required
      />
      <Select
       options={["years", "months"]}
       itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
       )}
       defaultValue={"years"}
       class="border-r-0"
       name="mortgageTermDuration"
      >
       <SelectTrigger>
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
       </SelectTrigger>
       <SelectContent />
      </Select>
     </div>
    </TextFieldRoot>

    <TextFieldRoot class="">
     <TextFieldLabel>Interest Rate</TextFieldLabel>
     <div class="flex items-center border border-input rounded-md focus-visible:ring-[1.5px] focus-visible:ring-ring">
      <TextField
       class="border-none"
       name="interestRateAmount"
       type="text"
       placeholder=""
       required
      />

      <Select
       options={["%"]}
       itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
       )}
       defaultValue={"%"}
       class="border-l-0"
      >
       <SelectTrigger>
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
       </SelectTrigger>
       <SelectContent />
      </Select>
     </div>
    </TextFieldRoot>
   </div>

   <TextFieldRoot>
    <TextFieldLabel>Mortgage Type</TextFieldLabel>

    <RadioGroup defaultValue="Orange" class="grid gap-2">
     <For each={["Repayment", "Interest Only"]}>
      {(type) => (
       <RadioGroupItem
        value={type}
        class="flex items-center gap-2 py-1.5 px-2 border border-input rounded-md data-[checked]:bg-mortgagelime/30 data-[checked]:border-mortgagelime"
       >
        <RadioGroupItemControl class="" />
        <RadioGroupItemLabel class="text-sm">{type}</RadioGroupItemLabel>
       </RadioGroupItem>
      )}
     </For>
    </RadioGroup>
   </TextFieldRoot>

   <Button
    class="bg-mortgagelime text-darkslate hover:text-mortgagelime py-2 px-6 rounded-3xl flex items-center gap-2 mx-auto"
    type="submit"
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     fill="none"
     viewBox="0 0 24 24"
    >
     <path
      fill="#133041"
      d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
     />
    </svg>
    <span>Calculate Repayments</span>
   </Button>
  </form>
 );
}
