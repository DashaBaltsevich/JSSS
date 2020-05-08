'use strict';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const input = document.querySelector('input'),
        button = document.querySelector('button'),
        select = document.querySelector('select'),
        output = document.getElementById('output'),
        first = document.getElementById('1'),
        second = document.getElementById('2');
    let language = 'en-ru';

    select.addEventListener('change', () => {
        console.log(select.options[select.selectedIndex].value);
        if (select.options[select.selectedIndex].value === 'en'){
        language = 'en-ru';
        input.value = '';
        output.textContent = '';
        }
        
        if (select.options[select.selectedIndex].value === 'ru'){
        language = 'ru-en';
        input.value = '';
        output.textContent = '';
        }       

    });


    button.addEventListener('click', () => {

        fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?' +
                'lang=' + language +
                '&key=trnsl.1.1.20200506T151532Z.8dee65b5b3ec1b87.9d8850f1ae917a7a944f7574b52fd3490f556d08' +
                '&text=' + input.value, {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                return (response.json());
            })
            .then((data) => {
                output.textContent = data.text.toString();
            })
            .catch((error) => console.log(error));
    });

});