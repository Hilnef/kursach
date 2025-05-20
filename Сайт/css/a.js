document.getElementById('burger').addEventListener('click', function() {
    const navo = document.querySelector('.navo');
    const main = document.querySelector('main');
    const burger = document.getElementById('burger');
    
    navo.classList.toggle('active');
    burger.classList.toggle('active');
    
    if (navo.classList.contains('active')) {
        main.style.marginTop = '200px';
        document.body.style.overflow = 'hidden';
    } else {
        main.style.marginTop = '';
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('.navo .text h2 a').forEach(link => {
    link.addEventListener('click', function() {
        const navo = document.querySelector('.navo');
        const burger = document.getElementById('burger');
        
        navo.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', function(event) {
    const navo = document.querySelector('.navo');
    const burger = document.getElementById('burger');
    const main = document.querySelector('main');
    
    if (!navo.contains(event.target) && !burger.contains(event.target) && navo.classList.contains('active')) {
        navo.classList.remove('active');
        burger.classList.remove('active');
        main.style.marginTop = '';
        document.body.style.overflow = '';
    }
});