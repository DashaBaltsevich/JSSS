'use strict';
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    titlePeriod = document.querySelector('.period-amount');


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

};

AppData.prototype.check = function () {
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function () {

    if (salaryAmount.value === '') {
        start.setAttribute('disabled', 'true');
        return;
    }

    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function (item) {
        item.setAttribute('disabled', 'true');
    });

    btnPlusExpensesAdd.setAttribute('disabled', 'true');
    btnPlusIncomeAdd.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncomePeriod();
    this.getAddIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getIncome();
    this.getBudget();
    this.showResult();
};

AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcPeriod();
    periodSelect.addEventListener('change', function () {
        incomePeriod.value = _this.calcPeriod();
    });
};


AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItem[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
        item.value = '';
    });
    expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    expensesItem = document.querySelectorAll('.expenses-items');
    if (expensesItem.length === 3) {
        btnPlusExpensesAdd.style.display = 'none';
    }

};

AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItem.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function (item) {
        item.value = '';
    });
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
        btnPlusIncomeAdd.style.display = 'none';
    }
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItem.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getIncomePeriod = function () {
    let period = document.querySelector('.period-select');
    let titlePeriod = document.querySelector('.period-amount');
    let incomePeriodValue = document.querySelector('.income_period-value');
    incomePeriodValue.value = this.calcPeriod();
    titlePeriod.textContent = period.value;
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
    return +this.expensesMonth;
};

//доход за месяц
AppData.prototype.getBudget = function () {
    this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return +this.budgetMonth;
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600) {
        return ('Уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
        return ('Что-то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
        }
        while (!isNumber(this.percentDeposit) || this.percentDeposit === ' ' || this.percentDeposit === null);
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while (!isNumber(this.moneyDeposit) || this.moneyDeposit === ' ' || this.moneyDeposit === null);


    }
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text');

    inputTextData.forEach(function (elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });

    resultInputAll.forEach(function (elem) {
        elem.value = '';
    });

    expensesItem.forEach((element, i) => {
        if (i !== 0) {
            element.remove();
        }
    });
    btnPlusExpensesAdd.style.display = '';

    incomeItem.forEach((element, i) => {
        if (i !== 0) {
            element.remove();
        }
    });
    btnPlusExpensesAdd.style.display = '';

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    start.disabled = true;

    cancel.style.display = 'none';
    start.style.display = 'block';
    btnPlusExpensesAdd.removeAttribute('disabled');
    btnPlusIncomeAdd.removeAttribute('disabled');
    checkbox.checked = false;


};

const appData = new AppData();

AppData.prototype.eventListener = function () {
    start.disabled = true;
    start.addEventListener('click', appData.start.bind(appData));
    btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
    btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
    salaryAmount.addEventListener('input', function () {
        start.disabled = salaryAmount.value === '';
    });
    cancel.addEventListener('click', appData.reset.bind(appData));

    periodSelect.addEventListener('change', function () {
        periodAmount.innerHTML = periodSelect.value;
    });

};


AppData.prototype.regular = function () {
    // Регулярки для русских букв
    let inputPlaceName = document.querySelectorAll('input[placeholder="Наименование"]');
    inputPlaceName.forEach(function (item) {
        item.addEventListener('input', function () {
            let placeName = item.value,
                rep = /^[a-z0-9]+$/i;
            if (rep.test(placeName)) {
                placeName = placeName.replace(rep, '');
                item.value = placeName;
            }
        });
    });


    // Регулярки для цифр
    let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
    inputSum.forEach(function (item) {
        item.addEventListener('input', function () {
            let placeSum = item.value,
                rep = /[-\.;":'a-zA-Zа-яА-Я]/;
            if (rep.test(placeSum)) {
                placeSum = placeSum.replace(rep, '');
                item.value = placeSum;
            }
        });
    });

    let addExpenses = [];
    for (let i = 0; i < addExpenses.length; i++) {
        let element = this.addExpenses[i].trim();
        element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        addExpenses.push(element);
    }
};

appData.regular();
appData.eventListener();
console.log(appData);