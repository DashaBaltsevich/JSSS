document.addEventListener("DOMContentLoaded", function(){
'use strict';
// document.body.insertAdjacentHTML('afterbegin', '<div>Hi</div>');
// let div = document.querySelector('div');
    
let newEl;
function DomElement (height, width, background, fontSize, selector) {
    this.height = height;
    this.width = width;
    this.background = background;
    this.fontSize = fontSize;
    this.selector = selector;
}

DomElement.prototype.dom2 = function () {
    


        if (this.selector.substr(0, 1) === '.') {
            newEl = document.createElement('div');
        newEl.classList.add(this.selector.substr(1));
        } else if (this.selector.substr(0, 1) === '#') {
            newEl = document.createElement('p');
           newEl.setAttribute('id', this.selector.substr(1));
        }
    newEl.textContent = '';
    document.body.append(newEl);
    newEl.style.cssText = `height : ${this.height}px; width: ${this.width}px; 
    background: ${this.background}; font-size: ${this.fontSize}px;`;


    addEventListener('keydown', function (event) {
    let cs = window.getComputedStyle(newEl),
        left = parseInt(cs.marginLeft),
        top = parseInt(cs.marginTop);
    if (event.code === 'ArrowUp' && top > 0){
        //вверх
        newEl.style.marginTop = top - 10 + "px";
    } else if (event.code === 'ArrowDown' && top < document.documentElement.clientHeight - 100){ 
        //вниз 
        newEl.style.marginTop = top + 10 + "px";
    } else if (event.code === 'ArrowLeft' && left > 0){
        //влево
        newEl.style.marginLeft = left - 10  + "px";
    } else if (event.code === 'ArrowRight' && left < document.documentElement.clientWidth - 100){
        //вправо
        newEl.style.marginLeft = left + 10 + "px";

    }
  });
    
};

let dom = new DomElement(100, 100, 'red', 50, '.container');
dom.dom2();















});





// dom2.div.style.cssText = 'height : 100px; width: 100px; background: red; background-position: absolute;';




