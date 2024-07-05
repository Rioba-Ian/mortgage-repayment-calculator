import { createSignal, createMemo, createRoot } from "solid-js";

function Mortgages() {
 const [mortgageForm, setMortgageForm] = createSignal({
  mortgageAmount: "",
  mortgageAmountCurrency: "£",
  mortgageTerm: "",
  mortgageTermDuration: "",
  interestRateAmount: 0,
 });
 const [calculatedMortgage, setCalculatedMortgage] = createSignal(0);

 return {
  mortgageForm,
  setMortgageForm,
  calculatedMortgage,
  setCalculatedMortgage,
 };
}

export default createRoot(Mortgages);
