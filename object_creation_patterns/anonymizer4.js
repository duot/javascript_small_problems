'use strict';

const PlainUser = Object.freeze({
  init: function (email, password, firstName, lastName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  }
});

const Anonymizer = (function () {
  function randomLetter() {
    var index = Math.floor(Math.random() * 62)
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[index];
  }

  function anonymize() {
    return ' '.repeat(16).replace(/\s/g, randomLetter);
  }

  function isValidPassword(attempt) {
    return this.user.password === attempt;
  }

  function withValidPassword(pass, validPasswordDo) {
    return isValidPassword.call(this, pass) ? validPasswordDo() : 'Invalid Password';
  }

  return Object.freeze({
    init(user) {
      this.user = user;
      this.displayName = anonymize();
      return this;
    },

    reanonymize(password) {
      return withValidPassword.call(this, password, () => {
        this.displayName = anonymize();
        return true;
      });
    },

    resetPassword(currentPassword, newPassword) {
      return withValidPassword.call(this, currentPassword, () => {
        this.user.password = newPassword;
        return true;
      });
    },

    firstName(password) {
      return withValidPassword.call(this, password, () => this.user.firstName);
    },

    lastName(password) {
      return withValidPassword.call(this, password, () => this.user.lastName);
    },

    email(password) {
      return withValidPassword.call(this, password, () => this.user.email);
    },
  });
})();

var Account = (function () {
  const delegate = (context, methodName) => {
    return (...args) => context[methodName].apply(context, args);
  }

  return {
    init(email, password, firstName, lastName) {
      var plainUser = Object.create(PlainUser)
                            .init(email, password, firstName, lastName);
      var anonUser = Object.create(Anonymizer).init(plainUser);

      Object.defineProperty(this, 'displayName', {
        get: () => anonUser.displayName,
      });

      this.reanonymize = delegate(anonUser, 'reanonymize');
      this.resetPassword = delegate(anonUser, 'resetPassword')
      this.email = delegate(anonUser, 'email');
      this.firstName = delegate(anonUser, 'firstName')
      this.lastName = delegate(anonUser, 'lastName')
      return this;
    },
  };
})();


var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log('foob', fooBar);
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.lastName);
console.log(fooBar.reanonymize);
console.log(fooBar.password);                      // undefined

console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true
console.log(fooBar.lastName('123456'));
console.log(fooBar.lastName('abc'));

var displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));            // returns true
console.log(displayName === fooBar.displayName);   // logs false


var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
var quuxQuuz = Object.create(Account).init('quux@quuz.com', '333', 'quuz', 'quux');

console.log('foo name', fooBar.firstName('abc'));
console.log('foo name err', fooBar.firstName('123456'));
console.log('reset baz', bazQux.resetPassword('123456', '1'));
console.log(fooBar.email('abc'));
console.log(bazQux.email('1'));
console.log(quuxQuuz.email('333'));

console.log(quuxQuuz.displayName);
console.log(quuxQuuz.reanonymize('333'));
console.log(quuxQuuz.displayName);

console.log(fooBar.firstName('abc'));
console.log(bazQux.firstName('1'));
console.log(quuxQuuz.firstName('333'));
/*
*/
