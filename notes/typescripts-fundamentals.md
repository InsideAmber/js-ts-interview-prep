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

## 5. What is the unknown type? How is it different from any?

In TypeScript, both any and unknown are top types — meaning they can hold any value. However, their behavior is very different in terms of type safety and intent.

`any` vs `unknown` — Summary Table:

| Feature               | `any`                               | `unknown`                                          |
| --------------------- | ----------------------------------- | -------------------------------------------------- |
| Accepts any value     | Yes                                 | Yes                                                |
| Allows any operations | Yes (unsafe)                        | No (must first narrow or assert)                   |
| Type safety           | Completely bypasses type checking   | Enforces type checks                               |
| Use case              | Legacy, escape hatch                | Safer alternative to `any` for unknown values      |
| Type assignability    | Can be assigned to anything         | Cannot be assigned to more specific types directly |
| Recommended?          | Use only if you must                | Safer for dynamic or external input                |

`any`: Disables Type Checking:

```ts
let value: any;

value = 10;
value = "hello";

value.toUpperCase();  // ✅ No error at compile time
value.notAFunction(); // ✅ No error (but may crash at runtime)
```
*`any` disables TypeScript’s safety — it’s like writing plain JavaScript.*

`unknown`: Safe, But Strict:

```ts
let value: unknown;

value = 10;
value = "hello";

value.toUpperCase();  // ❌ Error: Object is of type 'unknown'
```
*To safely use `unknown`, you must narrow or assert the type:*

Narrowing using `typeof`:

```ts
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ OK now
}
```
Type assertion:

```ts
console.log((value as string).toUpperCase()); // ✅ OK
```

**When to Use unknown:**

Use unknown when:

- You're dealing with user input or external API responses.

- You want to defer type checking until you know more.

- You want a safer alternative to any.

**When any Is Okay (but risky):**

Use any only when:

- You're migrating from JS and need a quick fix.

- You want to silence TypeScript temporarily (not recommended).

- You’re using a third-party library with no types and can't fix it yet.

## 6. What are utility types like Partial, Pick, Omit, Record, Readonly?

Great! Utility types in TypeScript are built-in helpers that allow you to transform existing types in flexible ways. They're super useful in real-world code to avoid duplication, make types optional, required, or readonly, and compose complex types cleanly.

Here's a quick overview of the most used utility types:

| Utility Type   | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `Partial<T>`   | Makes **all properties optional**                           |
| `Required<T>`  | Makes **all properties required**                           |
| `Readonly<T>`  | Makes **all properties readonly**                           |
| `Pick<T, K>`   | Creates a type with **only selected keys**                  |
| `Omit<T, K>`   | Creates a type with **selected keys removed**               |
| `Record<K, T>` | Creates a type with **keys of type K and values of type T** |


1. 🔹 Partial<T>

Makes all properties in type T optional.

```ts
interface User {
  name: string;
  age: number;
}

const updateUser = (user: Partial<User>) => {
  // all props are optional
  if (user.name) console.log(user.name);
};
```
*Useful when you only want to update part of an object.*

2. 🔹 Required<T>

Makes all properties in T required (even optional ones).

```ts
interface Settings {
  darkMode?: boolean;
  language?: string;
}

const saveSettings = (config: Required<Settings>) => {
  // config.darkMode and config.language are guaranteed
};
```
*Useful to enforce full object construction.*

3. 🔹 Readonly<T>

Makes all properties in T read-only (immutable).

```ts
interface User {
  id: number;
  name: string;
}

const user: Readonly<User> = {
  id: 1,
  name: "Amber",
};

user.name = "Ali"; // ❌ Error: Cannot assign to 'name' because it is a read-only property
```
*Great for immutability and avoiding accidental changes.*

4. 🔹 Pick<T, K>

Creates a type by picking specific keys from a type.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type BasicInfo = Pick<User, "id" | "name">;

const user: BasicInfo = {
  id: 1,
  name: "Amber",
};
```
*Useful for extracting just what you need.*

5. 🔹 Omit<T, K>

Creates a type by removing certain keys.

```ts
type WithoutEmail = Omit<User, "email">;

const user: WithoutEmail = {
  id: 1,
  name: "Amber",
};
```
*Useful for hiding fields like passwords or internal fields.*

6. 🔹 Record<K, T>

Creates a type with keys K and values of type T.

```ts
type Role = "admin" | "user" | "guest";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};
```
*Useful for mapping keys to consistent value types.*

## 7. Explain enum usage in TypeScript.

What is an Enum?

In TypeScript, an enum is a special type that defines a set of named constants.
It’s often used when you have a fixed set of related values that you want to refer to by name instead of using raw numbers or strings.

Think of it like giving human-readable names to values.

Why use enums?

- Improves readability → avoids “magic numbers” or random strings in your code.

- Helps with type safety → prevents assigning invalid values.

- Makes refactoring easier → if you change a value, you only update it in one place.

Enum Types in TypeScript

a) Numeric Enums (default)

If you don’t assign values, numeric enums start from 0 by default.

```ts
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right,  // 3
}

let move: Direction = Direction.Up;
console.log(move); // 0
```
You can also start from a custom number:

```ts
enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
}
```
b) String Enums

Every member gets a string value (no auto-increment here).

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

function checkRole(role: Role) {
  if (role === Role.Admin) {
    console.log("Welcome Admin!");
  }
}

checkRole(Role.Admin); // ✅ "Welcome Admin!"
```
c) Heterogeneous Enums (mix numbers & strings — rarely used)

```ts
enum Mixed {
  No = 0,
  Yes = "YES",
}
```
*Usually avoided for clarity.*

Reverse Mapping (only for numeric enums)

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}

console.log(Color.Red);   // 1
console.log(Color[1]);    // "Red" (reverse lookup)
```
*Reverse mapping doesn’t work for string enums.*

Const Enums (Performance optimization)

const enum is removed at compile time, inlining the value directly.
This means no extra object is created in JavaScript → smaller, faster code.

```ts
const enum Direction {
  Up,
  Down,
}

let move = Direction.Up; // compiled directly to `0` in JS
```
When to Use Enums

✅ Good for:

- Directions (North, South, East, West)

- HTTP status codes

- User roles (Admin, Editor, Viewer)

- Fixed states in an app (loading, success, error)

*Enums in TypeScript let you define a set of named constants for better readability and type safety. They can be numeric, string-based, or const enums for performance.*


## 8. How do you use as const, and what does it do?

Alright — as const in TypeScript is a little keyword with a big impact.
Let’s break it down so you can explain it in interviews and use it correctly in code.

1️⃣ What does as const do?

It tells TypeScript to:

- Make the value completely immutable (deeply readonly).

- Infer the most specific literal type instead of a broader type.

Without as const

```ts
let colors = ["red", "green", "blue"];
// Type: string[]

const direction = "north";
// Type: string
```
Here:

- `colors` is inferred as a general `string[]`.

- `direction` is inferred as a general `string`.

With `as const`

```ts
let colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

const direction = "north" as const;
// Type: "north"
```

Now:

- The array is readonly and keeps literal values `"red" | "green" | "blue"`.

- `direction` is the literal type `"north"`, not just `string`.

2️⃣ Why is this useful?

a) Literal type inference

If you’re defining fixed values and want to keep their exact values as types:

```ts
const ROLES = ["admin", "user", "guest"] as const;
type Role = typeof ROLES[number];
// "admin" | "user" | "guest"
```

b) Immutable configuration objects

```ts
const CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const;

// CONFIG.apiUrl = "newUrl"; ❌ Error: Readonly
```

c) Safer comparisons

```ts
const DIRECTIONS = ["up", "down", "left", "right"] as const;

function move(dir: typeof DIRECTIONS[number]) {
  console.log(`Moving ${dir}`);
}

move("up");    // ✅
move("forward"); // ❌ Type error
```

3️⃣ Key Takeaways

- Locks in the exact values (no widening to string or number).

- Makes properties deeply readonly.

- Great for constants, configs, and union type generation.

- Avoids accidental changes at runtime and gives TypeScript more safety.


## 9. What is never and when does it occur?

1️⃣ What is `never`?

- `never` is a special type that represents no possible value.

- It means: “This code path should be impossible”.

If something has the type `never`, it cannot be assigned any value — not even `null` or `undefined`.

2️⃣ When does `never` occur?

a) Functions that never return

If a function throws an error or loops forever, its return type is `never` because it will never successfully finish.

```ts
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```
b) Exhaustiveness checking

In type narrowing with `switch` or `if` statements, `never` is used to ensure all cases are handled.

```ts
type Shape = { kind: "circle"; radius: number }
           | { kind: "square"; side: number };

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
    default:
      // Here shape is of type `never`
      const _exhaustiveCheck: never = shape; // ❌ Error if a case is missing
      return _exhaustiveCheck;
  }
}
```
This ensures that if you later add `{ kind: "triangle" }`,

TypeScript will force you to update the `switch`.

c) Impossible type intersections

If you intersect types that can never be true together, the result is `never`.

```ts
type A = string & number; // never
```

3️⃣ Why is never useful?

- Prevents unreachable code paths from being ignored.

- Helps catch missing cases during type narrowing.

- Improves type safety in exhaustive checks.

## 10. How do you handle type narrowing and type guards?

What is Type Narrowing?

Type narrowing is when TypeScript reduces a union type into a more specific type based on runtime checks.

For example:

```ts
function printLength(value: string | string[]) {
  if (typeof value === "string") {
    // Here: value is string
    console.log(value.length);
  } else {
    // Here: value is string[]
    console.log(value.length);
  }
}
```
*Initially value is `string | string[]`,*
*but after `typeof value === "string"`,*
*TS narrows it to just `string`.*

2️⃣ What are Type Guards?

Type guards are conditions (functions or expressions) that tell TypeScript “Hey, if we pass this check, the type is definitely X”.

Built-in Type Guards

`typeof` — for primitives

```ts
if (typeof value === "string") { /* narrowed to string */ }
```

`instanceof` — for classes/objects

```ts
if (date instanceof Date) { /* narrowed to Date */ }
```
`in` — checks if a property exists

```ts
if ("radius" in shape) { /* narrowed to circle type */ }
```

3️⃣ Handling with Exhaustiveness Checking

Type narrowing pairs really well with never to ensure all cases are handled.

```ts
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
    default:
      const _exhaustive: never = shape; // Forces us to handle all types
      return _exhaustive;
  }
}
```

*Type narrowing is when TypeScript refines a broader type to a more specific type based on runtime checks. Type guards are the way we trigger narrowing, using built-in checks like `typeof`, `instanceof`, `in`, or custom functions returning `value is Type`. Combined with exhaustive checks, they help make code safer and prevent missing cases.*

## 11. Write a function `mergeObjects<T, U>(obj1: T, obj2: U): T & U` that merges two objects.

```ts
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Example usage:
const objA = { name: "Amber", age: 25 };
const objB = { isAdmin: true, country: "India" };

const merged = mergeObjects(objA, objB);

/*
merged has type:
{
  name: string;
  age: number;
  isAdmin: boolean;
  country: string;
}
*/

console.log(merged);
// Output: { name: 'Amber', age: 25, isAdmin: true, country: 'India' }
```
- `T` is the type of `obj1`.

- `U` is the type of `obj2`.

- The return type `T & U` means:

  - The merged object will have all properties from `obj1` (T)

  - and all properties from `obj2` (U).



