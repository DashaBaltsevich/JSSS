'use strict';

let str = function (a) {
    if (typeof a === 'number') {
        console.log('не строка');
        a = a.trim();
    }

    if (a.length <= 30) {
        console.log(a);
    } else if (a.length > 30) {
        a = a.slice(0, 30) + '...';
        console.log(a);
    }
};

str('fffffffffffffаааfаа4аааааааааааааааааааааааааааааааааааа                                 ');