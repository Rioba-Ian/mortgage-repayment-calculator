import Form from "@/components/MortgageForm";
import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import mortgage from "@/store/mortgage";

export default function Home() {
 const [calculatedMortgage] = createSignal(0);

 console.log(calculatedMortgage(), "calculatedMortgage>>>>>><<<<<<");

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

     <Form finalValue={calculatedMortgage()} />
    </section>

    <section class="bg-darkslate basis-1/2 text-white flex flex-col gap-4 items-center md:justify-center p-8 md:rounded-r-3xl md:rounded-bl-3xl">
     <img src="/illustration-empty.svg" />
     <h2 class="text-xl">Results shown here</h2>
     <p class="text-slate-300 text-center text-sm w-4/5">
      Complete the form and click "calculate repayments" to see what your
      monthly repayments would be.
     </p>
    </section>
   </div>
  </main>
 );
}

function Results() {
 return (
  <article>
   <h3 class="text-lg md:text-xl text-slate-100 font-medium">Your results</h3>
   <p>
    Your results Your results are shown below based on the information you
    provided. To adjust the results, edit the form and click “calculate
    repayments” again.
   </p>

   <div id="card" class="divide-y divide-slate-600">
    <div>
     <span class="text-sm text-slate-300">Your monthly repayments</span>
     <h4 class="text-mortgagelime text-3xl md:text-4xl font-bold">
      $ 1,797.74
     </h4>
    </div>

    <div>
     <span>Total you'll repay over the term</span>
     <h4>$ 1797.74</h4>
    </div>
   </div>
  </article>
 );
}

/*
<h2>Your results</h2>
     <p>
      Your results Your results are shown below based on the information you
      provided. To adjust the results, edit the form and click “calculate
      repayments” again.
     </p>

     <article>
      <span>Your monthly repayments</span>
      <h3>$ 1797.74</h3>
      <div>
       <span>Total you'll repay over the term</span>
       <h4>$ 1797.74</h4>
      </div>
     </article>
*/
