'use strict';

const Anonymizer = (function () {
  const randomLetterNumber = () => Math.floor(Math.random() * 36).toString(36);

  const anonymize = () => '0'.repeat(16).replace(/./g, randomLetterNumber);

  function isValidPassword(attempt) {
    return this.user.password === attempt;
  }

  function withValidPassword(pass, validPasswordDo) {
    return isValidPassword.call(this, pass) ? validPasswordDo() : 'Invalid Password';
  }

  return Object.freeze({
    init(email, password, firstName, lastName) {
      this.user = { email, password, firstName, lastName };
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
      var anonUser = Object.create(Anonymizer).init(email, password, firstName, lastName);

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

console.log('.................................');

var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log('foo', fooBar);
console.log('foo undefined', fooBar.user);
console.log('foo', fooBar.firstName);                     // returns the firstName function
console.log('foo', fooBar.email);                         // returns the email function
console.log('foo', fooBar.lastName);
console.log('foo', fooBar.reanonymize);
console.log('foo', fooBar.password);                      // undefined
'foo',
console.log('foo', fooBar.firstName('123456'));           // logs 'foo'
console.log('foo err', fooBar.firstName('abc'));          // logs 'Invalid Password'
console.log('foo', fooBar.displayName);                   // logs 16 character sequence
console.log('foo err', fooBar.resetPassword('123', 'abc'))     // logs 'Invalid Password';
console.log('foo true', fooBar.resetPassword('123456', 'abc')) // logs true
console.log('foo err', fooBar.lastName('123456'));
console.log('foo', fooBar.lastName('abc'));

var displayName = fooBar.displayName;
console.log('foo true', fooBar.reanonymize('abc'));            // returns true
console.log('foo false', displayName === fooBar.displayName);  // logs false

console.log('.................................');

var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
var quuxQuuz = Object.create(Account).init('quux@quuz.com', '333', 'quuz', 'quux');

console.log('foo', fooBar.firstName('abc'));
console.log('foo err', fooBar.firstName('123456'));
console.log('reset baz', bazQux.resetPassword('123456', '1'));
console.log('foo', fooBar.email('abc'));
console.log('baz', bazQux.email('1'));
console.log('quu', quuxQuuz.email('333'));

console.log('quu', quuxQuuz.displayName);
console.log('quu true', quuxQuuz.reanonymize('333'));
console.log('quu', quuxQuuz.displayName);

console.log('foo', fooBar.firstName('abc'));
console.log('baz', bazQux.firstName('1'));
console.log('quu', quuxQuuz.firstName('333'));
