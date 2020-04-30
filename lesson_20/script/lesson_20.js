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
                    body = document.querySelector('body'),
                    activeMenu = document.querySelector('active-menu');

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
                    if(target.closest('.menu')) {
                        menu.style.transform = `translate(0)`;
                        console.log(target);
                    } else if (target !== menu) {
                        menu.style.transform = `translate(-100%)`;
                    }
                });

            };

                toggleMenu();


                //popup

                const togglePopUp = () => {
                    const popUp = document.querySelector('.popup'),
                        popupBtn = document.querySelectorAll('.popup-btn');
                    let count = 0;
                    console.log(screen.width);




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
                    console.log(document.documentElement.clientWidth);



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

                        console.log(target);
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


            });