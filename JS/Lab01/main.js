"use strict";

document.addEventListener("DOMContentLoaded", () => {
	function pow(x, n) {
		let result = 1;
		for (var i = 0; i < n; i++) {
			result *= x;
		}

		return result;
	}

	let x = prompt("x?");
	let n = prompt("n?");

	if (n < 0) {
		alert(`Степень ${n} не поддерживается, введите целую степень, большую 0`);
	} else {
		alert(pow(x, n));
	}

	let name = "Artsiom";
	let city = "Minsk";
	let birthDay = 2003;
	const COLOR_RED = "#FF0000";
	let answer = true;
	let infinity = 1 / 0;
	let number = 532;
	let perimiter = "120мм";

	let a = 5; // int
	let name2 = "Name"; // string
	let i = 0; // int or bool
	let double = 0.23; // double
	let result = 1 / 0; // number
	let answer2 = true; // bool
	let no = null; // null

	let squareA = 45 * 21;
	let squareB = 5 * 5;
	let count = squareA / squareB;

	console.log("S(A) = " + squareA);
	console.log("S(B) = " + squareB);
	console.log("S(A)/S(B) = " + count);

	let i2 = 2;
	let a2 = ++i2;
	let b = i2++; // equal

	console.log("Привет" < "привет"); // true
	console.log("Привет" > "Пока"); // true
	console.log(45 > "53"); // false
	console.log(false < 3); // true
	console.log(true > 3); // false
	console.log(3 > "5мм"); // false
	console.log(null == undefined); //true

	let userAnswer = prompt("Секретный вопрос: кто убил Кеннеди?");
	alert("Введённые данные неверны");

	let login = prompt("Введите логин");
	let password = prompt("Введите пароль");
	alert("Теперь выполните вход");
	if (
		login == prompt("Введите логин") &&
		password == prompt("Введите пароль")
	) {
		alert("Вход выполнен успешно");
	} else {
		alert("Неправильные логин или пароль");
	}

	alert("Введи оценки за экзамены");
	let rus = prompt("Русский");
	let math = prompt("Математика");
	let engl = prompt("Английский");
	if (rus > 4 && math > 4 && engl > 4) {
		alert("Поздравляю, ты переведен на следующий курс");
	} else if (rus < 4 && math < 4 && engl < 4) {
		alert("Отчислен");
	} else {
		alert("Тебя ожидает пересдача");
	}

	alert(Number(prompt("Введи число а")) + Number(prompt("Введи число b")));

	console.log("Задание 13");
	console.log(true + true); // 2
	console.log(0 + "5"); // 05
	console.log(5 + "мм"); // 5мм
	console.log(8 / Infinity); // 0
	console.log(9 * "\n9"); // 81
	console.log(null - 1); // -1
	console.log("5" - 2); // 3
	console.log("5px" - 3); // NaN
	console.log(true - 3); // -2
	console.log(7 || 0); // 7

	console.log("Задание 14");
	for (let i = 1; i < 10; i++) {
		if (i % 2 == 0) {
			console.log(i + 2);
		} else {
			console.log(i + "мм");
		}
	}

	while (prompt("Введите число") < 100);

	switch (Number(prompt("Введите номер дня недели"))) {
		case 1:
			alert("Сегодня понедельник");
			break;
		case 2:
			alert("Сегодня вторник");
			break;
		case 3:
			alert("Сегодня среда");
			break;
		case 4:
			alert("Сегодня четверг");
			break;
		case 5:
			alert("Сегодня пятница");
			break;
		case 6:
			alert("Сегодня суббота");
			break;
		case 7:
			alert("Сегодня воскресенье");
			break;
		default:
			alert("Данные введены неправильно");
			break;
	}
});
