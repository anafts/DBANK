 import { dbank } from "../../declarations/dbank";

 window.addEventListener("load", async function(){
   update();
 });

 document.querySelector('form').addEventListener("submit" , async function(event){
   event.preventDefault();

   const button = event.target.querySelector('#submit-btn');

   button.setAttribute("disabled" , true);

   const inputAmount = parseFloat(document.querySelector('#input-amount').value);
   const inputWithdrawal = parseFloat(document.querySelector('#withdrawal-amount').value);

   const topUpAmount = parseFloat(document.getElementById("input-amount").value); 
    if (!isNaN(topUpAmount)) {
    await dbank.topUp(topUpAmount);
   };

   if (document.querySelector('#withdrawal-amount').value.length != 0) {
      await dbank.withdrawal(inputWithdrawal);
   };

   await dbank.compound();

   update();
   document.querySelector('#input-amount').value = "";
   document.querySelector('#withdrawal-amount').value = "";

   button.removeAttribute("disabled");
 });

  async function update() {
   const currentAmount = await dbank.checkBalance();
   document.querySelector('#value').innerHTML = Math.round(currentAmount * 100 / 100);
  };
