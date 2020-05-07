'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import team from './modules/team';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import valid from './modules/valid';




//Timer
countTimer('27 may 2020');

valid();

//меню
toggleMenu();

//popup
togglePopUp();

//табы
tabs();

//слайдер
slider();

//блок наша команда
team();

//калькулятор ввод только цифр
calc(100);

//send-ajax-form
const form1 = document.getElementById('form1'),
    form2 = document.getElementById('form2'),
    form3 = document.getElementById('form3');
sendForm(form1);
sendForm(form2);
sendForm(form3);