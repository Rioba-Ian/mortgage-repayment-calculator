import Form from "@/components/MortgageForm";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
 JSX,
 Component,
 Show,
 createResource,
 createSignal,
 createEffect,
} from "solid-js";
import mortgage from "@/store/mortgage";
import { formatNumbertoCurrency } from "@/libs/mortgage";

export default function Home() {
 const { calculatedMortgage } = mortgage;

 return (
  <main class="sm:container min-h-screen mx-auto text-slate-700 flex flex-col items-center justify-center bg-background">
   <div
    id="main-container"
    class="md:w-3/4 min-h-screen relative sm:min-h-fit flex flex-col sm:flex-row sm:justify-start  "
   >
    <section class="bg-white relative p-6 basis-1/2 rounded-l-3xl  md:before:content-[''] before:absolute before:bg-transparent before:-bottom-[50px] before:-right-[25px] before:h-[50px] before:w-[25px] before:rounded-bl-[25px] before:shadow-[0_-25px_0px_0px_#133040]">
     <header class="md:flex items-center justify-between py-4">
      <h1 class="text-2xl md:text-3xl font-bold text-slate-700">
       Mortgage Calculator
      </h1>
      <A title="Clear All" class="underline text-sm" href="/">
       Clear All
      </A>
     </header>

     <Form />
    </section>

    <section class="bg-darkslate basis-1/2  md:rounded-r-3xl md:rounded-bl-3xl">
     <Show
      when={
       calculatedMortgage().monthlyPayment &&
       calculatedMortgage().mortgageTermInMonths > 0
      }
      fallback={<Instructions />}
     >
      <Results />
     </Show>
    </section>
   </div>
  </main>
 );
}

function Instructions(): JSX.Element {
 return (
  <article class="text-white flex flex-col gap-4 items-center md:justify-center p-8">
   <img
    src="/illustration-empty.svg"
    alt="empty illustration for purposes of placeholder of a form not yet submitted."
   />
   <h2 class="text-xl">Results shown here</h2>
   <p class="text-slate-300 text-center text-sm w-4/5">
    Complete the form and click "calculate repayments" to see what your monthly
    repayments would be.
   </p>
  </article>
 );
}

function Results() {
 const { calculatedMortgage, selectedCurrency } = mortgage;

 createEffect(() => {
  console.log(calculatedMortgage(), "results>>>>");
  console.log(selectedCurrency(), "selectedCurrency>>>>");
 });

 return (
  <article class="text-white flex flex-col gap-4  md:justify-center p-8 md:space-y-8">
   <div class="space-y-2">
    <h3 class="text-lg md:text-xl text-slate-100 font-medium">Your results</h3>
    <p class="text-slate-300 text-sm">
     Your results Your results are shown below based on the information you
     provided. To adjust the results, edit the form and click “calculate
     repayments” again.
    </p>
   </div>

   <div
    id="card"
    class="divide-y bg-verydarkslate p-6  border-t-4 border-t-mortgagelime rounded-xl divide-slate-600"
   >
    <div class="">
     <span class="text-sm text-slate-300">Your monthly repayments</span>
     <h4 class="text-mortgagelime text-4xl md:text-5xl font-bold py-4">
      {selectedCurrency()} {calculatedMortgage().monthlyPayment?.toFixed(2)}
     </h4>
     <pre class="text-mortgagelime text-sm bg-darkslate">
      {JSON.stringify(calculatedMortgage(), null, 2)}
     </pre>
    </div>

    <div class="py-4 md:space-y-4">
     <span class="text-sm  text-slate-400">
      Total you'll repay over the term
     </span>
     <h4 class="text-2xl md:text-3xl font-medium">
      {selectedCurrency()} {calculatedMortgage().totalMortgage?.toFixed(2)}
     </h4>
    </div>
   </div>
  </article>
 );
}
