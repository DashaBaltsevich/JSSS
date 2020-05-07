const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closebtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul > li'),
        a = menu.querySelectorAll('a'),
        body = document.querySelector('body'),
        activeMenu = document.querySelector('active-menu'),
        next = document.querySelector('a[href="#service-block"');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    // btnMenu.addEventListener('click', (event) => {
    //     let target = event.target;
    //     target = target.closest('.menu');

    //     handlerMenu();
    // });


    // closebtn.addEventListener('click', handlerMenu);

    // menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));



    body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.closest('.menu')) {
            menu.style.transform = `translate(0)`;
        } else if (target !== menu) {
            menu.style.transform = `translate(-100%)`;
        }

        if (target === a) {
            menuItems.forEach((elem) => {
                let anch = elem.querySelector('a');
                event.preventDefault();
                const block1 = anch.getAttribute('href').substr(1);
                document.getElementById(block1).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }


    });

    next.addEventListener('click', (e) => {
        event.preventDefault();
        next.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

};

export default toggleMenu;