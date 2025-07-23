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

- It bubbles up from the target (<li>) to its ancestors (<ul>, <body>, etc.)

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
Instead of adding onClick to every <li>, you attach one to <ul>.

| Concept                 | React Behavior                       |
| ----------------------- | ---------------------------------    |
| Event Delegation        | ✅ Built-in using synthetic events  |
| Manual Delegation Need? | ❌ Rarely — React handles it        |
| Use Case                | Dynamic list, reusable handlers      |


