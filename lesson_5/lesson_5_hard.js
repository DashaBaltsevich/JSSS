'use strict';

//1

let arr = ['55555', '22455', '45555', '555889', '5933225', '622154', '499852'];
arr.forEach((item) => {
    if (item.startsWith('4') || item.startsWith('2')) {
        console.log(item);
    }
});

//2


number:
    for (let i = 1; i <= 100; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                continue number;
            }
            console.log(i + ' Делители этого числа: 1 и ' + i);
        }
    }
 