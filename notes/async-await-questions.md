Realistic `async/await-based` console output questions commonly asked in JavaScript interviews.

**Q1. Basic Async Function Return**

```js
async function greet() {
  return "Hello!";
}

console.log(greet());
```
Output:

```js
Promise { 'Hello!' }
```
Why?

Async functions always return a Promise, even if you return a string.

**Q2. Await inside async function**

```js
async function greet() {
  return "Hello!";
}

async function main() {
  const msg = await greet();
  console.log(msg);
}

main();
```

Output:

```js
Hello!
```

Why?

Here `await` waits for the Promise returned by `greet()` to resolve.

**Q3. Execution Order**

```js
console.log("Start");

async function asyncFunc() {
  console.log("Inside asyncFunc");
  await Promise.resolve();
  console.log("After await");
}

asyncFunc();
console.log("End");
```

Output:

```js
Start
Inside asyncFunc
End
After await
```

Why?

- asyncFunc logs immediately.

- await pauses after that.

- JS finishes the main call stack (logs "End").

- Then resumes the await part in microtask (logs "After await").

**Q4. Mixing async with setTimeout**

```js
async function run() {
  console.log("A");

  setTimeout(() => {
    console.log("B");
  }, 0);

  await Promise.resolve();
  console.log("C");
}

run();
console.log("D");
```

Output:

```js
A
D
C
B
```

Why?

- "A" runs first.

- `setTimeout` is added to macrotask queue.

- "D" prints before `await` resumes.

- "C" prints next from `microtask`.

- Finally "B" from `macrotask`.

**Q5. Awaiting non-promise value**

```js
async function test() {
  const res = await 42;
  console.log(res);
}
test();
```

Output:

```js
42
```

Why?

`await` automatically wraps non-promises in `Promise.resolve(42)`.

**Q6. Error Handling**

```js
async function test() {
  throw new Error("Oops");
}

test()
  .then(() => console.log("Success"))
  .catch((err) => console.log("Caught:", err.message));
```

Output:

```js
Caught: Oops
```

Why?

The rejected promise is caught by `.catch`.

**Q7. Await with Rejected Promise (without try-catch)**

```js
async function test() {
  const res = await Promise.reject("Error!");
  console.log(res);
}

test();
```

Output:

```js
(Uncaught) Error!
```

Why?

No `try...catch`, so the error is uncaught and throws.

**Q8. Chained Async Calls**

```js
async function one() {
  return "One";
}

async function two() {
  const res = await one();
  return res + " Two";
}

two().then(console.log);
```

Output:

```js
One Two
```

Why?

Each `async` function returns a resolved value, chained by `await`.

**Q9. Multiple Awaits**

```js
async function multiAwait() {
  const a = await Promise.resolve("A");
  const b = await Promise.resolve("B");
  console.log(a, b);
}

multiAwait();
```

Output:

```js
A B
```

Why?

Each `await` waits in order, no parallelism here.

**Q10. Async function without await**

```js
async function test() {
  console.log("Test");
}

test();
console.log("Done");
```

Output:

```js
Test
Done
```

Why?

Even without `await`, `async` functions run like normal functions. But they still return a `Promise`.

**Q10. `Promise.all`, `Promise.race`, and `Promise.allSettled`**

`Promise.all`

Resolves when all promises succeed, or rejects immediately if any one fails.

```js
const p1 = Promise.resolve("One");
const p2 = Promise.resolve("Two");
const p3 = Promise.reject("Three");

Promise.all([p1, p2])
  .then(res => console.log("✅ All:", res))
  .catch(err => console.log("❌ Error:", err));

Promise.all([p1, p2, p3])
  .then(res => console.log("✅ All:", res))
  .catch(err => console.log("❌ Error:", err)); // immediately fails with "Three"
```

Why?

- It's used when all tasks must succeed.

- If any fails, whole result is considered failed.

- Great for parallel requests like loading multiple APIs.

`Promise.race`

Resolves or rejects as soon as the first promise settles (either success or fail).

```js
const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 300));
const error = new Promise((_, reject) => setTimeout(() => reject("Error"), 200));

Promise.race([fast, slow, error])
  .then(res => console.log("🏁 Winner:", res))
  .catch(err => console.log("💥 Failed first:", err));
```

Why?

- Used when you need the fastest result (like selecting fastest CDN or fallback).

- Doesn’t wait for others—only cares who finishes first.

`Promise.allSettled`

Waits for all promises, no matter resolve or reject. Always returns an array of results.

```js
const p1 = Promise.resolve("One");
const p2 = Promise.reject("Two failed");

Promise.allSettled([p1, p2]).then(results => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`✅ P${index + 1}:`, result.value);
    } else {
      console.log(`❌ P${index + 1}:`, result.reason);
    }
  });
});
```

Why?

- Used when you want results of all, even failed ones (e.g., batch job processing).

- Never throws—no `.catch` needed.

**Q12. Chaining Multiple Promises**

```js
function doStep1() {
  return Promise.resolve("Step 1");
}

function doStep2(prevResult: string) {
  return Promise.resolve(prevResult + " ➡ Step 2");
}

function doStep3(prevResult: string) {
  return Promise.resolve(prevResult + " ➡ Step 3");
}

function handleError(error: any) {
  console.log("❌ Error caught:", error);
}

doStep1()
  .then(result1 => doStep2(result1))
  .then(result2 => doStep3(result2))
  .then(final => console.log("✅ Final:", final))
  .catch(handleError);
```

Output:

```js
✅ Final: Step 1 ➡ Step 2 ➡ Step 3
```

Why?

- This is how dependent async tasks are chained step by step.

- If any `.then()` fails, control jumps to the `.catch()`.

**Q13. Handling async/await inside loops**

```js
const fetchUser = (id: number): Promise<string> =>
  new Promise(resolve => setTimeout(() => resolve(`User ${id}`), 1000));

const getData = async () => {
  const users = [1, 2, 3];

  for (let id of users) {
    const res = await fetchUser(id);  // Waits one-by-one (not parallel)
    console.log(res);
  }
};

getData();
```

Output:

```js
(after 1 sec) User 1
(after 2 sec) User 2
(after 3 sec) User 3
```

Why?

- `await` inside for...of is sequential.

- Use when order matters (e.g., sending API requests in specific sequence).

- Bad for performance if calls are independent.

Run in parallel (optimized loop):

```js
const getDataParallel = async () => {
  const users = [1, 2, 3];

  const promises = users.map(id => fetchUser(id)); // all started together
  const results = await Promise.all(promises);

  results.forEach(res => console.log(res));
};

getDataParallel();
```

Output:

```js
(after 1 sec) User 1
User 2
User 3
```

Why?

- All promises start immediately.

- Great when you don’t care about order, and want performance.

 Summary Table:

| Feature              | Resolves When             | Rejects When           | Use Case                   |
| -------------------- | ------------------------- | ---------------------- | -----------------          |
| `Promise.all`        | All promises succeed      | Any fails              | Load all APIs together     |
| `Promise.race`       | First promise settles     | First one is rejection | Fastest among several      |
| `Promise.allSettled` | All finish (success/fail) | Never rejects          | Get every resultregardless |


- JavaScript is single-threaded; synchronous code blocks the thread. Asynchronous code uses the event loop so long tasks don’t freeze the app.

- `async/await` is syntax sugar over Promises; it makes asynchronous flows read like synchronous code without blocking the thread.

- Use microtasks for immediate promise continuations and macrotasks for timers and I/O; microtasks run before the next macrotask.