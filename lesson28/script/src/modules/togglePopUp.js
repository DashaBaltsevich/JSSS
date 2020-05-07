const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');
    let count = 0;




    function fadeIn(popUp) {
        popUp.style.opacity = 0;
        let count = 0;
        count = +0.01;
        let time = setInterval(() => {
            popUp.style.display = 'block';
            popUp.style.opacity = +popUp.style.opacity + count;
            // popUp.style.transition = 'opasity 1s easy-in-out';
            if (popUp.style.opacity >= 1) {
                clearInterval(time);
            }
        }, 10);
    }



    popupBtn.forEach((elem) => {
        elem.addEventListener('click', function () {
            if (document.documentElement.clientWidth > 765) {
                fadeIn(popUp);
            } else {
                popUp.style.display = 'block';
            }
        });
    });



    popUp.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popUp.style.display = 'none';
            }
        }

    });

};

export default togglePopUp;