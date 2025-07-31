export function customMap(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    // Call the callback with current value, index, and whole array
    result.push(callback(array[i], i, array));
    console.log("res",result);
  }
  return result;
}
