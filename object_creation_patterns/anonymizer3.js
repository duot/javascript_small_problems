/*
using OLOO

  anonimizer
    creates 16 char of letters and numbers

  no other properties must exist in account object

account object
  init(email, password, firstName, lastName, displayNam)

  reanonymize(password)
    if valid password
      displayNam = anonymizer()
      return true
    else
      'Invalid Password'

  resetPassword
    check password valid
      password = prompt new [password
      return true
    else
      'Invalid Password'

  firstName
    validate password
    return firstName

  lastName
    validate pasword
    return lastName

  email
    validate password
    return email

  displayNam
    return display name


  in order to create private properties for each account instance,
    and without exposing any other properties in the account object,
    we need a closure,
      the closure maintains the user data

      the functions,


var User = {
  email,
  password,
  firstName,
  lastName,

};
/*
user2.email('123') -> Invalid | email@e.c
*/

function ValidatedUser(email, password, firstName, lastName) {
  var userEmail = email;
  var userPassword = password;
  var userFirstName = firstName;
  var userLastName = lastName;

  function isValidPassword(attempt) {
    return userPassword === attempt;
  }

  function randomLetter() {
    var index = Math.floor(Math.random() * 62)
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[index];
  }

  function anonymize() {
    let chars = Array(16);
    return Array.from(chars, randomLetter).join('');
  }

  function withValidPassword(pass, validPasswordDo) {
    return isValidPassword(pass) ? validPasswordDo() : 'Invalid Password';
  }

  return {
    displayName: anonymize(),

    reanonymize: function (password) {
      return withValidPassword(password, () => {
        this.displayName = anonymize();
        return true;
      });
    },

    resetPassword: function (currentPassword, newPassword) {
      return withValidPassword(currentPassword, () => {
        userPassword = newPassword;
        return true;
      });
    },

    firstName: function (password) {
      return withValidPassword(password, () => userFirstName);
    },

    lastName: function (password) {
      return withValidPassword(password, () => userLastName);
    },

    email: function (password) {
      return withValidPassword(password, () => userEmail);
    },
  };
}

function delegate(context, methodName) {
  return function(...args) {
    return context[methodName].apply(context, args);
  };
}

var Account = {
  init: function (email, password, firstName, lastName) {
    var user = new ValidatedUser(email, password, firstName, lastName);
    Object.defineProperty(this, 'displayName', {
      get: function () { return user.displayName },
    });
    this.reanonymize = delegate(user, 'reanonymize');
    this.resetPassword = delegate(user, 'resetPassword')
    this.email = delegate(user, 'email');
    this.firstName = delegate(user, 'firstName')
    this.lastName = delegate(user, 'lastName')
    return this;
  },
};


var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

var displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false


var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
var quuxQuuz = Object.create(Account).init('quux@quuz.com', '333', 'quuz', 'quux');
console.log('foo name', fooBar.firstName('abc'));              // logs 'baz' but should log foo.
console.log('foo name err', fooBar.firstName('123456'));              // logs 'baz' but should log foo.
console.log(fooBar.email('abc'));                  // 'baz@qux.com' but should 'foo@bar.com'
console.log(bazQux.email('123456'));
console.log(quuxQuuz.email('333'));
/*
*/
