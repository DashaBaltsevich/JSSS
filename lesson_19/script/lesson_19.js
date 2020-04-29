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
            return {timeRemaining, hours, minutes, seconds};
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
            timer.minutes=oy(timer.minutes);
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

        function oy (num) {
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
            next = document.querySelector('a[href="#service-block"');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closebtn.addEventListener('click', handlerMenu);

        

        menuItems.forEach((elem) => elem.addEventListener('click', (event) => {
            //плавная прокрутка

            let anch = elem.querySelector('a');
            event.preventDefault();
            const block1 = anch.getAttribute('href').substr(1);

            document.getElementById(block1).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            handlerMenu();
        }));
        
        //плавный переход на другой слайд нажимая на кнопку

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
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');
    let count = 0;
    console.log(screen.width);

    
    // let animat = setInterval(function () {
    //     count = count + 0.1;
    //         if (count < 1) {
    //         popUp.style.display = 'block';
            
    //         popUp.style.opacity =+ 0.1;
    //         }
    // }, 10);

    

    function fadeIn(popUp) {
        popUp.style.opacity = 0;
                    let count = 0;
                    count =+ 0.01;
                    let time = setInterval(() => {
                        popUp.style.display = 'block';
                        popUp.style.opacity = +popUp.style.opacity + count;
                        // popUp.style.transition = 'opasity 1s easy-in-out';
                        if (popUp.style.opacity >= 1) {
                            clearInterval(time);
                        }
                    }, 10);
    }
        console.log(document.documentElement.clientWidth);



        popupBtn.forEach((elem) => {elem.addEventListener('click', function() {
            if (document.documentElement.clientWidth > 765){
            fadeIn(popUp);
            } else {
                popUp.style.display = 'block';
            }
        });});


        popupClose.addEventListener('click', () => {
            popUp.style.display = 'none';
        });

};

togglePopUp();


});