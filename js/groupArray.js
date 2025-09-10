/**
Group an array of objects by the 'city' property.
Input: 
[
 { name: 'Alice', city: 'New York' },
 { name: 'Bob', city: 'London' },
 { name: 'Charlie', city: 'New York' }
]
 */

export function groupByCity(arr) {
    const grouped = {};
    for (const obj of arr) {
        const city = obj.city;  
        // If the city key doesn't exist, create an empty array
        if (!grouped[city]) {
            // Initialize the array for this city
            grouped[city] = [];
        }
        // Push the current object into the array for this city
        grouped[city].push(obj);
    }   
    return grouped;
}