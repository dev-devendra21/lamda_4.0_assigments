const { union } = require("./union");

describe("union function", () => {
  it("should handle primitive values", () => {
    expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(union(["a"], ["b"])).toEqual(["a", "b"]);
    expect(union([1], ["1", 1])).toEqual([1, "1"]);
  });

  it("should handle objects", () => {
    expect(union([{ a: { b: 10 } }], [{ a: { b: 20 } }])).toEqual([
      { a: { b: 10 } },
      { a: { b: 20 } },
    ]);
  });

  it("should handle deeply nested objects", () => {
    const arr1 = [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2];
    const arr2 = [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, "2"];

    const expectedOutput = [
      { b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } },
      2,
      "2",
    ];

    expect(union(arr1, arr2)).toEqual(expectedOutput);
  });
});
