// calculate mortgage based on mortgageAmount, mortgageTerm, mortgageDuration:years or months and interestRate

export type MortgageT = ReturnType<typeof calculateMortgageFormula>;

export function calculateMortgageFormula(
 mortgageAmount: number,
 mortgageTermInMonths: number,
 annualInterestRate: number
) {
 // Validate inputs
 if (mortgageAmount < 0 || mortgageTermInMonths < 0 || annualInterestRate < 0) {
  console.error("Invalid input values");
  return { monthlyPayment: null, totalMortgage: null, mortgageTermInMonths: 0 };
 }

 const monthlyInterestRate = (annualInterestRate / 12) * 0.01; // Corrected calculation
 const numberOfPayments = mortgageTermInMonths;

 if (numberOfPayments === 0) {
  console.error("Mortgage term cannot be zero");
  return { monthlyPayment: null, totalMortgage: null, mortgageTermInMonths: 0 };
 }

 const monthlyPayment =
  (mortgageAmount *
   (monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
  (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

 const totalMortgage = Number((monthlyPayment * numberOfPayments).toFixed(2));

 return {
  monthlyPayment,
  totalMortgage,
  mortgageTermInMonths,
 };
}

export function formatNumbertoCurrency(number: number, currency: string) {
 let currencyFormat: string = "USD";

 switch (currency) {
  case "₦":
   currencyFormat = "NGN";
   break;
  case "€":
   currencyFormat = "EUR";
   break;
  case "₹":
   currencyFormat = "INR";
   break;
  case "KES":
   currencyFormat = "KES";
   break;
  case "$":
   currencyFormat = "USD";
   break;
  case "£":
   currencyFormat = "GBP";
   break;
  default:
   currencyFormat = "USD";
   break;
 }

 const formattedNumber = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: currencyFormat,
  style: "currency",
 }).format(number);

 return currency ? currency : "$" + " " + formattedNumber.toString();
}

// test
function mortgageFormulaTest() {
 const mortgageAmount = 4000;
 const mortgageTerm = 3 * 12;
 const interestRate = 2.56;

 const result = calculateMortgageFormula(
  mortgageAmount,
  mortgageTerm,
  interestRate
 );

 //  console.log(result);

 //  console.log(formatNumbertoCurrency(result.monthlyPayment, "$"));
}

mortgageFormulaTest();
