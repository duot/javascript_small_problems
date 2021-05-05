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

    */

var Account = (function () {
  function User(email, password, firstName, lastName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  function isValidPassword(attempt, user) {
    return user.password === attempt;
  }

  function randomLetter() {
    var index = Math.floor(Math.random() * 62)
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[index];
  }

  function anonymize() {
    let chars = Array(16);
    return Array.from(chars, randomLetter).join('');
  }

  function withValidPassword(pass, user, validPasswordDo) {
    return isValidPassword(pass, user) ? validPasswordDo() : 'Invalid Password';
  }

  return {
    init: function (email, password, firstName, lastName) {
      var user = new User(email, password, firstName, lastName);
      this.displayName = anonymize();
      Object.assign(this, {
        reanonymize: function (password) {
          return withValidPassword(password, user, () => {
            this.displayName = anonymize();
            return true;
          });
        },

        resetPassword: function (currentPassword, newPassword) {
          return withValidPassword(currentPassword, user, () => {
            user.password = newPassword;
            return true;
          });
        },

        firstName: function (password) {
          console.log(user.firstName);
          return withValidPassword(password, user, () => user.firstName);
        },

        lastName: function (password) {
          return withValidPassword(password, user, () => user.lastName);
        },

        email: function (password) {
          return withValidPassword(password, user, () => user.email);
        },
    });
    return this;
  },
  }
})();

var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log('fname function', fooBar.firstName);                     // returns the firstName function
console.log('email function', fooBar.email);            // returns the email function
console.log('fname',fooBar.firstName('123456'));           // logs 'foo'
console.log('invalid',fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log('display', fooBar.displayName);                   // logs 16 character sequence
console.log('invalid reset', fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log('true', fooBar.resetPassword('123456', 'abc')) // logs true

var displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log('false', displayName === fooBar.displayName);   // logs false

var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log('foo', fooBar.firstName('abc'));              // logs 'baz' but should log foo.
console.log('foo', fooBar.email('abc'));                  // 'baz@qux.com' but should 'foo@bar.com'

console.log('foo display', fooBar.displayName);                   // logs 16 character sequence
console.log('baz display', bazQux.displayName);                   // logs 16 character sequence
console.log(bazQux.reanonymize('123456'))
console.log('baz display', bazQux.displayName);                   // logs 16 character sequence

console.log('baz', bazQux)
console.log('foo', fooBar)
