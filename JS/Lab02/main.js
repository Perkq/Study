"use strict";

document.addEventListener("DOMContentLoaded", () => {
	// Задание 1
	function getCirclInfo() {
		let radius = prompt("Введите радиус");
		function getDiam(radius) {
			return radius * 2;
		}
		let getCirLen = function (radius) {
			return 2 * radius * Math.PI;
		};
		let getSquare = (radius) => {
			return radius ** 2 * 2;
		};

		return `Диаметр: ${getDiam(radius)} \n Длина окружности: ${getCirLen(
			radius
		)} \n Площадь: ${getSquare(radius)}`;
	}

	// Задание 2
	function getThreeParams(
		secondPar,
		thirdParam = prompt("Введите третий параметр"),
		firstPar = "First "
	) {
		return "Параметры функции: " + secondPar + thirdParam + firstPar;
	}

	// Задание 3
	function checkStudents() {
		let currentStud = prompt(
			"Введите имена присутствующих студентов через пробел с большой буквы"
		);
		let wordsArr = currentStud.split(" ");
		let count = 0;

		for (let i = 0; i < wordsArr.length; i++) {
			if (wordsArr[i] == "") {
				count++;
			}
		}

		return `Кол-во присутствующих студентов:  ${wordsArr.length - count}`;
	}

	// Задание 4
	function getPass() {
		let alphabet = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z",
		];
		let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
		let countTime = 0;
		for (let frst of alphabet)
			for (let scnd of alphabet)
				for (let thrd of alphabet)
					for (let frth of alphabet)
						for (let fv of alphabet)
							for (let sx of nums)
								for (let svn of nums)
									for (let eight of nums) {
										countTime++;
									}
		countTime *= 3;
		let years = Math.floor(countTime / 31556952);
		countTime %= 31556952;
		let months = Math.floor(countTime / 2592000);
		countTime %= 2592000;
		let days = Math.floor(countTime / 86400);
		countTime %= 86400;
		let hours = Math.floor(countTime / 3600);
		countTime %= 3600;
		let minutes = Math.floor(countTime / 60);
		let seconds = countTime % 60;
		return `Чтобы подобрать пароль понадобится ${years} лет ${months} месяцев ${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`;
	}

	// Задание 5
	function handlingInputs(usersTxt = prompt("Введите данные")) {
		if (usersTxt % 1 == 0) {
			return `Число целое, переведённое в 16-систему: ${Number(
				usersTxt
			).toString(16)}`;
		}

		if (+usersTxt === +usersTxt && +usersTxt % 1 != 0) {
			let up = Math.ceil(usersTxt);
			let down = Math.floor(usersTxt);
			let near = Math.round(usersTxt);
			return `Число дробное, округлённое вверх: ${up}\n вниз: ${down}\n до ближайшего целого: ${near}`;
		}
		return `Строка\n в верхнем регистре: ${usersTxt.toUpperCase()}\n в нижнем регистре ${usersTxt.toLowerCase()}`;
	}

	// Задание 6
	function checkDictionary(
		defWord = prompt("Введите словарное слово: ").toLowerCase(),
		usersWord = prompt("Выпускник введи слово: ").toLowerCase()
	) {
		if (defWord.length != usersWord.length) {
			return "Не хватает букв";
		}

		let faultArr = [];
		let flag = true;
		for (let symbInd in usersWord) {
			if (!(defWord[symbInd] == usersWord[symbInd])) {
				faultArr.push(symbInd);
				flag = false;
			}
		}

		if (flag) {
			return "Слово введено правильно";
		} else {
			let stringOfMiss = "";
			for (let index of faultArr) {
				stringOfMiss +=
					'вместо "' +
					usersWord[index] +
					'" должна быть "' +
					defWord[index] +
					'", ';
			}
			return defWord + "\n" + usersWord + "\n" + stringOfMiss;
		}
	}

	// Задание 7
	function getTriangleParams(
		frstLeg = prompt("Введите первый катет: "),
		scndLeg = prompt("Введите второй катет: ")
	) {
		let hypot = Math.sqrt(frstLeg ** 2 + scndLeg ** 2);
		let square = (frstLeg * scndLeg) / 2;
		let perim = hypot + +frstLeg + +scndLeg;
		let height = (frstLeg * scndLeg) / hypot;

		let frstSin = scndLeg / hypot;
		let frstCos = frstLeg / hypot;
		let frstTg = scndLeg / frstLeg;
		let frstCtg = frstLeg / scndLeg;

		// let scndSin = frstLeg / hypot;
		// let scndCos = scndLeg / hypot;
		// let scndTg = frstLeg / scndLeg;
		// let scndCtg = scndLeg / frstLeg;
		return `Катеты ${frstLeg} и ${scndLeg}\n
	            Площадь: ${square}\n
	            Периметр: ${perim}\n
	            Высота: ${height}\n
	            Параметры для угла у первого катета\n
	            Синус: ${frstSin}\n
	            Косинус: ${frstCos}\n
	            Тангенс: ${frstTg}\n
	            Котангенс ${frstCtg}\n`;
		// Параметры для угла у второго катета\n
		// Синус: ${scndSin}\n
		// Косинус: ${scndCos}\n
		// Тангенс: ${scndTg}\n
		// Котангенс ${scndCtg}\n`
	}

	while (true) {
		switch (+prompt("Введите номер задания")) {
			case 1:
				alert(getCirclInfo());
				break;
			case 2:
				alert(getThreeParams("Second"));
				break;
			// case 3:
			// 	alert(checkStudents());
			// 	break;
			case 4:
				alert(getPass());
				break;
			case 5:
				alert(handlingInputs());
				break;
			case 6:
				alert(checkDictionary());
				break;
			case 7:
				alert(getTriangleParams());
				break;
			default:
				alert("Выход");
				return false;
		}
	}

	// alert(checkStudents());
});
