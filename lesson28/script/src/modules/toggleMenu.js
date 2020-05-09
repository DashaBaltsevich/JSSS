const toggleMenu = () => {
    let btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closebtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul > li'),
        a = menu.querySelectorAll('a'),
        body = document.querySelector('body'),
        activeMenu = document.querySelector('active-menu'),
        next = document.querySelector('a[href="#service-block"');
        console.log(a);

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };


    body.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu')){
            handlerMenu();
            
        } else if (target !== menu) {
            menu.classList.remove('active-menu');
            }

        a.forEach((e) => {
            if (target === e) {
                console.log('55');
                menuItems.forEach(() => {
                    event.preventDefault();
                    const block1 = e.getAttribute('href').substr(1);
                    document.getElementById(block1).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            } 

        })
        


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