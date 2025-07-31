Fundamental Concept: Primitive vs Reference Types

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


