class Student {
  constructor(firstName, lastName, grade) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grade = grade;
    this.tardies = 0;
    this.scores = [];
  }


  fullName() {
    return this.firstName + " " + this.lastName;
  }
  markLate() {
    this.tardies++;
    return `${this.firstName} has been late ${this.tardies} times`
  }

  addScore(score) {
    this.scores.push(score);
    return this.scores;
  }

  average() {
    let sum = this.scores.reduce((ac, cv) => ac + cv);
    return sum / this.scores.length;
  }

  static enrollStudents() {
    return "Enrolling students!";
  }
}

const dorine = new Student("Dorine", 'Teta', 70);
dorine.addScore(94);
dorine.addScore(92);
// console.log(dorine.average())
console.log(Student.enrollStudents());
