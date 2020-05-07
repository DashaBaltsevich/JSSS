const valid = () => {
    const calcItem = document.querySelectorAll('.calc-item');
    const phone = document.querySelectorAll('[name="user_phone"]');
    const text = document.querySelectorAll('[placeholder="Ваше имя"], [placeholder="Ваше сообщение"]'),
    mail = document.querySelectorAll('[name="user_email"]');

    //запрет кириллицы
    mail.forEach(function (e) {
        if (e !== calcItem[0]) {
            e.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[а-яА-ЯёЁ]/g, '');
            });
        }

        // /[а-яА-ЯёЁ]/g
    }); 
    calcItem.forEach(function (e) {
        if (e !== calcItem[0]) {
            e.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^\d]/gi, '');
            });
        }
    });

    //ввод цифр и +

    phone.forEach(function (e) {
        if (e !== calcItem[0]) {
            e.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^\+\d]/gi, '');
            });
        }
    });

    //ввод кириллицы и пробелов
    text.forEach(function (e) {
        if (e !== calcItem[0]) {
            e.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^а-яё\s]$/i,'');
            });
        }
    });         

};

export default valid;