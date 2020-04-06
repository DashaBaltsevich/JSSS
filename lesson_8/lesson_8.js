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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000000,
    period: 3,
    asking: function () {

        if(confirm('Есть ли у вас доп источник заработка?')) {
            let itemIncome;
            do {
                itemIncome = prompt ('Какой у вас дополнительный заработок?', 'Такси');
            }
            while(isNumber(itemIncome) || itemIncome === ' ' || itemIncome === null);
            let cashIncome;
            do {
                cashIncome = prompt ('Сколько в месяц вы на этом зарабатываете?', 50000);
            }
            while(!isNumber(cashIncome) || cashIncome === ' ' || cashIncome === null);
            appData.income[itemIncome] = cashIncome;
        }
            
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'машина, квартира, Cтудия');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let amount = 0, exp;
        for (let i = 0; i < 2; i++) {
            do {
                exp = prompt('Введите обязательную статью расходов.', 'Сад1');
            } while (isNumber(exp) || exp === ' ' || exp === null);
            
            do {
                amount = +prompt('Во сколько это обойдется?', 5000);
            } while (!isNumber(amount) || amount === ' ' || amount === null);
            appData.expenses[exp] = amount;
        }
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
    },

    getInfoDeposit: function () {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.percentDeposit) || appData.percentDeposit === ' ' || appData.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === ' ' || appData.moneyDeposit === null);

            
        }
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
console.log('Расходы за месяц: ' + appData.getExpensesMonth());
appData.getTargetMonth();
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные. ' + key + ':' + appData[key]);
}

appData.getInfoDeposit();

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());




//8 дз

let arr = appData.addExpenses;
let arr2 = [];

for(let i = 0; i <arr.length; i++) {
  let el = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
  arr2.push(el);
}
arr = arr2.join(', ');
console.log(arr);