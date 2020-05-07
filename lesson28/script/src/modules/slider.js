const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        ul = document.querySelector('.portfolio-dots'),
        btn = document.querySelectorAll('.portfolio-btn'),
        slider = document.querySelector('.portfolio-content');


    let currentSlide = 0;
    let interval;

    for (let i = 0; i < slide.length; i++) {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        if (currentSlide === i) {
            dot.classList.add('dot-active');
        }
        ul.appendChild(dot);
    }



    let dot = ul.querySelectorAll('.dot');




    const prevSlide = (elem, i, strClass) => {
        elem[i].classList.remove(strClass);
    };
    const nextSlide = (elem, i, strClass) => {
        elem[i].classList.add(strClass);
    };




    //             let cloneExpensesItem = expensesItem[0].cloneNode(true);
    // cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
    //     item.value = '';
    // });
    // expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    // expensesItem = document.querySelectorAll('.expenses-items');
    // if (expensesItem.length === 3) {
    //     btnPlusExpensesAdd.style.display = 'none';
    // }


    //слайдер автоматически листается
    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        //чтобы менялись точки
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = () => {
        interval = setInterval(autoPlaySlide, 1500);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        if (!target.matches('#arrow-left, #arrow-right, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((element, index) => {
                if (element === target) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlide();
        }
    });

    startSlide();
};

export default slider;