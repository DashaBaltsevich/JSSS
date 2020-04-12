'use strict';
let button = document.querySelector('button');
button.addEventListener('click', function () {
    let classColor = document.querySelector('.class_color'),
    body = document.querySelector('body'),
        r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256)),
        color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        

        body.style.background = color;
        classColor.innerHTML = color;
});
