let lang = 'en';

if (lang === 'ru') {
console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else if (lang === 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

switch (lang) {
    case 'ru' :
        console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
        break;
    case 'en' :
        console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;
    default: 
    console.log('not');
}



lang = prompt('Выберите язык', 'en');
let res = (lang === 'en') ? 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday':
    (lang === 'ru') ? 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье':
    'not';
console.log(res);


//2
let namePerson = prompt('Ваше имя?', 'Артем');
let result = (namePerson === 'Артем') ? 'директор' :
    (namePerson === 'Максим') ? 'преподаватель' :
    'студент';
console.log(result);

