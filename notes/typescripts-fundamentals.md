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

- Access modifiers (private, public)

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
*Best for object shapes, class contracts, and extending other interfaces.*

What is a Type Alias?

A type can do everything an interface can (almost) — plus more.

```ts
type User = {
  name: string;
  age: number;
};
```
*Best for primitive unions, tuples, functions, and combining types.*

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

Use interface when:

- You're describing object shapes

- You're working with classes (implements)

- You need declaration merging

- You want to extend multiple objects cleanly

Use type when:

- You need union or intersection

```ts
type Status = "success" | "error";
```

- You’re defining functions, tuples, or primitives

- You need to combine different shapes using & and |

```ts
type Admin = User & { role: "admin" };
```

</details>


