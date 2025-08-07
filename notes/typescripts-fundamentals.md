## 1. Why use TypeScript over JavaScript?

**1. Type Safety (Prevent Runtime Errors at Compile Time)**
JavaScript Issue:

JavaScript doesn't check types. You may pass a string where a number is expected and it won’t complain until runtime.

```ts
function square(num) {
  return num * num;
}

square("5"); // Returns "55" 🤯 instead of 25
```

TypeScript Fix:

```ts
function square(num: number): number {
  return num * num;
}

square("5"); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```
*TypeScript helps catch bugs before they happen by checking types during development. It acts like a safety net.*

2. Better Developer Experience (Autocompletion + IntelliSense)

TypeScript understands your code better → IDEs like VSCode give:

- Autocomplete

- Inline documentation

- Real-time error checking

```ts
type User = {
  name: string;
  age: number;
};

const user: User = { name: "Amber", age: 25 };

// When you type: user. ← It shows name & age suggestions
```
*It increases productivity and reduces human error — even in large teams and codebases.*

3. Scalability — Easier to Maintain Large Codebases

As your project grows:

- More developers touch the same files.

- Understanding old code becomes harder.

- Bugs sneak in from wrong assumptions.

```ts
function updateProfile(user: User) { ... }
```

*TypeScript documents your assumptions and forces contracts, making it easier for future devs to understand and extend the code.*

4. Refactoring with Confidence

Imagine changing a function parameter in a large codebase.

- JavaScript: No idea where it breaks — risky!

- TypeScript: Instantly shows all impacted places with clear errors.

*TypeScript gives you confidence to refactor code safely, even in huge projects.*

5. Supports Modern JavaScript Features + Extra Power

Works with ES6+ syntax

Also adds:

- Interfaces

- Enums

- Access modifiers (`private`, `public`)

- Generics

- Type inference

```ts
interface Animal {
  name: string;
  speak(): void;
}
```
*TypeScript is a super-set of JavaScript. You write modern JS + types.*

6. Easier Collaboration in Teams

With TypeScript:

- Everyone knows what inputs/outputs a function expects.

- Fewer bugs due to strict contracts.

```ts
function getUser(id: number): Promise<User> {
  ...
}
```
*Makes onboarding new devs easier and improves team coding standards.*

**Summary — Why TypeScript > JavaScript**

| Feature                     | JavaScript ❌        | TypeScript                     |
| --------------------------- | -------------------   | ----------------------------   |
| Type checking               | ❌ Runtime only      | Compile-time safety            |
| IDE support                 | 😐 Basic             | Advanced autocomplete, docs    |
| Refactoring safety          | 😰 Risky             | Confident & error-highlighted  |
| Large-scale project support | 😓 Hard to maintain  | Easier & structured            |
| Team collaboration          | ❌ Prone to misuses  | Shared contracts via types     |
| Documentation               | ❌ Needs comments    | Types act as self-documenting  |

<details>
<summary>What are interfaces vs type aliases? When to use each?</summary>

What is an Interface?

An `interface` defines the shape of an object — like a contract.

```ts
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Amber",
  age: 25,
};
```
*Best for `object` shapes, `class` contracts, and extending other `interfaces`.*

What is a Type Alias?

A `type` can do everything an `interface` can (almost) — plus more.

```ts
type User = {
  name: string;
  age: number;
};
```
*Best for primitive `unions`, `tuples`, `functions`, and combining types.*

```ts
type ID = string | number;
type Point = [number, number];
type UserFunction = (user: User) => void;
```

Key Differences:

| Feature                     | `interface`                     | `type`                         |
| --------------------------- | -----------------------------   | -----------------------------  |
| Extending other types       | ✅ Can extend other interfaces | ✅ Can use intersections (`&`) |
| Reopening / merging         | ✅ Yes (declaration merging)   | ❌ No (type can’t be reopened) |
| Unions / Intersections      | ❌ No unions                   | ✅ Can do union & intersection |
| Better for classes          | ✅ Yes (implements)            | ⚠️ Works, but not idiomatic    |
| Functions / tuples / unions | ❌ Not directly supported      | ✅ Yes                         |
| Declaration merging         | ✅ Yes                         | ❌ No                          |

Declaration Merging Example (Interface Only)

```ts
interface Dog {
  bark: () => void;
}

interface Dog {
  name: string;
}

// Merged version:
const dog: Dog = {
  name: "Tommy",
  bark: () => console.log("Woof!"),
};
```

Type aliases ❌ don’t allow this. If you do:

```ts
type Dog = { bark: () => void };
type Dog = { name: string }; // ❌ Error: Duplicate identifier 'Dog'
```

When to Use What

Use `interface` when:

- You're describing `object` shapes

- You're working with classes (implements)

- You need declaration merging

- You want to extend multiple `objects` cleanly

Use type when:

- You need `union` or `intersection`

```ts
type Status = "success" | "error";
```

- You’re defining `functions`, `tuples`, or `primitives`

- You need to combine different shapes using `&` and `|`

```ts
type Admin = User & { role: "admin" };
```

</details>


<details>

<summary>What are generics in TypeScript?</summary>

Generics are a way to create reusable components that work with any data type, while still keeping type safety.

Think of it like a placeholder for a type:

```ts
function identity<T>(value: T): T {
  return value;
}
```

Here, `T` is a generic type variable — a placeholder for whatever type gets passed in.

Why Use Generics?

- Reusability: One function/type can work with many types.

- Type Safety: The compiler ensures types are correct.

- Flexibility: Avoid duplicating code for each type (`string`, `number`, etc).

Without Generics (Not Type-Safe)

```ts
function identity(value: any): any {
  return value;
}

const result = identity("Amber"); // ❌ result has type "any"
```
*We lose type information — not ideal!*

With Generics (Type-Safe)

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>("Amber"); // result: string
```
*Now the type is inferred and preserved.*

Real Reusable Generic Function Example

1. Generic Function to Wrap a Value

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numberArray = wrapInArray(5); // number[]
const stringArray = wrapInArray("hello"); // string[]
```
2. Generic Function to Filter Items by Type

```ts
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
const even = filterItems(numbers, num => num % 2 === 0); // [2, 4]
```

3. Generic Function to Merge Two Objects

```ts
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Amber" }, { age: 25 });
// type: { name: string; age: number }
```

Generics in Arrow Function Form:

```ts
const identity = <T>(value: T): T => value;
```
</details>

<details>
<summary>How does TypeScript infer types automatically?</summary>

TypeScript is known for its powerful type inference system, which allows you to write clean, minimal code without manually annotating types everywhere — yet still enjoy full type safety.

**What is Type Inference?**

TypeScript automatically infers (guesses) the type of a variable, function return, parameter, or expression based on how it’s used — without requiring explicit type annotations.

How TypeScript Infers Types — Common Scenarios:

1. Variable Declarations

```ts
let name = "Amber"; // inferred as string
let count = 42;     // inferred as number
```

TypeScript assigns `string` to name and `number` to count automatically.

2. Function Return Types

```ts
function add(a: number, b: number) {
  return a + b;
}
```
Even without an explicit return type, TS infers `add` returns a `number`.

```ts
// Inferred: (a: number, b: number) => number
```

3. Arrays and Objects

```ts
let fruits = ["apple", "banana", "cherry"];
// Type: string[]

let user = {
  name: "Amber",
  age: 25,
};
// Type: { name: string; age: number }
```
4. Destructuring

```ts
const person = { name: "Amber", age: 25 };
const { name, age } = person;
// name: string, age: number
```

5. Function Parameters from Context:

```ts
const users = ["Amber", "Khan"];

users.forEach((user) => {
  // user: string (inferred from array)
});
```
6. Generics and Type Propagation

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const result = wrapInArray("hello");
// inferred T = string → result: string[]
```

7. Best Common Type

TypeScript finds the “best common type” when dealing with multiple elements:

```ts
let mixed = [1, 2, "three"];
// inferred type: (string | number)[]
```

When Inference Might Not Work:

```ts
let data; // inferred as `any` — no type information
data = 123;
data = "hello";
```

To avoid `any`, always initialize variables or add explicit types.

Why It Matters

- 🧹 Less boilerplate: You don’t need to type everything.

- 🧠 Smarter editor: Auto-complete, refactor suggestions, etc.

- 🛡️ Type-safe without manual typing.

- 🐞 Fewer bugs: TypeScript catches mismatches early.

</details>
