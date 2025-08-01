What is Currying?

Currying is a technique where a function with multiple arguments is transformed into a series of functions, each taking one argument at a time.

Why Use Currying?

- Reusability: You can create partially applied functions

- Composability: Easily compose small reusable functions

- Clean code: Logic is separated into small steps

- Common in functional libraries (like Lodash, Ramda)

Simple Example Without Currying:

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

Same Example With Currying:

```js
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

console.log(curriedAdd(2)(3)); // 5
```

Now, `curriedAdd(2)` returns a function that waits for the second value.

You can even do:

```js
const add2 = curriedAdd(2);
console.log(add2(10)); // 12
```

Real-World Motivation

Suppose you want to filter a list of items by a category.

```js
function filterByCategory(category, item) {
  return item.category === category;
}
```

with currying:

```js
function filterByCategory(category) {
  return function(item) {
    return item.category === category;
  };
}

const fruitsOnly = items.filter(filterByCategory("fruit"));
```
*This is now reusable, composable, and clean.*

Custom Curry Implementation

Let’s write a general-purpose curry function.

```js
function curry(fn) {
  return function curried(...args) {           // Step 1: collect args
    if (args.length >= fn.length) {            // Step 2: check if enough
      return fn.apply(this, args);             // Step 3: call original
    } else {
      return function (...nextArgs) {          // Not enough → return new fn
        return curried.apply(this, args.concat(nextArgs)); // Keep collecting
      };
    }
  };
}
```

Example Use:

```js
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24
```

Another way to call:

```js
// Usage
const curriedMultiply = curry(multiply);

// Call chain: Step-by-step
const step1 = curriedMultiply(2);       // curried(...args = [2]) → not enough, returns a new function
const step2 = step1(3);                 // curried(...args = [2, 3]) → not enough, returns another function
const result = step2(4);                // curried(...args = [2, 3, 4]) → enough args → multiply(2, 3, 4) → 24

console.log(result); // Output: 24
```
*This works because the curry() function keeps collecting arguments until all required are received, then executes.*

Visual Flow:

```js
curriedMultiply(2)
// returns function expecting b
→ (3)
// returns function expecting c
→ (4)
// all arguments present → returns result = 24
```

Advanced Use: Currying + Partial Application

```js
const greet = (greeting) => (name) => `${greeting}, ${name}!`;

const sayHello = greet("Hello");
console.log(sayHello("Amber")); // Hello, Amber!
console.log(sayHello("Khan"));  // Hello, Khan!
```

Summary:

| Term         | Meaning                                                                                |
| ------------ | -------------------------------------------------------------------------------------- |
| **Currying** | Break a multi-arg function into a chain of one-arg functions                           |
| **Why**      | Clean code, reusability, functional style                                              |
| **How**      | Use nested functions or curry utility                                                  |
| **Where**    | Useful in higher-order functions, partial application, React handlers, functional libs |


