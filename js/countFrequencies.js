/**
Count how many times each element appears in an array.
Input: ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
Output: { apple: 3, banana: 2, orange: 1 }
 */

export function countFrequencies(arr) {
    const frequencyMap = {};
    for (const item of arr) {
        if (frequencyMap[item]) {
            frequencyMap[item]++;
        } else {
            frequencyMap[item] = 1;
        }
    }
    return frequencyMap;
}

export function countFrequenciesWithReduce(arr){
    return arr.reduce((acc, curr)=>{
        acc[curr] = (acc[curr] || 0) + 1
        return acc 
    },{})
}

