document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {

            //получаем дату в милисекундах
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                //разница в милисекундах
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
            // для дней
            // day = Math.floor(timeRemaining / 60 / 60 / 24);

        }

        // function updateClock() {
        //     let timer = getTimeRemaining();

        //     timerHours.textContent = timer.hours;
        //     timerMinutes.textContent = timer.minutes;
        //     timerSeconds.textContent = timer.seconds;
        //     if (timer.timeRemaining > 0) {
        //         setTimeout(updateClock, 1000);
        //     }
        // }

        // updateClock();        
        function updateClock() {
            let timer = getTimeRemaining();
            timer.hours = oy(timer.hours);
            timer.minutes = oy(timer.minutes);
            timer.seconds = oy(timer.seconds);
            if (timer.timeRemaining > 0) {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
            } else {
                clearInterval(idInterval);
                timerHours.textContent = oy(0);
                timerMinutes.textContent = oy(0);
                timerSeconds.textContent = oy(0);
            }
        }
        let idInterval = setInterval(updateClock, 1000);
        updateClock();

        function oy(num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }
    }

    countTimer('27 april 2020');

    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closebtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li'),
            a = menu.querySelectorAll('a'),
            body = document.querySelector('body'),
            activeMenu = document.querySelector('active-menu'),
            next = document.querySelector('a[href="#service-block"');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        // btnMenu.addEventListener('click', (event) => {
        //     let target = event.target;
        //     target = target.closest('.menu');

        //     handlerMenu();
        // });


        // closebtn.addEventListener('click', handlerMenu);

        // menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));



        body.addEventListener('click', (event) => {
            const target = event.target;
            if (target.closest('.menu')) {
                menu.style.transform = `translate(0)`;
            } else if (target !== menu) {
                menu.style.transform = `translate(-100%)`;
            }

            if (target === a) {
                menuItems.forEach((elem) => {
                    let anch = elem.querySelector('a');
                    event.preventDefault();
                    const block1 = anch.getAttribute('href').substr(1);
                    document.getElementById(block1).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            }


        });

        next.addEventListener('click', (e) => {
            event.preventDefault();
            next.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

    };

    toggleMenu();


    //popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
        let count = 0;




        function fadeIn(popUp) {
            popUp.style.opacity = 0;
            let count = 0;
            count = +0.01;
            let time = setInterval(() => {
                popUp.style.display = 'block';
                popUp.style.opacity = +popUp.style.opacity + count;
                // popUp.style.transition = 'opasity 1s easy-in-out';
                if (popUp.style.opacity >= 1) {
                    clearInterval(time);
                }
            }, 10);
        }



        popupBtn.forEach((elem) => {
            elem.addEventListener('click', function () {
                if (document.documentElement.clientWidth > 765) {
                    fadeIn(popUp);
                } else {
                    popUp.style.display = 'block';
                }
            });
        });



        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }

        });

    };

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }


        });
    };

    tabs();



    //слайдер
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
    slider();


    //блок наша команда

    const team = () => {
        const images = document.querySelectorAll('.command__photo');
        images.forEach((elem) => elem.addEventListener('mouseover', (event) => {
            if (event.target.matches('.command__photo')) {
                const img2 = elem.getAttribute('data-img'),
                    src = elem.getAttribute('src');
                elem.setAttribute('data-img', src);
                elem.setAttribute('src', img2);
            }
        }));

        images.forEach((elem) => elem.addEventListener('mouseout', (event) => {
            const img2 = elem.getAttribute('data-img'),
                src = elem.getAttribute('src');
            elem.setAttribute('src', img2);
            elem.setAttribute('data-img', src);
        }));

    };

    team();



    //калькулятор ввод только цифр
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

    calc(100);

    const valid = () => {
        const calcItem = document.querySelectorAll('.calc-item'),
         phone = document.querySelectorAll('[name="user_phone"]'),
        text = document.querySelectorAll('[placeholder="Ваше имя"], [placeholder="Ваше сообщение"]'),
            mail = document.querySelectorAll('[name="user_email"]');

            //запрет кириллицы
            mail.forEach(function (e) {
                if (e !== calcItem[0]) {
                    e.addEventListener('input', function (e) {
                        e.target.value = e.target.value.replace(/[а-яА-ЯёЁ]/g, '');
                    });
                }

                // /[а-яА-ЯёЁ]/g
            }); 

        calcItem.forEach(function (e) {
            if (e !== calcItem[0]) {
                e.addEventListener('input', function (e) {
                    e.target.value = e.target.value.replace(/[^\d]/gi, '');
                });
            }
        });

        //ввод цифр и +

        phone.forEach(function (e) {
            if (e !== calcItem[0]) {
                e.addEventListener('input', function (e) {
                    e.target.value = e.target.value.replace(/[^\+\d]/gi, '');
                });
            }
        });

        //ввод кириллицы и пробелов
        text.forEach(function (e) {
            if (e !== calcItem[0]) {
                e.addEventListener('input', function (e) {
                    e.target.value = e.target.value.replace(/[^а-яё\s]$/i,'');
                });
            }
        });         

    };
    valid();

    //send-ajax-form

    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

    const sendForm = (form) => {
        const errorMessage = 'Что-то пошло не так',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        




        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        form.addEventListener('submit', (event) => {
            //чтобы страница не перезагружалась
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            statusMessage.style.color = "#fff";
            const formData = new FormData(form);


            let body = {};

            // for (let val of formData.entries()) {
            //     body[val[0]] = val[1];
            // }

            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body, () => {
                    statusMessage.textContent = successMessage;
                statusMessage.style.color = "#fff";
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 5000);
                    
            }, (error) => {
                statusMessage.textContent = errorMessage;
                errorMessage.style.color = "#fff";
                console.error(error);
            });


        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();

                } else {
                    errorData(request.status);

                }
            });


            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));

            const inputs = form.querySelectorAll('input');
            inputs.forEach((elem) => {
                elem.value = '';
            });
        };


    };
    sendForm(form1);
    sendForm(form2);
    sendForm(form3);

    


});