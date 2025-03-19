function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  ) {
    return obj1 === obj2;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}

function union(arr1 = [], arr2 = []) {
  const combinedArr = [...arr1, ...arr2];
  const uniqueArr = [];

  for (const item of combinedArr) {
    const exists = uniqueArr.some((uniqueItem) => deepEqual(uniqueItem, item));
    if (!exists) uniqueArr.push(item);
  }

  return uniqueArr;
}

console.log("1) ", union([1, 2, 3], [2, 3, 4]));
console.log("2) ", union(["a"], ["b"]));
console.log("3) ", union([1], ["1", 1]));
console.log("4) ", union([{ a: { b: 10 } }], [{ a: { b: 20 } }]));
console.log(
  "5) ",
  union(
    [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2],
    [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, "2"]
  )
);

module.exports = { union };
