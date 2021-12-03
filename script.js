/* Урок 7 */
/* Блок объявления переменных  */

const appData = {
	title: "", // Переменные asking()
	screens: "",
	screenPrice: 0,
	adaptive: true,
	service1: 0, // getAllServicePrice()
	service2: 0,
	allServicePrices: 0,
	fullPrice: 0, // getFullPrice()
	servicePercentPrice: 0, // getRollbackMessage())
	rollback: 20,

	// Запрос значений переменных с валидацией
	asking: function () {
		do {
			appData.screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
		} while (!appData.isNumber(appData.screenPrice));
		// Для ускорения тестирования:
		const fastAsking = confirm("Вы хотите быстро заполнить переменные title, screens, adaptive ?");
		appData.title = fastAsking ? "КалькуляторВёрстки" : prompt("Как называется ваш проект?", "КалькуляторВёрстки");
		appData.screens = fastAsking ? "Простые, Сложные" : prompt("Какие типы экранов нужно разработать?", "Простые,      Сложные,    Интерактивные");
		appData.adaptive = fastAsking ? true : confirm("Нужен ли адаптив на сайте?");
	},

	// Универсальный метод для проверки на число (Урок 5. Практика)
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},

	// Расчет стоимости дополнительный услуг
	getAllServicePrice: () => {
		let sum = 0;
		let increment;
		const fastAsking = confirm("Вы хотите быстро заполнить переменные service1, service2 ?"); // Для ускорения тестирования
		for (let i = 0; i < 2; i++) {
			if (i === 0) {
				appData.service1 = fastAsking ? "Разработка модального окна" : prompt("Какой дополнительный тип услуг нужен?", "Разработка модального окна");
			} else {
				appData.service2 = fastAsking ? "Разработка корзины" : prompt("Какой ещё дополнительный тип услуг нужен?", "Разработка корзины");
			}
			do {
				increment = +prompt("Сколько это будет стоить?", "5000");
			} while (!appData.isNumber(increment));
			sum += increment;
		}
		return sum;
	},

	// Расчет полной цены
	getFullPrice: function (screenPrice, allServicePrices) {
		return +screenPrice + +allServicePrices;
	},

	// Валидация названия проекта
	getTitle: (title) => {
		let str = title.trim();
		return str[0].toUpperCase() + str.toLowerCase().slice(1); // ещё можно через regexp
	},

	// Расчитываем цену за вычетом отката посреднику
	getServicePercentPrices: (fullPrice, rollback) => {
		return Math.ceil(fullPrice - (fullPrice * +rollback) / 100);
	},

	// Показываем тип переменных
	showTypeOf: (variable) => {
		console.log(variable + ", тип данных: " + typeof variable);
	},

	// Показываем скидку
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

	/* Блок отображения логов */
	logger: () => {
		console.log(appData.screens.toLowerCase().split(", "));
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
	},

	/* Блок выполнения команд */
	start: () => {
		appData.asking();
		appData.allServicePrices = appData.getAllServicePrice();
		appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
		appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
		appData.title = appData.getTitle(appData.title);
		appData.logger();
	},
};

appData.start();
