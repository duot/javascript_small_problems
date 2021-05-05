Object.prototype.ancestors = function () {
  let result = [];

  let cur = Object.getPrototypeOf(this);
  while (cur) {
    result.push(cur.name || 'Object.prototype');
    cur = Object.getPrototypeOf(cur);
  }
  return result
};


// name property added to make objects easier to identify
var foo = {name: 'foo'};
var bar = Object.create(foo);
bar.name = 'bar';
var baz = Object.create(bar);
baz.name = 'baz';
var qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']
