window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const day = document.querySelector('.day'),
        today = document.querySelector('.today'),
        time = document.querySelector('.time'),
        newYear = document.querySelector('.newYear');

        let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        date = new Date(),
        dayW = date.getDay(),
        dayWeek, timeofDay,
        dayofWeek = dayW - 1,
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        en = date.toLocaleTimeString('en-US'),
        dateStop = new Date('31 december 2020').getTime(),
        dateNow = new Date().getTime();

        week.forEach ((day, i) => {
            if (i === dayofWeek) {
                dayofWeek = week[i];
            }
        });

        if (hours > 17 && hours < 23) {
            timeofDay = 'Доброго вечера';
        } else if (hours > 23 && hours >= 0 && hours < 6) {
            timeofDay = 'Доброй ночи';
        } else if (hours > 6 && hours < 12) {
            timeofDay = 'Доброе утро';
        } else if (hours > 12) {
            timeofDay = 'Добрый день';
        }

        function oy (num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }


        today.textContent = `Сегодня: ${dayofWeek}`;
        day.textContent = timeofDay;
        const newYearday = Math.floor((dateStop - dateNow) / 1000 / 60 / 60 / 24);
        console.log(newYearday);
        newYear.textContent = `До Нового года осталось ${newYearday} дней`;
        hours = oy(hours);
        minutes = oy(minutes);
        seconds = oy(seconds);
        time.textContent = `Текущее время: ${hours}:${minutes}:${seconds} PM`;
        

        
});