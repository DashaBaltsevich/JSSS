'use strict';
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
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

class AppData {
    constructor () {
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
    }  
    check() {
        if (salaryAmount.value !== '') {
            start.disabled = false;
        }
    }
    start() {
        if (salaryAmount.value === '') {
            start.disabled = true;
            return;
        }
        const allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach((item) => {
            item.setAttribute('disabled', 'true');
        });

        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;
        this.getIncomePeriod();
        this.getExpInc();
        this.getAdd(additionalIncomeItem, this.addIncome);
        this.getAdd(additionalExpensesItem, this.addExpenses);
        this.getExpensesMonth();
        this.getBudget();
        this.showResult();
    }
    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcPeriod();
        periodSelect.addEventListener('change', (e) => {
            incomePeriod.value = this.calcPeriod();
        });
    }
    addBlock(item, button, selector) {
        const cloneItem = item[0].cloneNode(true);

        cloneItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        item[0].parentNode.insertBefore(cloneItem, button);
        item = document.querySelectorAll(`${selector}`);
        if (item.length === 3) {
            button.style.display = 'none';
        }
    }
    getIncome() {
        incomeItem.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            console.log(startStr);
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

        console.log(incomeItem);
        console.log(expensesItem);

        incomeItem.forEach(count);
        expensesItem.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAdd (items, addIt) {
        if(items === additionalExpensesItem) {
            items = additionalExpensesItem.value.split(',');
            console.log(0);
        }
        items.forEach((item) => {            
            if (item !== '' && items === additionalIncomeItem) {
                item = item.value.trim();
                this.addIncome.push(item);
            } else if(item !== '') {
                item = item.trim();
                this.addExpenses.push(item);
            }
        });
    }

    getIncomePeriod() {
        const period = document.querySelector('.period-select');
        const titlePeriod = document.querySelector('.period-amount');
        const incomePeriodValue = document.querySelector('.income_period-value');
        incomePeriodValue.value = this.calcPeriod();
        titlePeriod.textContent = period.value;
    }
    getExpensesMonth() {
        for(let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
        return +this.expensesMonth;
    }
    getBudget() {
        this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return +this.budgetMonth;
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600) {
            return ('Уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что-то пошло не так');
        }
    }
    getInfoDeposit() {
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
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    reset() {
        const inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');

        inputTextData.forEach((elem) => {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });

        resultInputAll.forEach((elem) => {
            elem.value = '';
        });

        let elements = document.querySelectorAll('.income-items');
        for (let i = 1; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
        btnPlusIncomeAdd.style.display = '';

        elements = document.querySelectorAll('.expenses-items');
        for (let i = 1; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
        btnPlusExpensesAdd.style.display = '';

        Object.assign(this, new this.constructor());

        start.disabled = true;

        cancel.style.display = 'none';
        start.style.display = 'block';
        checkbox.checked = false;
    }
    eventListener() {
        start.disabled = true;
        start.addEventListener('click', appData.start.bind(appData));
        btnPlusExpensesAdd.addEventListener('click', appData.addBlock.bind(this, expensesItem, btnPlusExpensesAdd, '.expenses-items'));
        btnPlusIncomeAdd.addEventListener('click', appData.addBlock.bind(this, incomeItem, btnPlusIncomeAdd, '.income-items'));

        salaryAmount.addEventListener('input', (e) => {
            start.disabled = salaryAmount.value === '';
        });
        cancel.addEventListener('click', appData.reset.bind(this));

        periodSelect.addEventListener('change', (e) => {
            periodAmount.innerHTML = periodSelect.value;
        });
    }
    regular() {
        const inputPlaceName = document.querySelectorAll('input[placeholder="Наименование"]');
        inputPlaceName.forEach((item) => {
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
        const inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
        inputSum.forEach((item) => {
            item.addEventListener('input', function () {
                let placeSum = item.value,
                    rep = /[-\.;":'a-zA-Zа-яА-Я]/;
                if (rep.test(placeSum)) {
                    placeSum = placeSum.replace(rep, '');
                    item.value = placeSum;
                }
            });
        });

        const addExpenses = [];
        for (let i = 0; i < addExpenses.length; i++) {
            let element = this.addExpenses[i].trim();
            element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
            addExpenses.push(element);
        }
    }
}

const appData = new AppData();

appData.regular();
appData.eventListener();
console.log(appData);