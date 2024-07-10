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
import { For, ValidComponent, createEffect, createSignal } from "solid-js";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { action, useSubmission } from "@solidjs/router";
import { Calculator, LoaderCircle } from "lucide-solid";
import mortgage from "@/store/mortgage";
import { MortgageT, calculateMortgageFormula } from "@/libs/mortgage";

const calculateMortgage = action(async (formData: FormData) => {
 "use server";
 await new Promise((resolve, reject) => setTimeout(resolve, 1000));

 let months: number = 0;
 let interestRateWhenMonths: number = 0;
 const mortgageAmount = Number(formData.get("mortgageAmount"));
 const mortgageAmountCurrency = formData.get(
  "mortgageAmountCurrency"
 ) as string;
 const mortgageTerm = Number(formData.get("mortgageTerm"));
 const mortgageTermDuration = formData.get("mortgageTermDuration") || "years";
 const interestRateAmount = Number(formData.get("interestRateAmount"));

 console.log(
  mortgageAmount,
  mortgageTerm,
  interestRateAmount,
  mortgageTermDuration,
  mortgageAmountCurrency,
  "form data>>>>"
 );

 if (!mortgageAmount || !mortgageTerm || !interestRateAmount) {
  throw new Error(
   "mortgageAmount, mortgageTerm, interestRateAmount are required"
  );
 }

 if (mortgageTermDuration === "years") {
  months = mortgageTerm * 12;
 }

 if (mortgageTermDuration === "months") {
  interestRateWhenMonths = interestRateAmount / 12;
 }

 const result = calculateMortgageFormula(
  mortgageAmount,
  months,
  mortgageTermDuration === "months"
   ? interestRateWhenMonths
   : interestRateAmount
 ) satisfies MortgageT;

 console.log(result, "result from after action>>>>");

 return { result, mortgageAmountCurrency };
});

export default function Form() {
 const { calculatedMortgage, setCalculatedMortgage, setSelectedCurrency } =
  mortgage;
 const calculateMortgageAction = useSubmission(calculateMortgage);

 createEffect(() => {
  if (calculateMortgageAction.result) {
   setCalculatedMortgage(calculateMortgageAction.result.result);
   setSelectedCurrency(calculateMortgageAction.result.mortgageAmountCurrency);
  }

  console.log(calculateMortgageAction.result, "inside effect >>>");
 }, [calculateMortgageAction.pending]);

 console.log(calculateMortgageAction.result, "form result>>>>");

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
      options={["$"]}
      name="mortgageAmountCurrency"
      itemComponent={(props) => (
       <SelectItem item={props.item} value={props.item.rawValue}>
        {props.item.rawValue}
       </SelectItem>
      )}
      defaultValue={"$"}
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
       options={["years"]}
       itemComponent={(props) => (
        <SelectItem item={props.item} value={props.item.rawValue}>
         {props.item.rawValue}
        </SelectItem>
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
    {calculateMortgageAction.pending ? (
     <LoaderCircle class="animate-spin" />
    ) : (
     <Calculator class="text-slate-600 hover:text-white" />
    )}
    <span>Calculate Repayments</span>
   </Button>
  </form>
 );
}
