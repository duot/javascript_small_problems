function myBind(func, context) {
  return func.bind(context)
}

function myBind(func, context) {
  let partial = [].slice.call(arguments, 2);

  return function (...args) {
    return func.apply(context, partial.concat(args))
  };
}

function addNumbers(a, b) {
  return a + b;
}

var addFive = myBind(addNumbers, null, 5);

console.log(addFive(10)) // 15
