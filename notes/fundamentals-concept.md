**Fundamental Concept: Primitive vs Reference Types**

✅ 1. Primitive Types (copied by value)

- `Number`, `String`, `Boolean`, `null`, `undefined`, `Symbol`, `BigInt`

- Stored directly in memory

- Assignment creates a true copy

```js
let a = 5;
let b = a;
b = 10;

console.log(a); // 5 ✅
```
*Each variable has its own memory with its own value*

📦 2. Reference Types (copied by reference)

- `Object`, `Array`, `Function`

- Stored in heap memory

- Variable stores only a reference (pointer) to the actual value in the heap

```js
// Reference copy
const obj1 = { name: "Amber" };
const obj2 = obj1;

obj2.name = "Khan";

console.log(obj1.name); // "Khan" ❗
```

What's happening internally:

- obj1 points to a memory address in the heap.

- obj2 = obj1 copies the reference (address), not the object itself.

- Changing obj2 modifies the same object obj1 is pointing to.

```js
Stack:
obj1 --> 0x123
obj2 --> 0x123

Heap:
0x123 --> { name: "Khan" }
```

So Why Do We Need Deep Cloning?

If you want to break the shared reference, you must create a brand new object, not just a new reference.

❌ Wrong (shared reference):

```js
// Reference copy
const original = { skills: ["JS"] };
const copy = original;

copy.skills.push("React");

console.log(original.skills); // ["JS", "React"] ❗
```

✅ Right (new object):

```js
const copy = JSON.parse(JSON.stringify(original)); // or use deepClone()
```

✅ Summary: Why assigning variables doesn’t create a copy

| Type      | Example                   | Result                            |
| --------- | ------------------------- | --------------------------------- |
| Primitive | `let b = a;`              | Value is copied                   |
| Reference | `let b = obj;`            | Reference is copied (same memory) |
| Deep Copy | `let b = deepClone(obj);` | Entire new object created         |

**Why do we even need callbacks in javascript?**

You use callbacks when you want to delay the execution of a function until a certain condition is met, something finishes, or you want to plug in custom behavior.

Why can’t we just call the function directly?

If you just call a function directly, it runs immediately, synchronously.
But in many real-world situations — you don’t want or can’t do that.

Real Use Cases of Callbacks

1. Asynchronous Operations (like fetching data)

```js
function fetchData(callback) {
  setTimeout(() => {
    console.log("Fetched data!");
    callback(); // run only after data is fetched
  }, 2000);
}

function processData() {
  console.log("Processing data...");
}

fetchData(processData); // pass the logic to run after fetch
```
*If you just called `processData()` directly, it would run before data is fetched. That’s useless.*

Custom Behavior in Reusable Functions

Imagine building a calculate() function that can do any math:

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const result = calculate(5, 3, function (x, y) {
  return x * y;
});

console.log(result); // 15
```
*You pass the logic as a callback, making calculate() more flexible.*

3. DOM Events / User Interaction

```js
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```
*You can’t "just call" the function here, because it should run only when the user clicks. That’s what the callback does — it waits and runs later.*

4. Built-in Methods like `map`, `filter`, `forEach`

```js
[1, 2, 3].map((n) => n * 2); // callback used to transform each item
```
*You pass the logic of transformation as a callback — not hardcoded into the method.*

Summary: When Do We Really Need Callbacks?

| Situation            | Why Callbacks Are Needed                          |
| -------------------- | ------------------------------------------------- |
| Asynchronous tasks   | You can’t "just call" because the task takes time |
| Customizable logic   | You want to plug in different behaviors           |
| Event handling       | You don’t know **when** the event happens         |
| Array transformation | You want to apply a function to every element     |

