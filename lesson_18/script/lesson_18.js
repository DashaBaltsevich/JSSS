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


    countTimer('26 april 2020');








});