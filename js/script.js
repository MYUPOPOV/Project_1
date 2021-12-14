/* Урок 14 */
/* Блок объявления переменных  */
const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

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
	init: () => {
		appData.addTitle(); // добавляем название документа
		startBtn.addEventListener("click", appData.start); // Слушаем кнопку Рассчитать
		plusBtn.addEventListener("click", appData.addScreenBlock); // Слушаем кнопку Добавить тип экрана
		inputRange.addEventListener("input", appData.rangeChange); // Слушаем ползунок отката
	},

	/* Показываем название документа/вкладки */
	addTitle: () => {
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
	rangeChange: () => {
		inputRangeValue.innerHTML = inputRange.value + "%";
		appData.rollback = inputRange.value;
		if (appData.fullPrice > 0) {
			appData.start();
		}
	},

	/* Обновляем переменные чтобы значения не накладывались друг на друга */
	refreshVariables: function () {
		this.screens = [];
		this.screenPrice = 0;
		this.screenNumber = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
	},

	/* Показываем все значения */
	showResult: function () {
		totalLayout.value = this.screenPrice;
		this.screens.forEach((screen) => {
			this.screenNumber += +screen.count;
		});
		totalScreens.value = this.screenNumber;
		totalAddServices.value = +this.servicePricesNumber + +this.servicePricesPercent;
		totalPrice.value = this.fullPrice;
		totalPercentPrice.value = this.servicePercentPrice;
	},

	/* Добавлем в appData.screens[{}] значения блоков типа экрана  */
	addScreens: () => {
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
	addScreenBlock: () => {
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},

	/* Добавляем в appData.servicesPercent значения ДопПоцентные  и 
               в appData.servicesNumber  значения ДопЧисленные  */
	addServises: () => {
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
	appData.fullPrice = screenPrice + servicePricesNumber + servicePricesPercent
  appData.servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback) / 100) */
	addPrices: function () {
		for (let screen of this.screens) {
			this.screenPrice += +screen.price;
		}
		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}
		for (let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}
		this.fullPrice = +this.screenPrice + +this.servicePricesNumber + +this.servicePricesPercent;
		this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * +this.rollback) / 100);
	},

	// Показываем тип переменных
	showTypeOf: (variable) => {
		console.log(variable + ", тип данных: " + typeof variable);
	},

	/* Блок отображения логов */
	logger: () => {
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
