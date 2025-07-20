export function dataTypesDemo() {

// Primitive types in JS
let name = "Amber";      // string
let age = 25;            // number
let isActive = true;     // boolean
let nothing = null;      // null
let notDefined;          // undefined
let symbol1 = Symbol("id"); // symbol

console.log(typeof name);       // string
console.log(typeof age);        // number
console.log(typeof isActive);   // boolean
console.log(typeof nothing);    // object (weird JS behavior)
console.log(typeof notDefined); // undefined
console.log(typeof symbol1);    // symbol

}