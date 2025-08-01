export function curry(fn) {
  return function curried(...args) {           // Step 1: collect args
    if (args.length >= fn.length) {            // Step 2: check if enough
      return fn.apply(this, args);             // Step 3: call original
    } else {
      return function (...nextArgs) {          // Not enough → return new fn
        return curried.apply(this, args.concat(nextArgs)); // Keep collecting
      };
    }
  };
}
