let title = "Project_1";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1500;
let rollback = 35;
let fullPrice = 50500;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));

console.log(
	"Процент отката посреднику за работу: " +
		(fullPrice * rollback) / 100 +
		" рублей"
);
