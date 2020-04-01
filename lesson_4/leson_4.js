'use strict';
let money = +prompt ('Ваш месячный доход?', 100000),
    income = 'верстка',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'машина'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    mission = 100000000,
    period = 1;

const showTypeOf = function (data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt ('Введите обязательную статью расходов?');
let amount1 = +prompt ('Во сколько это обойдется?', 20000);
let expenses2 = prompt ('Введите обязательную статью расходов?');
let amount2 = +prompt ('Во сколько это обойдется?', 30000);
console.log(expenses1, amount1);
console.log(expenses2, amount2);


//lesson_4

//1

const getExpensesMonth = function (spanding1, spanding2) {
    return spanding1 + spanding2;
};
getExpensesMonth(amount1, amount2);

//2,3

const getAccumulatedMonth = function () {
    return (money - amount1 - amount2);
};
const accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц ' + accumulatedMonth);

//4
const getTargetMonth = function () {
    return Math.ceil(mission / accumulatedMonth);
};
console.log('Цель будет достигнута за: ' + getAccumulatedMonth() + ' месяцев' );

//6

const budgetDay1 = function () {
    return Math.floor(accumulatedMonth / 30);
};
const budgetDay = budgetDay1();
console.log('Бюджет на день: ' + budgetDay);

//7
const getStatusIncome = function () {
    if (budgetDay > 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600) {
        return('Уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        return('Что-то пошло не так');
    }
};
console.log(getStatusIncome());





