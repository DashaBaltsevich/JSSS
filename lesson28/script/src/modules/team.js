const team = () => {
    const images = document.querySelectorAll('.command__photo');
    images.forEach((elem) => elem.addEventListener('mouseover', (event) => {
        if (event.target.matches('.command__photo')) {
            const img2 = elem.getAttribute('data-img'),
                src = elem.getAttribute('src');
            elem.setAttribute('data-img', src);
            elem.setAttribute('src', img2);
        }
    }));

    images.forEach((elem) => elem.addEventListener('mouseout', (event) => {
        const img2 = elem.getAttribute('data-img'),
            src = elem.getAttribute('src');
        elem.setAttribute('src', img2);
        elem.setAttribute('data-img', src);
    }));

};

export default team;