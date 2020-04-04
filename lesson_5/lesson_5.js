'use strict';
//проверка на число

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'верстка',
    addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую', 'машина'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    mission = 100000000,
    period = 1;

//1

const start = function() {
    do {
        money = +prompt ('Ваш месячный доход?', 100000);
    }

    while (!isNumber(money));
};
start();
//

const showTypeOf = function (data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.toLowerCase().split(', '));


//2

let expenses1, expenses2;

const getExpensesMonth = function () {
    let amount = 0;
    for (let i = 0; i < 2; i++){

        if (i === 0) {
            expenses1 = prompt ('Введите обязательную статью расходов?');
        } else if (i === 1) {
            expenses2 = prompt ('Введите обязательную статью расходов?');
        }

        amount += +prompt('Во сколько это обойдется?');
    }
    console.log(amount);
    return amount;
};
const expensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesMonth);

//

const getAccumulatedMonth = function () {
    return (money - expensesMonth);
};
const accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц ' + accumulatedMonth);



//3

const getTargetMonth = function () {
    if ((mission / accumulatedMonth) < 0) {
        console.log('Цель не будет достигнута');
    } else {
        console.log('Цель будет достигнута за: ' + (mission / accumulatedMonth) + ' месяцев' );
    }
};
getTargetMonth(mission, accumulatedMonth);

//


const budgetDay1 = function () {
    return Math.floor(accumulatedMonth / 30);
};
const budgetDay = budgetDay1();
console.log('Бюджет на день: ' + budgetDay);


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




