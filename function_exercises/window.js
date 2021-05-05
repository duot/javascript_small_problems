var greeter = (function () {
  var name = 'Naveed';
  var greeting = 'Hello';

  return {
    message: greeting + ' ' + name + '!',
    sayGreetings: function() {
      console.log(this.message);
    }
  };
})();

console.log(greeter);
console.log(greeter.sayGreetings());
