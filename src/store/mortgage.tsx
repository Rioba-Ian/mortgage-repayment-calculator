import { MortgageT } from "@/libs/mortgage";
import { createSignal, createMemo, createRoot } from "solid-js";

function Mortgages() {
 const [calculatedMortgage, setCalculatedMortgage] = createSignal<MortgageT>({
  monthlyPayment: 0,
  totalMortgage: 0,
  mortgageTermInMonths: 0,
 });

 const [selectedCurrency, setSelectedCurrency] = createSignal<string>("Dollar");

 return {
  selectedCurrency,
  setSelectedCurrency,
  calculatedMortgage,
  setCalculatedMortgage,
 };
}

export default createRoot(Mortgages);
