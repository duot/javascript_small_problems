function objectsEqual(a, b) {
  if (a === b) return true;
  
  for (let [key, val] of Object.entries(a)) {
    if (b[key] !== val) return false;
  }

  for (let [key, val] of Object.entries(b)) {
    if (a[key] !== val) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
