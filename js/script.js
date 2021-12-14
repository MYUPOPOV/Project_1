/* Урок 14 */
/* Блок объявления переменных  */
"use strict";

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
	init: function () {
		this.addTitle(); // добавляем название документа
		startBtn.addEventListener("click", () => this.start()); // Слушаем кнопку Рассчитать
		plusBtn.addEventListener("click", this.addScreenBlock.bind(this)); // Слушаем кнопку Добавить тип экрана
		inputRange.addEventListener("input", () => this.rangeChange()); // Слушаем ползунок отката
	},

	start: function () {
		this.addScreens();

		if (
			!this.screens.find((screen) => {
				return screen.name === "Тип экранов" || screen.price <= 0;
			})
		) {
			this.addServises();
			this.addPrices();
			this.showResult();

			// console.log(appData);
			// console.log("Типы экранов заполнены корректно");
			this.refreshVariables();
		} else {
			alert("Один из типов экрана или количество заполнено некорректно");
			this.refreshVariables();
		}
	},

	/* Показываем название документа/вкладки */
	addTitle: () => {
		document.title = title.textContent;
	},
	/* Блок выполнения команд по кнопке Рассчитать (+ лог объекта) */

	/* Добавляем значение ползунка отката */
	rangeChange: function () {
		inputRangeValue.innerHTML = inputRange.value + "%";
		this.rollback = inputRange.value;
		if (this.fullPrice > 0) {
			this.start();
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
	addScreens: function () {
		screens = document.querySelectorAll(".screen");
		screens.forEach((screen, index) => {
			const select = screen.querySelector("select");
			const selectName = select.options[select.selectedIndex].textContent;
			const input = screen.querySelector("input");
			this.screens.push({
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
	addServises: function () {
		otherItemsPercent.forEach((item) => {
			const check = item.querySelector("input[type=checkbox]");
			const label = item.querySelector("label");
			const input = item.querySelector("input[type=text]");
			if (check.checked) {
				this.servicesPercent[label.textContent] = +input.value;
			}
		});
		otherItemsNumber.forEach((item) => {
			const check = item.querySelector("input[type=checkbox]");
			const label = item.querySelector("label");
			const input = item.querySelector("input[type=text]");
			if (check.checked) {
				this.servicesNumber[label.textContent] = +input.value;
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
	// logger: () => {
	// 	console.log("Стоимость за вычетом процента отката посреднику: ", appData.servicePercentPrice);
	// 	console.log("");
	// 	console.log("Типы данных:");
	// 	appData.showTypeOf(appData.title);
	// 	appData.showTypeOf(appData.fullPrice);
	// 	appData.showTypeOf(appData.adaptive);
	// 	console.log("");
	// 	console.log("Дополнительные логи:");
	// 	console.log("~ screenPrice", appData.screenPrice);
	// 	console.log("~ allServicePrices", appData.allServicePrices);
	// 	console.log("~ appData.fullPrice", appData.fullPrice);
	// 	console.log("~ appData.servicePercentPrice", appData.servicePercentPrice);
	// 	console.log("~ appData.screens", appData.screens);
	// 	console.log("~ appData.services", appData.services);
	// },
};

appData.init();
