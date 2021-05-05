
function Person(first, last, age, gender) {
  this.first = first;
  this.last = last;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function () {
  return this.first + ' ' + this.last;
};
Person.prototype.communicate = function () {
  console.log(this.fullName(), 'communicating');
};
Person.prototype.eat = function () {
  console.log(this.fullName(), 'eating');
};
Person.prototype.sleep = function () {
  console.log(this.fullName(), 'sleeping');
};

function Doctor(first, last, age, gender, specialization) {
  Person.call(this, first, last, age, gender)

  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.diagnose = function () {
console.log(this.fullName(), 'Diagnosing');
};

function Professor(first, last, age, gender, subject) {
  Person.call(this, first, last, age, gender)
  this.subject = subject;
}
Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.teach = function () {
  console.log(this.fullName(), 'teaching');
};


function Student(first, last, age, gender, degree) {
  Person.call(this, first, last, age, gender)
  this.degree = degree;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function () {
  console.log(this.fullName(), 'Studying');
};

function GraduateStudent(first, last, age, gender, ...graduateDegree) {
  Student.call(this, first, last, age, gender)
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;
GraduateStudent.prototype.research = function () {
  console.log(this.fullName(), 'researching');
};

/////////////////////////////////////////////////////////////////////////////
/*
extend
  in
    object,
    professional
      object?
  out
    object, with added methods: invoice, payTax



*/

function delegate(callingObject, methodOwner, methodName) {
  return function() {
    return methodOwner[methodName].apply(callingObject, arguments);
  };
}

var professional = {
  payTax: function () {
    console.log(this.fullName() + ' Paying taxes');
  },
  invoice: function () {
    console.log((this.fullName() + ' Billing customer'));
  },
};

function extend(object, mixin) {
  Object.keys(mixin).forEach((method) => {
    object[method] = delegate(object, mixin, method);
  });

  return object;
}

var doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'S
doctor.diagnose();                         // logs 'Diagnosing'

var professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), professional);
console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
professor.communicate();                      // logs 'Communicating'
professor.sleep();                            // logs 'Sleeping'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

professional.invoice = function() {
  console.log(this.fullName() + ' is Asking customer to pay');
};


doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'
