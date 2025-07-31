export function customMap(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    // Call the callback with current value, index, and whole array
    result.push(callback(array[i], i, array));
    console.log("res",result);
  }
  return result;
}

/**
 callback(array[i], i, array) is simply calling the callback function (num) => num * 2 
 with the current element, its index, and the entire array.

 */
