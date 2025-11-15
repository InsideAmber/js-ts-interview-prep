
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

The Event Loop is a fundamental concept in JavaScript that enables non-blocking asynchronous behavior, allowing JS to handle tasks like I/O, timers, and promises while still being single-threaded.

What is the Event Loop?
JavaScript has one main call stack (single thread) that processes synchronous code. But to handle asynchronous operations like:

- `setTimeout`, `setInterval`

- `fetch`, `AJAX`

- `Promises`

- `DOM` events

JavaScript uses an Event Loop to coordinate the Call Stack, Web APIs, and two queues:

- Microtask Queue (e.g., Promises `.then`, `MutationObserver`)

- Macrotask Queue (e.g., `setTimeout`, `setInterval`, `setImmediate`, `requestAnimationFrame`)

📊 Visual Breakdown:

```js
|---------------------------|
|      Call Stack           |  <- Executes JS code
|---------------------------|
|      Web APIs             |  <- Handles async ops like timers, fetch, DOM events
|---------------------------|
|   Microtask Queue         |  <- Promises, process.nextTick (Node.js)
|---------------------------|
|   Macrotask Queue         |  <- Timers, UI events, setTimeout, setInterval
|---------------------------|
             ↓
       [Event Loop]
```

Execution Order:

- When the call stack is empty:

- Event loop checks microtasks queue first.

- Runs all microtasks until the queue is empty.

- Then picks one macrotask from the macrotask queue and runs it.

Repeats the cycle.

<details>
<summary>Some Code Examples - </summary>

Microtask vs Macrotask Code Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Macrotask: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask: Promise.then");
});

console.log("End");
```

Output:

```js
Start
End
Microtask: Promise.then
Macrotask: setTimeout
```

Why?

- "Start" and "End" are synchronous → printed immediately.

- `Promise.then` is a microtask → runs before macrotasks.

- `setTimeout` is a macrotask → runs after microtasks.

Real Example with Nested Queues:

```js
console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise1");
}).then(() => {
  console.log("promise2");
});

console.log("script end");
```

Output:

```js
script start
script end
promise1
promise2
setTimeout
```

Common Interview Questions:

Q1: What is the difference between microtasks and macrotasks?

- Microtasks (like Promises) are prioritized and executed after each sync task before any macrotask.

- Macrotasks (like setTimeout) are queued and executed after microtasks are finished.

Q2: Can a macrotask starve microtasks?
No. After each macrotask, all microtasks are flushed before the next macrotask.

Q3: What happens if microtasks are never empty?
If you keep pushing microtasks infinitely, it can block the event loop, e.g., infinite Promise chaining:

```js
Promise.resolve().then(function recursive() {
  console.log("Infinite microtask");
  Promise.resolve().then(recursive);
});
```
This will freeze the browser.

Q4: Event loop priority example?

```js
setTimeout(() => console.log("Macrotask 1"), 0);

Promise.resolve().then(() => {
  console.log("Microtask 1");
  return Promise.resolve("Microtask 2");
}).then(console.log);

setTimeout(() => console.log("Macrotask 2"), 0);
```
Output:

```js
Microtask 1
Microtask 2
Macrotask 1
Macrotask 2
```

</details>

Event Loop in Browser vs Node.js:

- In browsers, microtasks are `Promise.then` and `MutationObserver`.

- In Node.js, microtasks are `process.nextTick` and `Promises`.

Key Takeaways:

| Aspect    | Microtask Queue                    | Macrotask Queue               |
| --------- | ---------------------------------- | ----------------------------- |
| Examples  | `Promise.then`, `queueMicrotask()` | `setTimeout`, `setInterval`   |
| Priority  | Higher (runs first)                | Lower (runs after microtasks) |
| Use Cases | Short, urgent callbacks            | Timers, UI rendering          |



## 9. Debounce and Throttle function in javascript

**What is Debounce?**

Debounce ensures that a function is only called after a specified delay once the last event is fired.
If the event keeps firing, the timer resets.



Code Example:

```js
// ✅ Debounce: delays execution until after delay period passes without further calls
function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    // Clear previous timer
    clearTimeout(timer);

    // Set new timer
    timer = setTimeout(() => {
      // 🔐 .apply used to preserve 'this' context if func is a method inside an object
      func.apply(this, args);
    }, delay);
  };
}

// Mock search handler
function handleSearch(query) {
    console.log("Searching for:", query);
}

const debouncedSearch = debounce(handleSearch, 500);

const input = document.getElementById("searchInput");
input.addEventListener("input", (e) => {
      debouncedSearch(e.target.value);
});

```
✅ Debounce:

- What it does: Waits for you to stop typing, and only then — after the delay — runs the function.

- Behavior: Keeps resetting the timer on each keystroke. Only fires once, when you're done typing.

- Use Case: Ideal for auto-saving draft after the user pauses typing.

*Think: "I’ll wait till you're done, then I’ll do my job."*

Example Output:

```js
[Typing...] d, de, deb, debo, debou, debounce
[Pause for 1000ms]
→ Logs: "debounce"
```


**What is Throttle?**

Throttle ensures a function is called at most once every X milliseconds, even if the event keeps firing.


Code Example:

```js
// ✅ Throttle: ensures function is called at most once every delay period
function throttle(func: Function, delay: number) {
  let lastCall = 0;

  return function (...args: any[]) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;

      // 🔐 .apply used to preserve 'this' context if func is a method inside an object
      func.apply(this, args);
    }
  };
}

```

Use with Reactjs 

```jsx
import React, { useEffect, useState } from "react";

// ✅ Throttle function (vanilla JS style)
function throttle(func: Function, delay: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args); // for safety if func uses `this`
    }
  };
}

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  // ✅ Mock load more function
  const loadMoreItems = () => {
    console.log("Loading more items...");
    const newItems = Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`);
    setItems((prev) => [...prev, ...newItems]);
  };

  // ✅ Scroll handler
  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreItems();
    }
  }, 300);

  useEffect(() => {
    // Load initial items
    loadMoreItems();

    // Attach throttled scroll event
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Infinite Scroll</h1>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded shadow">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteScroll;
```

✅ Throttle:

- What it does: Executes the function at most once every X ms, no matter how fast or often you're typing.

- Behavior: Doesn’t wait for you to stop. It runs on intervals.

- Use Case: Useful for scroll events, resize, or logging live activity at intervals.

*Think: "I'll check in every X ms and do something with your latest input."*

Example Output (delay = 1000ms):

```js
[Typing rapidly...]
→ Logs: "d"       [at 0ms]
→ Logs: "debo"    [at 1000ms]
→ Logs: "debounc" [at 2000ms]
→ Logs: "debounce" [at 3000ms]
```

Improtant Notes: 

**🔹 When to use `.apply(this, args)`:**
- Use when your original function relies on `this` (e.g., a method of an object).

- Ensures this remains correctly bound — especially inside `setTimeout`, event handlers, or custom utility functions like `debounce`, `throttle`, etc.

**🔹 When not necessary:**
- If the function is standalone and doesn’t use `this`, you can safely use `fn(...args)`.

**🔹 Safe fallback:**
- Even when unsure, using `.apply(this, args)` is safe and doesn’t hurt, making it a good default in reusable utilities.

Summary Table:

| Feature        | Debounce                    | Throttle                        |
| -------------- | --------------------------- | ------------------------------- |
| Triggers       | After user **stops** action | At **regular intervals**        |
| Reset timer?   | ✅ Yes                      | ❌ No                          |
| Useful for     | Typing, Search, Resize End  | Scrolling, Dragging, Mouse Move |
| Execution freq | **Once** per pause          | **Repeated** at intervals       |


## 10. Shallow copy VS Deep copy

What is Shallow Copy?

A shallow copy duplicates only the first level of an object or array. If the original object has nested objects or arrays, the references to those inner objects are copied, not the actual nested content.

Example of Shallow Copy:

```js
const original = {
  name: "Amber",
  address: {
    city: "Delhi",
  },
};

const shallowCopy = { ...original };

// Modify nested object
shallowCopy.address.city = "Mumbai";

console.log(original.address.city); // ❗Output: "Mumbai"
```
*Only top-level properties are copied. The nested object is shared between both.*

Use Cases of Shallow Copy

When to Use Shallow Copy:

A shallow copy duplicates only the top-level properties, not nested ones. It’s faster and often enough if your object has only primitive values or you don't need to mutate deeply nested data.

Use Case Examples:

1. Updating simple state objects (React)

```js
const user = { name: "Amber", age: 30 };
const updatedUser = { ...user, age: 31 }; // shallow copy + update
```

2. Passing props or cloning flat data

```js
const arr = [1, 2, 3];
const copy = [...arr];
```
*Quick and memory-efficient*
*But nested objects/arrays still point to same memory!*

What is Deep Clone (Deep Copy)?

A deep clone creates a complete copy of an object including all nested objects or arrays, meaning there's no reference sharing.

Example of Deep Clone:

```js
const original = {
  name: "Amber",
  address: {
    city: "Delhi",
  },
};

const deepClone = JSON.parse(JSON.stringify(original));

deepClone.address.city = "Mumbai";

console.log(original.address.city); // ✅ Output: "Delhi"
```
*The nested address `object` is fully cloned, so changing it in the clone doesn’t affect the original.*

Limitation of JSON.parse(JSON.stringify())

-  clone functions

- Cannot clone special objects like Date, Map, Set, undefined, or circular references


Use Cases of Deep Copy

When to Use Deep Copy:

- A deep copy is needed when:

- Your object has nested structures

- You want to fully detach from the original

You’re about to mutate deep data and want to preserve immutability

Use Case Examples:

1. Complex state update in Redux or React

```js
const state = {
  user: {
    name: "Amber",
    address: { city: "Delhi", pin: 123456 }
  }
};

// deep copy to safely mutate
const newState = JSON.parse(JSON.stringify(state));
newState.user.address.city = "Mumbai";
```

Real-World Tip (React):

- Always use shallow copy (`...obj`) for simple state updates.

- Use deep copy only when truly needed, because it’s heavier on performance.

Summary:

| Type            | Top-Level  | Nested Objects   | Functions/Date/Map Support  |
| --------------- | ---------  | --------------   | --------------------------  |
| Shallow Copy    | ✅         | ❌ (reference)  | ✅                          |
| `JSON` Clone    | ✅         | ✅              | ❌                          |
| Recursive Clone | ✅         | ✅              | ✅ (with manual handling)   |


Example:

| Operation                      | Memory Behavior                     |
| ------------------------------ | ----------------------------------  |
| `const obj2 = obj1`            | ✅ Reference copy (no clone at all) |
| `const obj2 = {...obj1}`       | ✅ Shallow clone                    |
| `const obj2 = deepClone(obj1)` | ✅ Deep clone                       |

## Let’s deeply understand how the event loop works and how it differs (or not) between browser and Node.js

What is the Event Loop?

The event loop is a mechanism that allows JavaScript — which is single-threaded — to handle asynchronous tasks like:

- User interactions

- Timers (`setTimeout`, `setInterval`)

- HTTP requests (fetch, XMLHttpRequest)

- File operations (in Node.js)

It lets JavaScript not block while waiting for things like network responses or user input.

How It Works — Step by Step

1. JavaScript starts with an execution stack where functions are executed.

2. When an asynchronous operation is encountered (e.g. `setTimeout`), it’s handed off to the browser APIs / Node APIs.

3. Once the operation is done, a callback is queued in the task queue (or microtask queue depending on the operation).

4. The event loop constantly checks:

- Is the call stack empty?

- If yes → pick the next task from the queue and execute it.

5. This way, JavaScript can process many things asynchronously while running on a single thread.

Key Concepts

➤ Call Stack

- Where synchronous code runs line by line.

➤ Web APIs / Node APIs

- Handle asynchronous tasks like timers, events, or network requests.

➤ Task Queue (Macro Task Queue)

- Holds things like setTimeout, setInterval, UI events, etc.

➤ Microtask Queue

- Holds things like Promise.then(), MutationObserver.

- Runs immediately after the current task finishes and before the next one.

Example — How It Works

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End");
```
Output:

```bash
Start
End
Promise callback
Timeout callback
```
Why?

- `"Start"` logs immediately → synchronous.

- `setTimeout` is pushed to the task queue → will run later.

- `Promise.then()` is pushed to the microtask queue → will run right after the current stack.

- `"End"` logs → synchronous.

- Microtasks run → Promise logs.

- Then macro tasks → Timeout logs.

**Does It Work Differently in Browser and Node.js?**

| Feature          | Browser                      | Node.js                          |
| ---------------- | ---------------------------- | -------------------------------- |
| Core Event Loop  | ✅ Same principle             | ✅ Same principle                 |
| Web APIs         | Timers, DOM events, fetch    | Timers, file system, network     |
| Microtask Queue  | ✅ Promises, MutationObserver | ✅ Promises, `process.nextTick()` |
| UI Rendering     | ✅ Happens between tasks      | ❌ No UI rendering                |
| API availability | ✅ DOM, events                | ✅ File system, network           |


**Key Takeaways:**

- The event loop logic is the same — it manages execution of asynchronous code by using call stacks and queues.

- The environment-specific APIs differ → browsers have things like `fetch`, `DOM`, and `UI updates`; Node.js has file system, streams, and `process.nextTick()`.

- The microtask queue is treated slightly differently in some scenarios but the basic priority rules remain.

**Summary**

- The event loop is what makes JavaScript non-blocking despite being single-threaded.

- It processes tasks and microtasks when the stack is empty.

- It’s the same in both browsers and Node.js, but the APIs it interfaces with are environment-specific.

- Understanding it helps in managing asynchronous code, avoiding UI freezes, and debugging complex flows.

## 11. Top ES6 Features in JavaScript

1️⃣ `let` and `const`

Block-scoped variables.

```js
let a = 10;     // can be reassigned
const b = 20;   // cannot be reassigned
```

✅ Unlike `var`, they are block-scoped and not hoisted the same way.

2️⃣ Arrow Functions

Shorter syntax for writing functions.

```js
const add = (a, b) => a + b;
```

✅ Lexically binds `this` (no need to use `.bind(this)`).

3️⃣ Template Literals

Use backticks (`) for easier string concatenation and multi-line strings.

```js
const name = 'Amber';
console.log(`Hello, ${name}!`);
```

4️⃣ Default Parameters

Set default values for function parameters.

```js
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}
```

5️⃣ Destructuring Assignment

Extract values from arrays or objects easily.

```js
// Array
const [a, b] = [10, 20];

// Object
const { name, age } = { name: 'Amber', age: 25 };
```

6️⃣ Spread and Rest Operators (`...`)


➤ Spread (expand elements)

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
```

➤ Rest (collect remaining arguments)

```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

7️⃣ Modules (`import / export`)

```js
// math.js
export const add = (a, b) => a + b;

// main.js
import { add } from './math.js';
```
✅ Encourages modular, reusable code.

8️⃣ Classes

Simpler syntax for prototypes.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello ${this.name}`);
  }
}
```

9️⃣ Promises

Used for asynchronous operations.

```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
};

fetchData().then(console.log);
```

🔟 Enhanced Object Literals

Shorthand for defining properties and methods.

```js
const name = "Amber";
const person = {
  name,
  greet() {
    console.log(`Hello ${this.name}`);
  },
};
```

11 For...of Loop

Iterate over arrays, strings, etc.

```js
for (let val of [1, 2, 3]) {
  console.log(val);
}
```

12 Map and Set

New data structures.

```js
// Map
const map = new Map();
map.set('a', 1);

// Set
const set = new Set([1, 2, 2, 3]); // {1, 2, 3}
```

13 Symbol

A new primitive data type — unique and immutable.

```js
const id = Symbol('id');
```

14 Iterators and Generators

Control iteration manually.

```js
function* gen() {
  yield 1;
  yield 2;
}
const g = gen();
console.log(g.next().value); // 1
```

15 Enhanced Parameter Handling

You can use rest, default, and destructuring together in parameters.

```js
function display({ name, age } = {}) {
  console.log(name, age);
}
```

💡 Bonus (ES6+ that followed after 2015)

- Later versions added:

- Async/Await (ES2017)

- Optional chaining `?.` (ES2020)

- Nullish coalescing `??` (ES2020)

- `Object.fromEntries()`, `flat()`, `flatMap()`, etc.