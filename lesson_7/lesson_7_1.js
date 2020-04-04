'use strict';
//проверка на число

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    expenses1,
    expenses2,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?', 100000);
        }

        while (!isNumber(money));
    };
start();


let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'машина');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let amount = 0, exp;
        for (let i = 0; i < 2; i++) {
            exp = prompt('Введите обязательную статью расходов.');
            do {
                amount = +prompt('Во сколько это обойдется?');
            } while (!isNumber(amount));
            appData.expenses[exp] = amount;
        }
        console.log(amount);
        return +amount;

    },

    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    },




    getBudget: function () {
        appData.budgetMonth = (appData.budget - appData.expensesMonth);
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },

    getTargetMonth: function () {
        if ((appData.mission / appData.getBudget()) < 0) {
            console.log('Цель не будет достигнута');
        } else {
            console.log('Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.getBudget()) + ' месяцев');
        }
    },

    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600) {
            return ('Уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            return ('Что-то пошло не так');
        }
    }
};

appData.asking();
console.log('Расходы за месяц: ' + appData.getExpensesMonth());
appData.getTargetMonth();
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные. ' + key + ':' + appData[key]);
}