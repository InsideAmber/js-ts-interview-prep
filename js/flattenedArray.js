export function flattenIterative(arr) {
    // spread operator to create a shallow copy of the array
  const stack = [...arr];
    // result array to hold the flattened elements
  const result = [];
// Iterate while there are elements in the stack
  while (stack.length) {
    // pop the last element from the stack
    // if it's an array, push its elements onto the stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next); 
    } else {
        // if it's not an array, add it to the result
      result.push(next);
    }
  }
// reverse the result to maintain the original order
  return result.reverse();
}


