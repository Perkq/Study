"use strict";

document.addEventListener("DOMContentLoaded", () => {
	// Задание 1

	function checkComment(
		userTxt = prompt("Введите комментарий"),
		numOfSymb = prompt("Введите максимальную длину коммента")
	) {
		if (userTxt.length > numOfSymb) {
			userTxt = userTxt.substring(0, numOfSymb);
		}
		userTxt = userTxt.replace("кот", "***");
		userTxt = userTxt.replace("пес", "многоуважаемый пес");
		userTxt = userTxt.replace("собак", "Собак");
		return userTxt;
	}

	// Задание 2
	function getDay(curDay = +prompt("Введите номер дня")) {
		let weekDays = {
			1: "пн",
			2: "вт",
			3: "ср",
			4: "чт",
			5: "пт",
			6: "сб",
			7: "вс",
		};
		let oddDays = "";
		for (let count in weekDays) {
			if (count % 2 != 0) {
				oddDays += count + " - " + weekDays[count] + ", ";
			}
		}
		return `Сегодня ${weekDays[curDay]}, нечетные дни ${oddDays}`;
	}

	// Задание 3
	function makeButt() {
		const defButton = {
			fontsize: "15px",
			textDecoration: "Arial",
			color: "RED",
		};

		const defLink = {
			fontSize: "15px",
			textDecoration: "Times",
			color: "BLUE",
		};

		const customStyle = {
			fontSize: "20px",
			textDecoration: "Verdana",
			color: "YELLOW",
		};

		let button = document.querySelectorAll("button");
		let links = document.querySelectorAll("a");

		for (let temp of button) {
			setDefOutfitBut(temp);
		}

		for (let temp of links) {
			setDefOutfitLink(temp);
		}

		function setDefOutfitBut(but) {
			but.style.backgroundColor = defButton.color;
			but.style.fontSize = defButton.fontsize;
			but.style.fontFamily = defButton.textDecoration;
		}

		function setDefOutfitLink(lnk) {
			lnk.style.backgroundColor = defLink.color;
			lnk.style.fontSize = defLink.fontSize;
			lnk.style.fontFamily = defLink.textDecoration;
		}

		function changeOutfit(elem) {
			elem.style.backgroundColor = customStyle.color;
			elem.style.fontSize = customStyle.fontSize;
			elem.style.fontFamily = customStyle.textDecoration;
		}

		changeOutfit(button[1]);
		changeOutfit(links[1]);
	}

	// Задание 4
	function checkProds() {
		let set = new Set();

		while (true) {
			switch (
				+prompt(
					"Введите номер операции(1 - добавление, 2 - удаление, 3 - подсчет кол-ва, 4 - проверка на наличие)"
				)
			) {
				case 1:
					set.add(prompt("Введите продукт"));
					break;
				case 2:
					set.delete(prompt("Введите продукт"));
					break;
				case 3:
					alert("Кол-во продуктов: " + set.size);
					break;
				case 4:
					let userProd = prompt("Введите название продукта");
					let flag = false;
					for (let user of set) {
						if (user == userProd) {
							alert("Продукт " + userProd + " есть");
							flag = true;
						}
					}
					if (!flag) {
						alert("Такого продукта нет");
					}
					break;
				default:
					alert("Выход");

					return false;
			}
		}
	}

	// Задание 5
	function checkTrashbox() {
		let map = new Map();
		let cost = 0;

		while (true) {
			switch (
				+prompt(
					"Введите номер операции(1 - добавление, 2 - удаление, 3 - изменить кол-во, 4 - посмотреть кол-во позиций, 5 - сумма заказа)"
				)
			) {
				case 1:
					let mainId = prompt("Введите ID");
					let num = prompt("Введите его кол-во");
					let tempCost = prompt("Введите цену");
					map.set(mainId, [num, tempCost]);
					cost += +tempCost;
					break;
				case 2:
					let delId = prompt("Введите ID");
					cost -= map.get(delId)[1];
					map.delete(delId);
					break;
				case 3:
					let id = prompt("Введи id");
					let temp = map.get(id)[1];
					map.delete(id);
					map.set(id, [prompt("Введите новое кол-во"), temp]);
					break;
				case 4:
					alert("Кол-во позиций в корзине: " + map.size);
					break;
				case 5:
					alert("Сумма заказа: " + cost);
					break;
				default:
					alert("Выход");
					return false;
			}
		}
	}

	while (true) {
		switch (+prompt("Введите номер задания")) {
			case 1:
				alert(checkComment());
				break;
			case 2:
				alert(getDay());
				break;
			// case 3:
			// 	makeButt();
			// 	break;
			case 4:
				checkProds();
				break;
			case 5:
				checkTrashbox();
				break;
			default:
				alert("Выход");
				makeButt();
				return false;
		}
	}
});
