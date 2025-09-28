import { dataTypesDemo } from "./01-data-types.js";
import { createAccount } from "./02-closure.js";
import { flattenIterative } from "./flattenedArray.js";
import { customMap } from "./custom-js-functions/customMap.js"
import { customFilter } from "./custom-js-functions/customMap.js";
import { findDuplicate } from "./findDuplicate.js";
import { curry } from "./currying.js";
import { countFrequencies } from "./countFrequencies.js";
import { countFrequenciesWithReduce } from "./countFrequencies.js";
import { customForEach } from "./custom-js-functions/customForEach.js";
import { groupByCity, groupByCityWithReduce } from "./groupArray.js";

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

// customForEach Example
// const arr = [10, 20, 30];
// customForEach(arr, (value, index) => {
//   console.log(`Index: ${index}, Value: ${value}`);
// });

// groupByCity Example
// const people = [
//   { name: 'Alice', city: 'New York' },
//   { name: 'Bob', city: 'London' },
//   { name: 'Charlie', city: 'New York' },
//   { name: 'David', city: 'London' },
//   { name: 'Eve', city: 'Paris' }
// ];
// const grouped = groupByCityWithReduce(people);
// console.log(grouped);

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


// Count Frequencies Example
// Example usage:
// const input2 = [1,1,2,3,4,4,5,5,5];
// const input = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
// const output = countFrequenciesWithReduce(input);
// console.log(output); // { apple: 3, banana: 2, orange: 1 }


// customForEach proto Example
Array.prototype.customForEachProto = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }     
};

const arr = [10, 20, 30];
arr.customForEachProto((value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
});