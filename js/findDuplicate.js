export function findDuplicate(arr) {
  const seen = new Set();
  const duplicates = [];
    for (const item of arr) {
        if (seen.has(item)){
            duplicates.push(item);
        }
        seen.add(item);
}
    return duplicates;
}

