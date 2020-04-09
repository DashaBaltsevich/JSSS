// 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды' 
'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        monthOfYear = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября'],
        text1 = document.querySelector('.clock1'),
        text2 = document.querySelector('.clock2');

let clock1 = function() {
    let date = new Date(),
        day = date.getDay(),
        dayOfWeek,
        day1 = day - 1,
        dayOfMonth = date.getDate(),
        month1 = date.getMonth(),
        month = month1 + 1,
        monthOf,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        hour, min, sec;

function Hour() {
    hour = (hours >= 2 && hours <= 4 || hours >= 22 && hours <= 24) ? 'часа' :
    (hours >= 5 && hours <= 20 || hours === 0) ? 'часов' :
    (hours === 21 || hours === 1) ? 'час':
    'нет';
}
Hour();


function Min() {
    min = (minutes % 10 === 1) ? 'минута' :
    (minutes % 10 >= 5 && minutes % 10 <= 9 || minutes % 10 === 0) ? 'минут' :
    (minutes % 10 >= 2 && minutes % 10 <= 4) ? 'минуты':
    'нет';
}
Min();

function Sec() {
    sec = (seconds % 10 === 1) ? 'секунда' :
    (seconds % 10 >= 5 && seconds % 10 <= 9 || seconds % 10 === 0) ? 'секунд' :
    (seconds % 10 >= 2 && seconds % 10 <= 4) ? 'секунды':
    'нет';
}
Sec();

week.forEach ((day, i) => {
    if (i === day1) {
        dayOfWeek = week[i];
    }
});

monthOfYear.forEach ((month, i) => {
    if (i === month1) {
        monthOf = monthOfYear[i];
    }
});
    text1.textContent = `Сегодня ${dayOfWeek}, ${dayOfMonth} ${monthOf} ${year}, ${hours} ${hour} ${minutes} ${min} ${seconds} ${sec}`; 

};
setInterval(clock1, 1000);

//2

let clock2 = function () {
    let date = new Date(),
        dayOfMonth = date.getDate(),
        month1 = date.getMonth(),
        month = month1 + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

function oy (num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

let dayOfMonth1 = oy(dayOfMonth);
let month11 = oy(month);
let hours1 = oy(hours);
let minutes1 = oy(minutes);
let seconds1 = oy(seconds);
console.log(dayOfMonth1);

// '04.02.2020 - 21:05:33' 

text2.innerHTML = `${dayOfMonth1}.${month11}.${year} - ${hours1}:${minutes1}:${seconds1}`;

};
setInterval(clock2, 1000);