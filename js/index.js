import { dataTypesDemo } from "./01-data-types.js";
import { createAccount } from "./02-closure.js";
import { flattenIterative } from "./flattenedArray.js";

// dataTypesDemo();


// Closure Example
// const myAccount = createAccount(1000);
// myAccount.deposit(500);       // Deposited: ₹500, New Balance: ₹1500
// myAccount.withdraw(300);      // Withdrawn: ₹300, Remaining Balance: ₹1200
// console.log(myAccount.getBalance()); // 1200


const nested = [1, [2, [3, [4, 5]]]];
console.log(flattenIterative(nested)); 