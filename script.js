let title = "Project_1";
let screen = "Простые, Сложные, Интерактивные";
let screenPrice = 1500;
let rollback = 35;
let fullPrice = 50500;
let adaptive = true;

console.log(title, fullPrice, adaptive);
console.log(screen.length);
console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
console.log(screen.toLowerCase().split(", "));
console.log(
	"Процент отката посреднику за работу: " +
		(fullPrice * rollback) / 100 +
		" рублей"
);
