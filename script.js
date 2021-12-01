/* Урок 5 */
/* Блок объявления переменных */
// Переменные asking()
let title;
let screens;
let screenPrice;
let adaptive;
// getAllServicePrice()
let service1;
let service2;
let allServicePrices;
// getFullPrice()
let fullPrice;
// getRollbackMessage())
let rollback = 20;
let servicePercentPrice;

/* Блок описания функций */

// Универсальная функция для проверки на число (Урок 5. Практика)
const isNumber = function (num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
};

// Запрос значений переменных с валидацией
const asking = () => {
	do {
		screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
	} while (!isNumber(screenPrice));

	const fastAsking = confirm("Вы хотите быстро заполнить переменные title, screens, adaptive ?"); // Для ускорения тестирования
	title = fastAsking ? "КалькуляторВёрстки" : prompt("Как называется ваш проект?", "КалькуляторВёрстки");
	screens = fastAsking ? "Простые, Сложные" : prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
	adaptive = fastAsking ? true : confirm("Нужен ли адаптив на сайте?");
};

// Расчет стоимости дополнительный услуг
const getAllServicePrice = () => {
	let sum = 0;
	let increment;
	const fastAsking = confirm("Вы хотите быстро заполнить переменные service1, service2 ?"); // Для ускорения тестирования
	for (let i = 0; i < 2; i++) {
		if (i === 0) {
			service1 = fastAsking ? "Разработка модального окна" : prompt("Какой дополнительный тип услуг нужен?", "Разработка модального окна");
		} else {
			service2 = fastAsking ? "Разработка корзины" : prompt("Какой ещё дополнительный тип услуг нужен?", "Разработка корзины");
		}
		do {
			increment = +prompt("Сколько это будет стоить?", "5000");
		} while (!isNumber(increment));
		sum += increment;
	}
	return sum;
};

// Расчет полной цены
function getFullPrice(screenPrice, allServicePrices) {
	return +screenPrice + +allServicePrices;
}

// Валидация названия проекта
const getTitle = (title) => {
	let str = title.trim();
	return str[0].toUpperCase() + str.toLowerCase().slice(1); // ещё можно через regexp
};

// Расчитываем цену за вычетом отката посреднику
const getServicePercentPrices = (fullPrice, rollback) => {
	return Math.ceil(fullPrice - (fullPrice * +rollback) / 100);
};

// Показываем тип переменных
const showTypeOf = (variable) => {
	console.log(variable + ", тип данных: " + typeof variable);
};

// Показываем скидку
const getRollbackMessage = (price) => {
	if (price > 30000) {
		return "Даем скидку в 10%";
	} else if (price > 15000 && price <= 30000) {
		return "Даем скидку в 5%";
	} else if (price > 0 && price <= 15000) {
		return "Скидка не предусмотрена";
	} else {
		return "Что-то пошло не так";
	}
};

/* Блок выполнения команд */
asking();
allServicePrices = getAllServicePrice();

console.log("~ screenPrice", screenPrice); // В этом коммите оставлю для упрощения тестирования
console.log("~ allServicePrices", allServicePrices);

fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом процента отката посреднику: ", servicePercentPrice);

/* Можно удалить:

const getAllServicePrice = function (price1, price2) {
return +price1 + +price2;
function expression

console.log(screens.length);
console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
console.log(
	"Процент отката посреднику за работу: " +
		(fullPrice * rollback) / 100 +
		" рублей"
); */
