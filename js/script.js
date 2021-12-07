/* Урок 7 */
/* Блок объявления переменных  */

// Выполнение функции appData.start() с её всплывающими окнами пока что блокирую
const title = document.getElementsByTagName("h1")[0];
const calcBtn = document.getElementsByClassName("handler_btn");
const plusBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items" && ".percent");
const otherItemsNumber = document.querySelectorAll(".other-items" && ".number");
const rollbackInput = document.querySelector(".rollback > .main-controls__range > [type=range]");
const rollbackSpan = document.querySelector(".rollback > .main-controls__range > .range-value");
const totalInputs = document.getElementsByClassName("total-input");
let screenVar = document.querySelectorAll(".screen");

console.log("");
console.log("~ title", title);
console.log("~ countBtn", calcBtn);
console.log("~ plusBtn", plusBtn);
console.log("~ otherItemsPercent", otherItemsPercent);
console.log("~ otherItemsNumber", otherItemsNumber);
console.log("~ rollbackInput", rollbackInput);
console.log("~ rollbackSpan", rollbackSpan);
console.log("");
console.log("~ Все инпуты с классом total-input:");
const arrayTotalInputs = Array.from(totalInputs);
arrayTotalInputs.forEach((item) => {
	console.log(item);
});
console.log("");
console.log("~ screenVar", screenVar);

const appData = {
	screens: [],
	screenPrice: 0,
	adaptive: true,
	services: {}, // getAllServicePrice()
	allServicePrices: 0,
	fullPrice: 0, // getFullPrice()
	servicePercentPrice: 0, // getRollbackMessage())
	rollback: 10,

	// Запрос значений переменных с валидацией
	asking: function () {
		do {
			appData.title = prompt("Как называется ваш проект?", "КалькуляторВёрстки");
		} while (appData.isNumber(appData.title));

		appData.adaptive = confirm("Нужен ли адаптив на сайте?");
	},

	addPrices: function () {
		// Стоимость работы
		do {
			appData.screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
		} while (!appData.isNumber(appData.screenPrice));

		// Типы экранов и их стоимость => в массив объектов
		for (let i = 0; i < 2; i++) {
			let name;

			do {
				name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
			} while (appData.isNumber(name));

			let price;
			do {
				price = prompt("Сколько это будет стоить?", "1000");
			} while (!appData.isNumber(price));
			appData.screens.push({ id: i, name: name, price: price });
		}

		// Общая сумма: Стоимость работы + Типы экранов (сумма из массива)
		appData.screenPrice = appData.screens.reduce((sum, curent) => {
			return sum + +curent.price;
		}, appData.screenPrice);

		// Дополнительные тип услуг
		for (let i = 0; i < 2; i++) {
			let price = 0;
			let name;

			do {
				name = prompt("Какой дополнительный тип услуг нужен?", "Разработка модального окна");
			} while (appData.isNumber(name));

			do {
				price = prompt("Сколько это будет стоить?", "5000");
			} while (!appData.isNumber(price));

			if (appData.services.hasOwnProperty([name])) {
				name = name + " " + parseInt(i + 1);
				appData.services[name] = +price;
			} else {
				appData.services[name] = +price;
			}
		}

		// Расчет стоимости дополнительный услуг
		for (let key in appData.services) {
			appData.allServicePrices += appData.services[key];
		}
	},

	// Универсальный метод для проверки на число (Урок 5. Практика)
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},

	// Расчет полной цены
	getFullPrice: (screenPrice, allServicePrices) => {
		appData.fullPrice = +screenPrice + +allServicePrices;
	},

	// Валидация названия проекта
	getTitle: (title) => {
		let str = title.trim();
		appData.title = str[0].toUpperCase() + str.toLowerCase().slice(1); // ещё можно через regexp
	},

	// Расчитываем цену за вычетом отката посреднику
	getServicePercentPrices: (fullPrice, rollback) => {
		appData.servicePercentPrice = Math.ceil(fullPrice - (fullPrice * +rollback) / 100);
	},

	// Показываем тип переменных
	showTypeOf: (variable) => {
		console.log(variable + ", тип данных: " + typeof variable);
	},

	// Расчтёт скидку
	getRollbackMessage: (price) => {
		if (price > 30000) {
			return "Даем скидку в 10%";
		} else if (price > 15000 && price <= 30000) {
			return "Даем скидку в 5%";
		} else if (price > 0 && price <= 15000) {
			return "Скидка не предусмотрена";
		} else {
			return "Что-то пошло не так";
		}
	},

	/* Блок выполнения команд */
	start: () => {
		appData.asking();
		appData.addPrices();
		appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
		appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
		appData.getTitle(appData.title);
		appData.logger();
	},

	/* Блок отображения логов */
	logger: () => {
		console.log(appData.getRollbackMessage(appData.fullPrice));
		console.log("Стоимость за вычетом процента отката посреднику: ", appData.servicePercentPrice);
		console.log("");

		console.log("Типы данных:");
		appData.showTypeOf(appData.title);
		appData.showTypeOf(appData.fullPrice);
		appData.showTypeOf(appData.adaptive);
		console.log("");

		console.log("Дополнительные логи:");
		console.log("~ screenPrice", appData.screenPrice);
		console.log("~ allServicePrices", appData.allServicePrices);
		console.log("~ appData.fullPrice", appData.fullPrice);
		console.log("~ appData.servicePercentPrice", appData.servicePercentPrice);
		console.log("~ appData.screens", appData.screens);
		console.log("~ appData.services", appData.services);
	},
};

// appData.start();
