// calculate mortgage based on mortgageAmount, mortgageTerm, mortgageDuration:years or months and interestRate

export function calculateMortgageFormula(
 mortgageAmount: number,
 mortgageTermInMonths: number,
 interestRate: number
) {
 const mortgageTermInYears = mortgageTermInMonths / 12;

 return mortgageAmount * (1 + interestRate / 100) ** (mortgageTermInYears * 12);
}

function mortgageFormulaTest() {
 const mortgageAmount = 1500;
 const mortgageTerm = 24;
 const interestRate = 2;

 const result = calculateMortgageFormula(
  mortgageAmount,
  mortgageTerm,
  interestRate
 );

 console.log(result);
}

mortgageFormulaTest();
