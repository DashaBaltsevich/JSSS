'use strict';
let start = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDay = document.querySelector('.budget_day-value'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    additionalIncome = document.querySelector('.additional_income-value'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMonth = document.querySelector('.target_month-value'),

    budgetMonth = document.querySelector('.budget_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItem = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    period = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items');



const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let expenses1,
    expenses2;
    
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {

        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncomePeriod();
        appData.getAddIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getIncome();
        appData.getBudget();
        

        appData.showResult();


    },

    showResult: function () {
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        additionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncome.value = appData.addIncome.join(', ');
        targetMonth.value = Math.ceil(appData.getTargetMonth());
        incomePeriod.value = appData.calcPeriod();
    },

    

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
        expensesItem = document.querySelectorAll('.expenses-items');
        if (expensesItem.length === 3) {
            btnPlusExpensesAdd.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItem.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
           
},
    
    addIncomeBlock: function () {
        console.log(incomeItem.parentNode);
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            btnPlusIncomeAdd.style.display = 'none';
        }
    },

    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getIncomePeriod: function() {
        let period = document.querySelector('.period-select');
        let titlePeriod = document.querySelector('.period-amount');
        titlePeriod.innerHTML = period.value;
    },

    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    },

    getBudget: function () {
        appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth);
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },

    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(appData.percentDeposit) || appData.percentDeposit === ' ' || appData.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit === ' ' || appData.moneyDeposit === null);


        }
    },

    calcPeriod: function () {
        return appData.budgetMonth * period.value;
    }

    
};


start.disabled = true;
salaryAmount.addEventListener('input', function() {
    start.disabled = salaryAmount.value === '';
});



start.addEventListener('click', appData.start);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
period.addEventListener('input', appData.getIncomePeriod);



let nameNomination = document.querySelectorAll('input[placeholder = "Наименование"]');
        nameNomination.forEach(function (e) {
            e.addEventListener('input', function(e){
                e.target.value = e.target.value.replace(/([A-Z])|(\d)/gi, '');
            });
        });

let nameNom = document.querySelectorAll('input[placeholder = "название"]');
nameNom.forEach(function (e) {
    e.addEventListener('input', function(e){
        e.target.value = e.target.value.replace(/([A-Z])|(\d)/gi, '');
    });
});

let nameSum = document.querySelectorAll('input[placeholder = "Сумма"');
    nameSum.forEach(function (e) {
        e.addEventListener('input', function(e){
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        });
    });



appData.getInfoDeposit();
appData.calcPeriod();

