/*
in
  object,
  methodName,
  ...args

out
  value of the delegated function

rules
  maintain reference to the delegates (object.medthod)

  similar to `apply`
    call object, with method, and args

  let delFn = foo[methodName]

  delFn(...args)
*/

function delegate(obj, methodName, ...args) {
  return function () {
    return obj[methodName](...args)
  };
}

var foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

var baz = {
  name: 'McTestFace',
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = function() { console.log('changed'); };

baz.qux();          // logs 'changed'

delegate(foo, 'bar')
