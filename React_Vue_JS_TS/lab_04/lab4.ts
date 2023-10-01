//1 задание
type Mystudent = {
  id: number;
  name: string;
  group: number;
};

const array: Mystudent[] = [
  { id: 1, name: "Vasya", group: 10 },
  { id: 2, name: "Ivan", group: 11 },
  { id: 3, name: "Masha", group: 12 },
  { id: 4, name: "Petya", group: 10 },
  { id: 5, name: "Kira", group: 11 },
];

//2 задание
type CarsType = {
  manufacturer?: string;
  model?: string;
};
let car: CarsType = {};
car.manufacturer = "manufacturer";
car.model = "model";

//3 задание
type ArrayCarsType = {
  cars: Array<CarsType>;
};

const car1: CarsType = {};
car1.manufacturer = "manufacturer";
car1.model = "model";

const car2: CarsType = {};
car2.manufacturer = "manufacturer";
car2.model = "model";

const arrayCars: Array<ArrayCarsType> = [
  {
    cars: [car1, car2],
  },
];

//4 задание
type MarkFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type GroupFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type DoneType = boolean; 

type MarkType = {
  subject: string;
  mark: MarkFilterType;  // может принимать значения от 1 до 10
  done: DoneType;
};
type StudentType = {
  id: number;
  name: string;
  group: GroupFilterType; // может принимать значения от 1 до 12
  marks: Array<MarkType>;
};

type GroupType = {
  students: StudentType[]; 
  studentsFilter: (group: number) => Array<StudentType>; 
  marksFilter: (mark: number) => Array<StudentType>; 
  deleteStudent: (id: number) => void; 
  mark: MarkFilterType;
  group: GroupFilterType;
};

const group: GroupType = {
  students: [
    {
      id: 1,
      name: "Polina",
      group: 10,
      marks: [
        { subject: "KYAR", mark: 3, done: true },
        { subject: "Java", mark: 9, done: true },
      ],
    },
    {
      id: 4,
      name: "Kristina",
      group: 10,
      marks: [
        { subject: "OOP", mark: 8, done: true },
        { subject: "JS", mark: 7, done: true },
      ],
    },
    {
      id: 2,
      name: "Artem",
      group: 9,
      marks: [
        { subject: "KPO", mark: 1, done: true },
        { subject: "Math", mark: 6, done: true },
      ],
    },
    {
      id: 3,
      name: "Nastya",
      group: 6,
      marks: [
        { subject: "KSIS", mark: 7, done: true },
        { subject: "PSP", mark: 2, done: true },
      ],
    },
  ],
  studentsFilter: function (group: number) {
    return this.students.filter((student) => student.group === group);
  },
  marksFilter: function (mark: number) {
    {
      return this.students.filter(
        (student) =>
          student.marks.filter((marks) => marks.mark === mark).length > 0
      );
    }
  },
  deleteStudent: function (id: number) {
    this.students = this.students.filter((student) => student.id !== id);
  },
  mark: 4,
  group: 10,
};

console.log(...group.marksFilter(7));
console.log(...group.studentsFilter(10));
group.deleteStudent(4);
console.log(...group.students);
