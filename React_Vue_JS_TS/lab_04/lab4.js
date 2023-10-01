var array = [
    { id: 1, name: "Vasya", group: 10 },
    { id: 2, name: "Ivan", group: 11 },
    { id: 3, name: "Masha", group: 12 },
    { id: 4, name: "Petya", group: 10 },
    { id: 5, name: "Kira", group: 11 },
];
var car = {};
car.manufacturer = "manufacturer";
car.model = "model";
var car1 = {};
car1.manufacturer = "manufacturer";
car1.model = "model";
var car2 = {};
car2.manufacturer = "manufacturer";
car2.model = "model";
var arrayCars = [
    {
        cars: [car1, car2]
    },
];
var group = {
    students: [
        {
            id: 1,
            name: "Polina",
            group: 10,
            marks: [
                { subject: "KYAR", mark: 3, done: true },
                { subject: "KYAR", mark: 9, done: true },
            ]
        },
        {
            id: 4,
            name: "Kristina",
            group: 10,
            marks: [
                { subject: "KYAR", mark: 8, done: true },
                { subject: "KYAR", mark: 7, done: true },
            ]
        },
        {
            id: 2,
            name: "Artem",
            group: 9,
            marks: [
                { subject: "KYAR", mark: 1, done: true },
                { subject: "KYAR", mark: 6, done: true },
            ]
        },
        {
            id: 3,
            name: "Nastya",
            group: 6,
            marks: [
                { subject: "KPO", mark: 7, done: true },
                { subject: "KPO", mark: 2, done: true },
            ]
        },
    ],
    studentsFilter: function (group) {
        return this.students.filter(function (student) { return student.group === group; });
    },
    marksFilter: function (mark) {
        {
            return this.students.filter(function (student) {
                return student.marks.filter(function (marks) { return marks.mark === mark; }).length > 0;
            });
        }
    },
    deleteStudent: function (id) {
        this.students = this.students.filter(function (student) { return student.id !== id; });
    },
    mark: 4,
    group: 10
};
console.log.apply(console, group.marksFilter(7));
console.log.apply(console, group.studentsFilter(10));
group.deleteStudent(4);
console.log.apply(console, group.students);
