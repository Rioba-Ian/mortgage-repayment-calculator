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

export default function Form() {
 return (
  <form action="" class="flex flex-col gap-6 my-2">
   <TextFieldRoot>
    <TextFieldLabel>Mortgage Amount</TextFieldLabel>
    <TextField type="number" placeholder="" />
   </TextFieldRoot>

   <TextFieldRoot>
    <TextFieldLabel>Mortgage Term</TextFieldLabel>
    <TextField type="number" placeholder="" />
   </TextFieldRoot>

   <TextFieldRoot>
    <TextFieldLabel>Interest Rate</TextFieldLabel>
    <TextField type="number" placeholder="" />
   </TextFieldRoot>

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

   <Button class="bg-mortgagelime text-darkslate py-2 px-6 rounded-3xl flex items-center gap-2 mx-auto">
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
