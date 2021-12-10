/* Урок 12 */
/* Блок объявления переменных  */

// Выполнение функции appData.start() с её всплывающими окнами пока что блокирую
const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

// const percentTabletAdaptation = document.querySelectorAll(".other-items.percent")[0];
// const percentMobileAdaptation = document.querySelectorAll(".other-items.percent")[1];

// const numberYandexCounter = document.querySelectorAll(".other-items.number")[0];
// const numberGoogleCounter = document.querySelectorAll(".other-items.number")[1];
// const numberFormSend = document.querySelectorAll(".other-items.number")[2];
// const numberServerUpload = document.querySelectorAll(".other-items.number")[3];
// const numberTesting = document.querySelectorAll(".other-items.number")[4];

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback span");

const totalLayout = document.getElementsByClassName("total-input")[0];
const totalScreens = document.getElementsByClassName("total-input")[1];
const totalAddServices = document.getElementsByClassName("total-input")[2];
const totalPrice = document.getElementsByClassName("total-input")[3];
const totalPercentPrice = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
	screens: [], // Экраны
	screenPrice: 0, // Сумма стоимости всех экранов appData.screenPrice += +screen.price;
	screenNumber: 0, // Количество экранов

	servicesPercent: {}, //С вёрстки ДопПоцентные
	servicesNumber: {}, // С вёрстки ДопЧисленные
	servicePricesPercent: 0, // Сумма ДопПоцентные
	servicePricesNumber: 0, // Сумма ДопЧисленные

	rollback: 0,

	/* Запускает функционал */
	init: function () {
		appData.addTitle(); // добавляем название документа
		startBtn.addEventListener("click", appData.start); // Слушаем кнопку Раасчитать
		plusBtn.addEventListener("click", appData.addScreenBlock); // Слушаем кнопку Добавить тип экрана
		inputRange.addEventListener("change", appData.rangeChange);
	},

	/* Показываем название документа/вкладки */
	addTitle: function () {
		document.title = title.textContent;
	},

	/* Блок выполнения команд по кнопке Рассчитать (+ лог объекта) */
	start: () => {
		appData.addScreens();

		if (
			!appData.screens.find((screen) => {
				return screen.name === "Тип экранов" || screen.price <= 0;
			})
		) {
			appData.addServises();
			appData.addPrices();
			appData.showResult();
			console.log(appData);
			console.log("Типы экранов заполнены корректно");
			appData.refreshVariables();
		} else {
			alert("Один из типов экрана или количество заполнено некорректно");
			appData.refreshVariables();
		}
	},

	/* Добавляем значение ползунка отката */
	rangeChange: function () {
		inputRangeValue.innerHTML = inputRange.value + "%";
		appData.rollback = inputRange.value;
	},

	/* Обновляем переменные чтобы значения не накладывались друг на друга */
	refreshVariables: function () {
		appData.screens = [];
		appData.screenPrice = 0;
		appData.screenNumber = 0;
		appData.servicesPercent = {};
		appData.servicesNumber = {};
		appData.servicePricesPercent = 0;
		appData.servicePricesNumber = 0;
	},

	/* Показываем все значения */
	showResult: function () {
		totalLayout.value = appData.screenPrice;
		appData.screens.forEach((screen) => {
			appData.screenNumber += +screen.count;
		});
		totalScreens.value = appData.screenNumber;
		totalAddServices.value = +appData.servicePricesNumber + +appData.servicePricesPercent;
		totalPrice.value = appData.fullPrice;
		totalPercentPrice.value = appData.servicePercentPrice;
	},

	/* Добавлем в appData.screens[{}] значения блоков типа экрана  */
	addScreens: function () {
		screens = document.querySelectorAll(".screen");
		screens.forEach((screen, index) => {
			const select = screen.querySelector("select");
			const selectName = select.options[select.selectedIndex].textContent;
			const input = screen.querySelector("input");
			appData.screens.push({
				id: index,
				name: selectName,
				count: +input.value,
				price: +select.value * +input.value,
			});
		});
	},

	/*  Добавляем блок типа экрана */
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},

	/* Добавляем в appData.servicesPercent значения ДопПоцентные  и 
               в appData.servicesNumber  значения ДопЧисленные  */
	addServises: function () {
		otherItemsPercent.forEach((item) => {
			const check = item.querySelector("input[type=checkbox]");
			const label = item.querySelector("label");
			const input = item.querySelector("input[type=text]");
			if (check.checked) {
				appData.servicesPercent[label.textContent] = +input.value;
			}
		});
		otherItemsNumber.forEach((item) => {
			const check = item.querySelector("input[type=checkbox]");
			const label = item.querySelector("label");
			const input = item.querySelector("input[type=text]");
			if (check.checked) {
				appData.servicesNumber[label.textContent] = +input.value;
			}
		});
	},

	/* Рассчет:  appData.screenPrice += [+screen.price] (сумма всех экранов) и
	 */
	addPrices: function () {
		for (let screen of appData.screens) {
			appData.screenPrice += +screen.price;
		}
		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}
		for (let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}
		appData.fullPrice = +appData.screenPrice + +appData.servicePricesNumber + +appData.servicePricesPercent;
		appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * +appData.rollback) / 100);
	},

	// Расчитываем цену за вычетом отката посреднику
	getServicePercentPrices: (fullPrice, rollback) => {},

	// Показываем тип переменных
	showTypeOf: (variable) => {
		console.log(variable + ", тип данных: " + typeof variable);
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

appData.init();
