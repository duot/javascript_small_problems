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

function createSchool() {
return (function () {

  let validYears = ['1st', '2nd', '3rd', '4th'];
  let students =  [];
  let courseCodes = {
    101: 'Math',
    102: 'Advanced Math',
    202: 'Physics',
  };


  function findStudentByName(name) {
    return students.find(student => student.name === name);
  }

  return {
    addStudent: function (name, year) {
      if (!validYears.includes(year)) {
        console.log('Invalid Year');
        return;
      }

      let student = createStudent(name, year);
      students.push(student);
    },

    enrollStudent: function (name, code) {
      let student = findStudentByName(name);
      student.addCourse({ name: courseCodes[code], code });
    },

    addGrade: function (name, code, grade) {
      let student = findStudentByName(name);
      let course = student.listCourses().find(course => course.code === code);
      course.grade = grade;
    },

    getReportCard: function (name) {
      let student = findStudentByName(name);
      let courses = student.listCourses();
      courses.forEach(course => {
        let { name, grade } = course;
        console.log(`${name}: ${(grade || 'In progress')}`);
      });
    },

    courseReport: function (courseName) {
      let studentsInCourse = students.filter(student => {
        student.listCourses().some(course => course === courseName);
      });

      console.log(`=${courseName}=`);
      let sum = studentsInCourse.reduce((acc, student) => {
        let grade = student.listCourses.find(course => course === courseName);

        console.log(`${student.name}: course`);
      }, 0);


      console.log(`Course Average: ${sum / studentsInCourse.length }`);
    },
  };
})();
}

school = createSchool();
school.addStudent('foo', '3rd');
school.enrollStudent('foo', 101);
school.enrollStudent('foo', 102);
school.enrollStudent('foo', 202);
school.addGrade('foo', 101, 95);
school.addGrade('foo', 102, 90);

school.getReportCard('foo');
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
