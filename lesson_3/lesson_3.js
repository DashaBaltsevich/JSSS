let money = +prompt ('Ваш месячный доход?', 100000),
    income = 'верстка',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'машина'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    mission = 100000000,
    period = 1;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase().split(', '));


let budgetDay = 5000;
console.log(budgetDay);

//lesson_3

//5
let expenses1 = prompt ('Введите обязательную статью расходов?');
let amount1 = +prompt ('Во сколько это обойдется?');
let expenses2 = prompt ('Введите обязательную статью расходов?');
let amount2 = +prompt ('Во сколько это обойдется?');
console.log(expenses1, amount1);
console.log(expenses2, amount2);

//6

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц ' + budgetMonth);

//7

console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + ' месяцев');

//8

console.log('Бюджет на день: ' + Math.floor(budgetDay = budgetMonth / 30));
console.log(typeof (budgetDay));

//9

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
    console.log('Уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так');
}





