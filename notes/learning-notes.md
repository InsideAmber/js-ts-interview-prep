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

let and const Hoisting (TDZ – Temporal Dead Zone):

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

 - Only var greet is hoisted (as undefined)

 - greet() becomes undefined() → ❌ TypeError

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

