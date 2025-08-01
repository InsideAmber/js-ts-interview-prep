import { dataTypesDemo } from "./01-data-types.js";
import { createAccount } from "./02-closure.js";
import { flattenIterative } from "./flattenedArray.js";
import { customMap } from "./custom-js-functions/customMap.js"
import { customFilter } from "./custom-js-functions/customMap.js";
import { findDuplicate } from "./findDuplicate.js";
import { curry } from "./currying.js";

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


// Custom Filter Example
// const nums = [1, 2, 3, 4, 5];
// const evenNumbers = customFilter(nums, num => num % 2 === 0);
// console.log(evenNumbers); 


// findDuplicate Example
// const numbers = [1, 2, 3, 4, 5, 3, 2];
// const duplicates = findDuplicate(numbers);
// console.log(duplicates);


// Currying Example
// function multiply(a, b, c) {
//   return a * b * c;
// }
// const curriedMultiply = curry(multiply);
// Call chain: Step-by-step
// const result = curriedMultiply(2)(3)(4);  
// const step2 = step1(3);                 
// const result = step2(4);            
// console.log(result);


// prototype map example
// Array.prototype.customMap = function (callback) {
//   const result = [];

//   for (let i = 0; i < this.length; i++) {
//     result.push(callback(this[i], i, this));
//   }

//   return result;
// };

// const numbers = [1, 2, 3];
// const doubled = numbers.customMap((num) => num * 2);
// console.log(doubled);
