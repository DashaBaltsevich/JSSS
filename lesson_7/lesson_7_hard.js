'use strict';
let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];


let date = new Date();
    let day = date.getDay();
    let day1 = day - 1;


week.forEach ((day, index) => {
    let html = week[index];
    
    if (index === day1) {
        html = html.bold();
    } else if (day === 'Суббота' || day === 'Воскресенье') {
        html = html.italics(); 
    }
    let div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
});




