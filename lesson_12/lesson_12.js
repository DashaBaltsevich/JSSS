'use strict';
let startBtn = document.getElementById('start'),
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
    period = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items'),
    input = document.querySelectorAll('input'),
    titlePeriod = document.querySelector('.period-amount');


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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncomePeriod();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getIncome();
        this.getBudget();

        let input = document.querySelectorAll('input');

        cancel.style.display = 'block';
        startBtn.style.display = 'none';
        input.forEach(function (item) {
            item.disabled = true;
        });
        
        period.disabled = false;

        this.showResult();
    },



    showResult: function () {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcPeriod();
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
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);       
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
                this.income[itemIncome] = +cashIncome;
                
            }
        }, this);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },

    getIncomePeriod: function() {
        let period = document.querySelector('.period-select');
        let titlePeriod = document.querySelector('.period-amount');
        let incomePeriodValue = document.querySelector('.income_period-value');
        incomePeriodValue.value = this.calcPeriod();
        titlePeriod.textContent = period.value;
    },

    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
        return +this.expensesMonth;
    },

    //доход за месяц
    getBudget: function () {
        this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
        return +this.budgetMonth;
    },

    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function () {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600) {
            return ('Уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что-то пошло не так');
        }
    },

    getInfoDeposit: function () {
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
    },

    calcPeriod: function () {
        return this.budgetMonth * period.value;
    },

    reset: function () {
        let input = document.querySelectorAll('input');
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
        
        cancel.style.display = 'none';
        startBtn.style.display = 'block';
        input.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });

        budgetMonth.value = '';
        budgetDay.value = '';
        expensesMonth.value = '';
        additionalExpenses.value = '';
        additionalIncome.value = '';
        targetMonth.value = '';
        incomePeriod.value = '';
        salaryAmount.value = '';
        period.value = 1;
        titlePeriod.textContent = '1';
        startBtn.disabled = true;

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
        
        }
    
    
};


startBtn.disabled = true;
salaryAmount.addEventListener('input', function() {
    startBtn.disabled = salaryAmount.value === '';
});



startBtn.addEventListener('click', appData.start.bind(appData));
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
period.addEventListener('input', appData.getIncomePeriod.bind(appData));
cancel.addEventListener('click', appData.reset);



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




let block = document.querySelectorAll('input[type = text]');
    block.forEach(function (e) {
        e.addEventListener('input', function (e){
            startBtn.disable = block.value !== '';
        });
        
    });

appData.getInfoDeposit();
appData.calcPeriod();



