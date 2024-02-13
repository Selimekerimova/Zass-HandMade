// let addBtn = document.querySelector(".addBtn");
const form = document.querySelector("form");
const name = document.getElementById("name");
const address = document.getElementById("address");
const cardNumber = document.getElementById("card-number");
const expiryDate = document.getElementById("expiry-date");
const cvv = document.getElementById("cvv");

// aos
AOS.init();

// form vali
// function validateFormData(data) {
//     if (!data.cardNumber || data.cardNumber.length !== 16) {
//       alert("Please enter a valid card number.");
//       return false;
//     }
//     if (!data.expiryDate || data.expiryDate.length !== 5) {
//       alert("Please enter a valid expiry date in the format MM/YY.");
//       return false;
//     }
//     if (!data.cvv || data.cvv.length !== 3) {
//       alert("Please enter a valid CVV.");
//       return false;
//     }
//     return true;
//   }