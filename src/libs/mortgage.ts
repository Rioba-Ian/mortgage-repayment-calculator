// calculate mortgage based on mortgageAmount, mortgageTerm, mortgageDuration:years or months and interestRate

export type MortgageT = ReturnType<typeof calculateMortgageFormula>;

export function calculateMortgageFormula(
 mortgageAmount: number,
 mortgageTermInMonths: number,
 annualInterestRate: number
) {
 const monthlyInterestRate = annualInterestRate / 100 / 12;

 const numberOfPayments = mortgageTermInMonths;

 const monthlyPayment =
  (mortgageAmount *
   (monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
  (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

 const totalMortgage = monthlyPayment * mortgageTermInMonths;

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

 return new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currency: currencyFormat,
 }).format(number);
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

 console.log(result);

 console.log(formatNumbertoCurrency(result.monthlyPayment, "$"));
}

mortgageFormulaTest();
