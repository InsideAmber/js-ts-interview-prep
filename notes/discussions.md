## Why are numbers converted to strings as object keys?

In JavaScript, all object property keys are strings (or symbols) — even if you use a number when defining or accessing the property.

So, when you run this code:

```js
const input2 = [1,1,2,3,4,4,5,5,5];

const output = countOccurrences(input2);
console.log(output);
```
The output is:

```js
{ '1': 2, '2': 1, '3': 1, '4': 2, '5': 3 }
```
Even though you used numbers like `1`, `2`, etc., they are automatically converted to strings when used as object keys.

How JavaScript Handles Object Keys

- All property keys (except `Symbol`) are stored as strings internally.

- When you use a number as a key, JavaScript automatically converts it to a string.

Example:

```js
const obj = {};
obj[1] = "one";
obj["1"] = "ONE";
console.log(obj[1]);   // "ONE"
console.log(obj["1"]); // "ONE"
```
Here, `obj[1]` and `obj["1"]` refer to the same property, because 1 is converted to the string "1".

Why Didn’t You See Quotes Around 'apple'?

Good question! When you see the output:

```js
{ apple: 3, banana: 2, orange: 1 }
```

It’s just how the JavaScript console formats the output for readability. Even though `apple`, `banana`, etc. are technically strings, the console omits the quotes because they are valid identifiers.

If you explicitly check the keys, you’ll see they're strings:

```js
console.log(typeof Object.keys(output)[0]); // "string"
```
So both cases are the same:

- Numbers are converted to strings when used as object keys.

- Strings that are valid identifiers are shown without quotes in the console output for readability.

Conclusion

- Object keys in JavaScript are always either strings or symbols.

- If you use a number as a key, JavaScript automatically converts it to a string.

- The console output may omit quotes for readability, but under the hood, keys are strings in both cases.

Key Takeaways

- Writing `obj.apple` is equivalent to `obj["apple"]`.

- Writing `obj["apple"]` explicitly accesses the "apple" property.

- Writing `obj[apple]` will only work if there’s a variable apple whose value is `"apple"`.

Example Demonstrating All Cases

```js
const obj = { apple: 3, banana: 2, orange: 1 };

// Access using dot notation
console.log(obj.apple); // 3

// Access using string literal
console.log(obj["apple"]); // 3

// Access using a variable
const apple = "apple";
console.log(obj[apple]); // 3

// If the variable 'apple' is undefined
// console.log(obj[apple]); // ❌ Throws an error: apple is not defined
```