import { dataTypesDemo } from "./01-data-types.js";
import { createAccount } from "./02-closure.js";
import { flattenIterative } from "./flattenedArray.js";
import { customMap } from "./custom-js-functions/customMap.js"

// dataTypesDemo();


// Closure Example
// const myAccount = createAccount(1000);
// myAccount.deposit(500);       // Deposited: ₹500, New Balance: ₹1500
// myAccount.withdraw(300);      // Withdrawn: ₹300, Remaining Balance: ₹1200
// console.log(myAccount.getBalance()); // 1200


// Flattened Array Example
// const nested = [1, [2, [3, [4, 5]]]];
// console.log(flattenIterative(nested)); 


// Custom Map Example
// const numbers = [1, 2, 3];
// const doubled = customMap(numbers, num => num * 2);
// console.log(doubled);


// prototype map example
Array.prototype.customMap = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

const numbers = [1, 2, 3];
const doubled = numbers.customMap(num => num * 2);
console.log(doubled); // [2, 4, 6]
