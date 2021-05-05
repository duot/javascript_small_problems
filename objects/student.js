function createStudent(name, year) {
  return {
    name,
    year,
    info: function () {
      console.log(`${this.name} is a ${this.year} student`);
    },

    courses: [],
    addCourse: function (course) {
      this.courses.push(course);
    },
    listCourses: function () {
      return this.courses;
    },

    addNote: function (code, note) {
      let found = this.courses.find(course => course.code === code);
      found.notes = (found.notes || []).concat(note);
    },

    updateNote: function (code, note) {
      let found = this.courses.find(course => course.code === code);
      found.notes = [note];
    },

    viewNotes: function () {
      this.listCourses().forEach(course => {
        if (course.notes) {
          console.log(`${course.name}: ${(course.notes || []).join('; ')}`);
        }
      });
    },
  };
}

console.log(foo = createStudent('Foo', '1st'));
console.log(foo.info());
//Foo is a 1st year student
console.log(foo.listCourses());
//[]
console.log(foo.addCourse({ name: 'Math', code: 101 }));
console.log(foo.addCourse({ name: 'Advanced Math', code: 102 }));
console.log(foo.listCourses());
//{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }])
console.log(foo.addNote(101, 'Fun course'));
console.log(foo.addNote(101, 'Remember to study for algebra'));
console.log(foo.viewNotes());
//Math: Fun Course; Remember to study for algebra
console.log(foo.addNote(102, 'Difficult subject'));
console.log(foo.viewNotes());
//Math: Fun Course; Remember to study for algebra
//Advanced Math: Difficult Subject
console.log(foo.updateNote(101, 'Fun course'));
console.log(foo.viewNotes());
//Math: Fun Course
//Advance Math: Difficult Subject
