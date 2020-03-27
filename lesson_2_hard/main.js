let num = 266219;
num = num + '';
let arr = num.split('');
let len = arr.length;
let answ = 1;

for (let i = 0; i < len; i++) {
    answ *= arr[i];
}

console.log(answ);

let result = (answ ** 3).toString().slice(0, 2);

console.log(result);

//11111


