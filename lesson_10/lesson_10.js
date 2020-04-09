'use strict';
const book = document.querySelectorAll('.book'),
    book2 = document.querySelectorAll('.book')[0],
    book1 = document.querySelectorAll('.book')[1],
    book6 = document.querySelectorAll('.book')[2],
    book4 = document.querySelectorAll('.book')[3],
    book3 = document.querySelectorAll('.book')[4],
    book5 = document.querySelectorAll('.book')[5],
    body = document.querySelector('body'),
    adv = document.querySelector('.adv'),
    elem2 = book2.querySelectorAll('li'),
    elem5 = book5.querySelectorAll('li'),
    elem6 = book6.querySelectorAll('li'),
    ul6 = book6.querySelector('ul');

//1
book1.after(book2);
book2.after(book3);
book3.after(book4);
book4.after(book5);

//2
document.body.style.backgroundImage = 'url("./image/11.jpg")';

//3
adv.remove();

//4

elem2[2].before(elem2[3]);
elem2[4].before(elem2[8]);
elem2[8].before(elem2[6]);
elem2[10].before(elem2[2]);

//5

elem5[3].before(elem5[9]);
elem5[1].after(elem5[9]);
elem5[4].after(elem5[2]);
elem5[7].after(elem5[5]);

//6

ul6.insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');

//7-заголовок

const a = book3.querySelectorAll('a')[0];

a.textContent = 'Книга 3. this и Прототипы Объектов';
console.log(a);

