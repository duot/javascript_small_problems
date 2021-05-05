function myFilter(array, func, thisArg) {
  var result = [];
  let bound = func.bind(thisArg)

  array.forEach(function(value) {
    if (bound(value)) {
      result.push(value);
    }
  });

  return result;
}

var filter = {
  allowedValues: [5, 6, 9],
}

let result = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]

console.log(result);
