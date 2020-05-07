const sendForm = (form) => {
    const errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    form.addEventListener('submit', (event) => {
        //чтобы страница не перезагружалась
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form);

        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });


        postData(body).then((response) => {
            console.log(response);
            statusMessage.textContent = successMessage;
            statusMessage.style.color = "#fff";
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 5000);
            if (response.status !== 200) {
                throw new Error ('status network not 200');
            }
        }).catch(error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
        });


    });

    const postData = (body) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    };

        const inputs = form.querySelectorAll('input');
        inputs.forEach((elem) => {
            elem.value = '';
        });
    


};

export default sendForm;