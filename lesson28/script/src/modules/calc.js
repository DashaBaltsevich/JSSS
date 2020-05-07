const calc = (price = 100) => {
        

    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcDay = document.querySelector('.calc-day'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value;

        const squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue = dayValue * 3 / 2;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        }

        totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        // if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {

        // }

        // if (target === calcType || target === calcSquare || target === calcDay || target === calcCount)

        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });

};

export default calc;