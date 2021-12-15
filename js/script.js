/* Урок 14 */
const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
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

const otherItemCMS = document.getElementById("cms-open");
const hiddenСmsVariants = document.querySelector(".hidden-cms-variants");
const mainControlsInput = hiddenСmsVariants.querySelector(".main-controls__input");
const selectCMS = hiddenСmsVariants.querySelector("div > select");

const appData = {
	screensApp: [], // Экраны
	screenPrice: 0, // Сумма стоимости всех экранов appData.screenPrice += +screen.price;
	screenNumber: 0, // Количество экранов

	servicesPercent: {}, //С вёрстки ДопПоцентные
	servicesNumber: {}, // С вёрстки ДопЧисленные
	servicePricesPercent: 0, // Сумма ДопПоцентные
	servicePricesNumber: 0, // Сумма ДопЧисленные
	serviceCMS: 0, // Процент за CMS
	fullPrice: 0, // Полная стоимость
	rollback: 0, // Откат

	/* Запускает функционал */
	init: function () {
		this.addTitle(); // добавляем название документа
		startBtn.addEventListener("click", () => this.start()); // Слушаем кнопку Рассчитать
		plusBtn.addEventListener("click", this.addScreenBlock.bind(this)); // Слушаем кнопку Добавить тип экрана
		resetBtn.addEventListener("click", () => this.reset());
		inputRange.addEventListener("input", () => this.rangeChange()); // Слушаем ползунок отката
		otherItemCMS.addEventListener("change", () => this.openСmsVariants());
		hiddenСmsVariants.querySelector("div > select").addEventListener("change", () => this.selectСmsVariants());
		mainControlsInput.querySelector("input").addEventListener("change", () => {
			this.serviceCMS = +mainControlsInput.querySelector("input").value;
		});
	},

	/* Запускаем расчет по кнопке */
	start: function () {
		screens = document.querySelectorAll(".screen");
		this.addScreens();

		if (
			!this.screensApp.find((screen) => {
				return screen.name === "Тип экранов" || screen.price <= 0;
			})
		) {
			this.addServises();
			this.addPrices();
			this.showResult();
			this.blockInputs();
			this.refreshVariables();
		} else {
			alert("Один из типов экрана или количество заполнено некорректно");
			this.reset();
			this.refreshVariables();
		}
	},

	/* Показываем название документа/вкладки */
	addTitle: () => {
		document.title = title.textContent;
	},

	/* Добавляем значение ползунка отката */
	rangeChange: function () {
		inputRangeValue.innerHTML = inputRange.value + "%";
		this.rollback = inputRange.value;
		if (this.fullPrice > 0) {
			this.start();
		}
	},

	/* Показываем варианты CMS */
	openСmsVariants: function () {
		if (otherItemCMS.checked) {
			hiddenСmsVariants.style.display = "flex";
		} else {
			hiddenСmsVariants.style.display = "none";
		}
	},

	/* В зависимости от варианта CMS определяем значение this.serviceCMS */
	selectСmsVariants: function () {
		if (selectCMS.value === "other") {
			mainControlsInput.style.display = "flex";
		} else if (selectCMS.value === "50") {
			mainControlsInput.style.display = "none";
			this.serviceCMS = 50;
		} else {
			mainControlsInput.style.display = "none";
			this.serviceCMS = NaN;
		}
	},

	/* Обновляем переменные чтобы значения не накладывались друг на друга */
	refreshVariables: function () {
		this.screensApp = [];
		this.screenPrice = 0;
		this.screenNumber = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
		this.serviceCMS = NaN;
	},

	/* Блокировка input-ов */
	blockInputs: function () {
		startBtn.style.display = "none";
		resetBtn.style.display = "block";
		plusBtn.setAttribute("disabled", "");

		otherItemCMS.setAttribute("disabled", "");
		hiddenСmsVariants.setAttribute("disabled", "");
		mainControlsInput.setAttribute("disabled", "");
		hiddenСmsVariants.querySelector("div > select").setAttribute("disabled", "");
		mainControlsInput.querySelector("input").setAttribute("disabled", "");

		screens.forEach((item) => {
			item.querySelector("input").setAttribute("disabled", "");
			item.querySelector("div > select").setAttribute("disabled", "");
		});

		otherItemsPercent.forEach((item) => {
			item.querySelector("div > input").setAttribute("disabled", "");
		});
		otherItemsNumber.forEach((item) => {
			item.querySelector("div > input").setAttribute("disabled", "");
		});
	},

	/* Обновление всех данных */
	reset: function () {
		startBtn.style.display = "block";
		resetBtn.style.display = "none";
		plusBtn.removeAttribute("disabled");
		this.refreshVariables();
		otherItemsPercent.forEach((item) => {
			item.querySelector("div > input").removeAttribute("disabled");
			item.querySelector("input[type=checkbox]").checked = false;
		});
		otherItemsNumber.forEach((item) => {
			item.querySelector("div > input").removeAttribute("disabled");
			item.querySelector("input[type=checkbox]").checked = false;
		});
		totalLayout.value = 0;
		totalScreens.value = 0;
		totalAddServices.value = 0;
		totalPrice.value = 0;
		totalPercentPrice.value = 0;

		screens = document.querySelectorAll(".screen");

		screens[0].querySelector("div > select").removeAttribute("disabled");
		screens[0].querySelector("div > input").removeAttribute("disabled");
		screens[0].querySelector("div > input").value = 0;
		const cloneScreen = screens[0].cloneNode(true);
		screens[0].replaceWith(cloneScreen);

		hiddenСmsVariants.style.display = "none";
		mainControlsInput.style.display = "none";
		otherItemCMS.checked = false;

		otherItemCMS.removeAttribute("disabled");
		hiddenСmsVariants.removeAttribute("disabled");
		mainControlsInput.removeAttribute("disabled");
		hiddenСmsVariants.querySelector("div > select").removeAttribute("disabled");
		mainControlsInput.querySelector("input").removeAttribute("disabled");

		screens.forEach((screen, index) => {
			if (index > 0) {
				screen.remove();
			}
			this.fullPrice = 0; // для rollback
		});
	},

	/* Добавлем в appData.screens[{}] значения блоков типа экрана  */
	addScreens: function () {
		screens.forEach((screen, index) => {
			const select = screen.querySelector("select");
			const selectName = select.options[select.selectedIndex].textContent;
			const input = screen.querySelector("input");
			this.screensApp.push({
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
		screens = document.querySelectorAll(".screen");
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

	/* Показываем все значения справа */
	showResult: function () {
		totalLayout.value = this.screenPrice;
		this.screensApp.forEach((screen) => {
			this.screenNumber += +screen.count;
		});
		totalScreens.value = this.screenNumber;
		totalAddServices.value = +this.servicePricesNumber + +this.servicePricesPercent;
		totalPrice.value = this.fullPrice;
		if (!isNaN(this.serviceCMS)) {
			totalAddServices.value =
				+this.servicePricesNumber +
				+this.servicePricesPercent +
				(+this.servicePricesNumber + +this.servicePricesPercent + +this.screenPrice) * +(+this.serviceCMS / 100);
		}
		totalPercentPrice.value = this.servicePercentPrice;
	},

	/* Рассчет:  appData.screenPrice += [+screen.price] (сумма всех экранов) и
	appData.fullPrice = screenPrice + servicePricesNumber + servicePricesPercent
  appData.servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback) / 100) */
	addPrices: function () {
		for (let screen of this.screensApp) {
			this.screenPrice += +screen.price;
		}
		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}
		for (let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}

		this.fullPrice = +this.screenPrice + +this.servicePricesNumber + +this.servicePricesPercent;
		if (!isNaN(this.serviceCMS)) {
			this.fullPrice = this.fullPrice * (1 + this.serviceCMS / 100);
		}
		this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * +this.rollback) / 100);
	},
};

appData.init();
