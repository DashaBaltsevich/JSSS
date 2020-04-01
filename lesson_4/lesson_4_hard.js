'use strict';

const str = function (a) {
    if (typeof a === 'string') {
        a = a.trim();

        if (a.length >= 30) {
            a = a.substr(0, 30) + '...';
            console.log(a);
        } else {
            console.log('не строка');
        }
    }
};

str("    ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg    ");
