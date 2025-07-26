
## 1. What's the difference between var, let, and const? 

In JavaScript, var, let, and const are used to declare variables, but they differ in terms of scope, hoisting, and mutability:

   1. 🧠 Scope
      
      - `var` is function-scoped.
      - `let` and `const` are block-scoped (i.e., limited to {} blocks like `if`, `for`, `while`, etc.)

   📌 Example:
   
   ```js
    function testScope() {
    if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
     }
      console.log(a); // ✅ 10 (function scoped)
      console.log(b); // ❌ ReferenceError (block scoped)
      console.log(c); // ❌ ReferenceError (block scoped)
    }
    testScope();
   ```
    
   2. ⬆️ Hoisting

      - `var` declarations are hoisted and initialized with undefined.
      - `let` and `const` are hoisted too, but stay in a "temporal dead zone" (TDZ) until the actual line of declaration.

   📌 Example:
   
   ```js
     console.log(x); // undefined
     var x = 5;
     console.log(y); // ❌ ReferenceError
     let y = 10;
   ```

    3. 🔐 Re-declaration and Re-assignment

    | Keyword | Re-declaration   | Re-assignment  |
    | ------- | --------------   | -------------  |
    | `var`   | ✅ Allowed      | ✅ Allowed     |
    | `let`   | ❌ Not Allowed  | ✅ Allowed     |
    | `const` | ❌ Not Allowed  | ❌ Not Allowed |

   Note:
   `const` only prevents reassignment of the variable, not mutation of the object or array it holds.

   📌 Example:
   
   ```js
    const obj = { name: "Amber" };
    obj.name = "John"; // ✅ Allowed (mutation)
    obj = {}; // ❌ TypeError
   ```
 
## 2. What are Closures in JavaScript?

1. Definition:

    A closure is the combination of a function and the lexical environment within which that function was declared.

    **In simple words**:
    A closure gives you access to an outer function’s variables even after the outer function has finished executing.

    Example to Understand Closures -
   
      ```js
          function outer() {
             let counter = 0;
             return function inner() {
                 counter++;
                 console.log(`Counter: ${counter}`);
             }
          }
          const increment = outer(); // outer() returns inner function
          increment(); // Counter: 1
          increment(); // Counter: 2
          increment(); // Counter: 3
      ```

2. Explanation

      - `outer()` creates a variable counter.
      - It returns the `inner()` function, which remembers counter even after `outer()` has finished.
      - That memory is a closure — it keeps counter alive in the scope chain.

    Real-World Use Case: Private Variables
    Closures can be used to create private variables, like in a counter, shopping cart, or bank account.
    
   [Closure Code Example](https://github.com/InsideAmber/js-ts-interview-prep/blob/master/js/02-closure.js)


## 3. What is Hoisting?

Hoisting is JavaScript's default behavior of moving declarations (not initializations) to the top of their scope (global or function) before code execution.

**Think of it like this**:

During the compilation phase, JavaScript scans for variable and function declarations and “hoists” them to the top of their scope.

`var` Hoisting Example:

```js
console.log(a); // undefined
var a = 5;
```
Behind the scenes:

```js
var a;
console.log(a); // undefined
a = 5;
```

`let` and `const` Hoisting (TDZ – Temporal Dead Zone):

```js
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

Variables declared with `let` and `const` are hoisted, but not initialized, so they live in the TDZ until the line of declaration.

Function Declaration Hoisting:

```js
sayHi(); // ✅ "Hi!"

function sayHi() {
  console.log("Hi!");
}
```

Behind the scenes:

 - The entire function is hoisted (both name and body).

 Function Expression Hoisting:

 ```js
 greet(); // ❌ TypeError: greet is not a function

var greet = function () {
  console.log("Hello!");
};
```

Why?

 - Only `var` greet is hoisted (as undefined)

 - `greet()` becomes `undefined()` → ❌ TypeError

Real Interview Example: Order of Execution:

```js
    console.log(name);       // undefined
    var name = "Amber";

    hello();                // ✅ prints Hello!
    function hello() {
        console.log("Hello!");
    }

    bye();                  // ❌ TypeError: bye is not a function
    var bye = function () {
    console.log("Bye!");
    };
```

### Summary:

| Type                  | Hoisted?            | Initialized?   | Access Before Init                     |
| --------------------- | ------------------  | ------------   | -------------------------------------  |
| `var`                 | ✅ Yes              | ✅ undefined  | ✅ Returns `undefined`                 |
| `let` / `const`       | ✅ Yes              | ❌ No         | ❌ ReferenceError (TDZ)                |
| `function`            | ✅ Yes              | ✅ Yes        | ✅ Safe to call                        |
| `function expression` | ✅ Var hoisted only | ❌ No         | ❌ TypeError if used before definition |

## 4. What is Event Delegation?

Event Delegation is a pattern in JavaScript where you attach a single event listener to a parent element, and handle events for its child elements through event bubbling.

🧠 Why is it Useful?

- ✅ Performance: Reduces the number of event listeners in the DOM.

- ✅ Dynamic Elements: Handles elements that are added to the DOM later.

- ✅ Cleaner Code: No need to manually bind/unbind listeners for individual child elements.

Example:

Let’s say you have a list of items, and you want to respond to clicks on each `<li>`.

❌ Without Event Delegation (inefficient):

```js
<ul id="fruit-list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>

<script>
  document.querySelectorAll('#fruit-list li').forEach(item => {
    item.addEventListener('click', () => {
      console.log(item.textContent);
    });
  });
</script>
```
💥 Problem: If more `<li>`s are added dynamically, they won’t have listeners.

✅ With Event Delegation (efficient):

```js
<ul id="fruit-list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>

<script>
  const list = document.getElementById('fruit-list');

  list.addEventListener('click', function (event) {
    // Check if clicked element is a <li>
    if (event.target.tagName === 'LI') {
      console.log('Clicked on:', event.target.textContent);
    }
  });
</script>
```
🎯 Now even if you add a new `<li>` dynamically, the handler still works!

🔬 How It Works: Event Bubbling

When an event happens on an element:

- It bubbles up from the target (`<li>`) to its ancestors (`<ul>`, `<body>`, etc.)

- You can intercept it at any level using .addEventListener()

🧠 What is Event Bubbling?

Event bubbling is a behavior in the DOM where an event starts at the target element (the actual element you interacted with) and then bubbles up (propagates) through its ancestors — all the way up to the root (document).

🔄 In simpler terms:
When you click on an element, the event doesn’t stop there — it “bubbles up” through its parent, grandparent, and so on.

🛠️ Real-World Use Case(Event delegation in react):
This pattern is especially useful for dynamic lists like:

```tsx
<ul onClick={handleClick}>
  {items.map((item) => (
    <li key={item.id} data-id={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```
Instead of adding onClick to every `<li>`, you attach one to `<ul>`.

| Concept                 | React Behavior                       |
| ----------------------- | ---------------------------------    |
| Event Delegation        | ✅ Built-in using synthetic events  |
| Manual Delegation Need? | ❌ Rarely — React handles it        |
| Use Case                | Dynamic list, reusable handlers      |


## 5. `this` Keyword in JavaScript 

1. What is `this`?

   `this` is a special keyword in JavaScript that refers to the object that is executing the current function.
   
   Its value depends on:
   
   Where it’s used (`global`, inside `object`, `function`, or `class`)
   
   How the function is called
   
   Function type: Regular vs Arrow

2. `this` in Regular Functions vs Arrow Functions

✅ Regular Function

```js
const obj = {
  name: "Amber",
  sayHi: function () {
    console.log("Hi", this.name); // 'this' refers to `obj`
  },
};
obj.sayHi(); // Output: Hi Amber
`this` points to the calling object.
```

In regular functions, `this` is dynamic — determined by the call site.

🚫 Arrow Function

```js
const obj = {
  name: "Amber",
  sayHi: () => {
    console.log("Hi", this.name); // 'this' is not obj!
  },
};
obj.sayHi(); // Output: Hi undefined (in browser)
Arrow functions don’t have their own `this`.
```

They inherit `this` from their surrounding (lexical) scope — where they were defined, not called.

3. this in Global Scope

✅ In Browser:

```js
console.log(this); // Window
var a = 10;
console.log(this.a); // 10
```

 - `this` at the global level refers to window.
   
 - var-declared variables become properties of window.
   
 - `let` and `const` do not attach to this.

⚙️ In Node.js:

```js
console.log(this); // {} or undefined (ESM)
```

- `this` is not `global` in Node.
  
- In CommonJS: `this === module.exports`
  
- In ES Modules (with "type": "module"): `this === undefined at top level`


✅ Summary Table

| Context          | Regular Function `this`  | Arrow Function `this`      |
| ---------------- | ------------------------ | -------------------------- |
| Inside object    | Refers to the object     | Inherited from outer scope |
| Global (Browser) | `window`                 | `window`                   |
| Global (Node.js) | `module.exports` or `{}` | Same as above              |
| Inside Class     | Refers to instance       | Inherited (be careful)     |


Pro Tips : 

- Use regular functions when you need dynamic `this`.

- Use arrow functions when you want to preserve `this` from outer scope (e.g., inside event listeners, callbacks).

- In classes or object methods, prefer regular functions for methods and arrow functions for callbacks.

## 6. What is a Promise in JavaScript?

A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

States of a Promise:

- pending: Initial state, neither fulfilled nor rejected.

- fulfilled: Operation completed successfully.

- rejected: Operation failed.

Basic Example with Promises:

```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Data fetched successfully!");
      else reject("Error fetching data.");
    }, 1000);
  });
};

fetchData()
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

**What is Async/Await?**

`async/await` is syntactic sugar built on top of Promises. It makes asynchronous code look and behave more like synchronous code.

Same example using async/await:

```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Data fetched!");
      else reject("Error occurred.");
    }, 1000);
  });
};

const getData = async () => {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

getData();
```

Differences: Promise vs Async/Await:

| Feature        | Promise                                        | Async/Await                       |
| -------------- | ---------------------------------------------- | --------------------------------- |
| Syntax         | Chained using `.then()` / `.catch()`           | Uses `async` and `await` keywords |
| Readability    | Can get messy in nested chains                 | Cleaner and easier to read        |
| Error Handling | Requires `.catch()` or second arg in `.then()` | Use `try...catch` block           |
| Flow Control   | Less natural                                   | Feels synchronous                 |


Common Pitfalls:

- Forgetting await leads to unresolved Promises.

- Mixing then and await can get messy.

- Async functions always return a Promise.

```js
const example = async () => "hello";
console.log(example()); // Promise<string>
```

## 7. What are call, apply, and bind?

These are methods available on functions, and they're used to manually set the `this` context inside a function.

Why do we need them?

JavaScript functions by default have their own `this` binding based on how they're called. But sometimes, we need to manually control `this`, especially when reusing methods between objects or dealing with callbacks.

**Definitions**

| Method  | Executes Function   | Arguments                   | Use Case                 |
|---------|-------------------  |---------------------------- |------------------------- |
| `call`  | ✅ Yes             | `fn.call(this, arg1, arg2)`  | Immediate call with args |
| `apply` | ✅ Yes             | `fn.apply(this, [args])`     | Immediate with array     |
| `bind`  | ❌ No              | `fn.bind(this)`              | Returns new bound fn     |

Example with All 3:

```js
function greet(this: any, greeting: string, punctuation: string) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Amber" };
const otherPerson = { name: "Kanav" };

// 1. call()
greet.call(person, "Hello", "!"); // Hello, Amber!
greet.call(otherPerson, "Hi", "😊"); // Hi, Kanav😊

// 2. apply()
greet.apply(person, ["Welcome", "."]); // Welcome, Amber.
greet.apply(otherPerson, ["Hey", "!!"]); // Hey, Kanav!!

// 3. bind()
const boundGreet = greet.bind(person, "Good Morning", "🌅");
boundGreet(); // Good Morning, Amber🌅
```

<details>
<summary>In-depth Breakdown</summary>

`call(thisArg, arg1, arg2, ...)`

```js
const car = {
  brand: "Tesla",
};

function showCar(this: any, speed: number) {
  console.log(`${this.brand} is running at ${speed} km/h`);
}

showCar.call(car, 120); // Tesla is running at 120 km/h
```

- Sets `this` to car

- Immediately invokes `showCar()`

`apply(thisArg, [argsArray])`

```js
const bike = {
  brand: "Yamaha",
};

showCar.apply(bike, [85]); // Yamaha is running at 85 km/h
```

- Useful when you already have arguments in an array.

`bind(thisArg)`

```js
const myCar = {
  brand: "BMW",
};

const boundShow = showCar.bind(myCar, 100); // returns a new function
boundShow(); // BMW is running at 100 km/h
```

- Doesn't execute immediately.

- Returns a copy of the function with fixed this.

`this` inside arrow functions vs normal functions

Arrow functions do not bind their own this, so call/apply/bind don’t change it!

```js
const obj = {
  value: 42,
  arrowFunc: () => {
    console.log(this.value); // ❌ undefined (global `this`)
  },
  regularFunc: function () {
    console.log(this.value); // ✅ 42
  }
};

obj.arrowFunc();
obj.regularFunc();
```

Interview Trick Questions:

1. What will this log?

```js
const obj = {
  val: 100,
  getVal: function () {
    return this.val;
  }
};

const get = obj.getVal;
console.log(get()); // ❌ undefined (global `this`)
console.log(get.call(obj)); // ✅ 100
```

2. What if we use bind twice?

```js
function show(this: any) {
  console.log(this.name);
}

const bound1 = show.bind({ name: "A" });
const bound2 = bound1.bind({ name: "B" });
bound2(); // A — bind works only once
```

Arrow functions ignore call/apply/bind:

Arrow functions inherit this from outer scope.

```js
const obj = {
  val: 1,
  arrow: () => console.log(this.val),
  regular: function () { console.log(this.val); }
};
```


When and Where to Use call, apply, bind in Real Projects:

1. Reusing logic between objects (e.g., utility functions)

```js
function calculateDiscount(this: any) {
  return this.price - (this.price * this.discount);
}

const productA = { price: 1000, discount: 0.2 };
const productB = { price: 800, discount: 0.1 };

console.log(calculateDiscount.call(productA)); // 800
console.log(calculateDiscount.call(productB)); // 720
```

2. Function borrowing (object method sharing)
Let’s say Object A has a method and you want Object B to use it without copying:

```js
const user1 = {
  name: "Amber",
  greet() {
    console.log(`Hi, I’m ${this.name}`);
  }
};

const user2 = { name: "Shaivya" };

user1.greet.call(user2); // Hi, I’m Shaivya
```

3.  Partial application (like currying) with `bind()`

```js
function log(level: string, message: string) {
  console.log(`[${level}]: ${message}`);
}

const errorLog = log.bind(null, "ERROR");
errorLog("Something broke"); // [ERROR]: Something broke
```

Where?

- Logging modules

- Analytics tracking

- utils/logger.ts or services/trackers.ts

4. Using Array methods on array-like objects with `call()`

In DOM work or older codebases:

```js
function printArgs() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args); // Converts arguments to real array
}

printArgs(1, 2, 3);
```

Where?

- Inside low-level DOM/event libraries

- Polyfills

- Working with arguments, NodeList, HTMLCollection etc.

</details>

## 8. What is the event loop in JavaScript?





