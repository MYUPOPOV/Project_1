/* Урок 4 */
/* Блок объявления переменных */
let title = prompt("Как называется ваш проект?", "Проект1");
let screens = prompt(
	"Какие типы экранов нужно разработать?",
	"Простые, Сложные, Интерактивные"
);
let screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
let rollback = 20;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt(
	"Какой дополнительный тип услуг нужен?",
	"Разработка модального окна"
);
let servicePrice1 = prompt("Сколько это будет стоить?", "5000");
let service2 = prompt(
	"Какой ещё дополнительный тип услуг нужен?",
	"Разработка корзины"
);
let servicePrice2 = prompt("Сколько это будет стоить?", "7000");
let allServicePrices;
let fullPrice;
let servicePercentPrice;

/* Блок описания функций */

const getAllServicePrice = function (price1, price2) {
	return +price1 + +price2;
}; // Тип - function expression (1)

function getFullPrice(screenPrice, allServicePrices) {
	return +screenPrice + +allServicePrices;
} // Тип - function declaration (2)

const getTitle = (title) => {
	let str = title.trim();
	return str[0].toUpperCase() + str.toLowerCase().slice(1); // Еще можно регулярками это сделать)
}; // Так как в (3) не указан требуемый тип, решил объявить ее через стрелочный тип

const getServicePercentPrices = (fullPrice, rollback) => {
	return Math.ceil(fullPrice - (fullPrice * +rollback) / 100);
};

const showTypeOf = (variable) => {
	console.log(variable + ", тип данных: " + typeof variable);
}; // По видео "Практика", но решил использовать стрелочную функцию

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
}; // По видео "Практика", но решил использовать стрелочную функцию

/* Блок выполнения команд */
allServicePrices = getAllServicePrice(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(
	"Стоимость за вычетом процента отката посреднику: ",
	servicePercentPrice
);

/* console.log(screens.length);
console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
console.log(
	"Процент отката посреднику за работу: " +
		(fullPrice * rollback) / 100 +
		" рублей"
); */
