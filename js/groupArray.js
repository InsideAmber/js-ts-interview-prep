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
        if (!grouped[city]) {
            grouped[city] = [];
        }
        grouped[city].push(obj);
    }   
    return grouped;
}