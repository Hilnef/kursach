const images = [
    '../Фото/Главная/новинки.jpeg',
    '../Фото/Главная/novin.jpg',
    '../Фото/Главная/nov.jpg'
];
const mobileImages = [
    '../Фото/Главная/mobl.jpg'
];
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

document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const galleryImage = document.getElementById('galleryImage');
    const galleryText = document.querySelector('#are2');
    console.log('Gallery Image:', galleryImage);
    console.log('Gallery Text:', galleryText);
    if (!galleryImage) {
        console.error('Элемент с id galleryImage не найден');
        return;
    }
    if (!galleryText) {
        console.error('Элемент с id are2 не найден');
        return;
    }
    galleryImage.style.opacity = '1';
    galleryImage.style.transition = 'opacity 1s ease-in-out';
    galleryText.style.opacity = '1';
    galleryText.style.transition = 'opacity 1s ease-in-out';
    function updateImage() {
        console.log('Updating image to index:', currentIndex);
        const newImage = new Image();
        newImage.src = images[currentIndex];
        newImage.onload = function() {
            console.log('New image loaded');
            galleryImage.style.opacity = '0';
            galleryText.style.opacity = '0';
            setTimeout(() => {
                console.log('Changing image and showing elements');
                galleryImage.src = newImage.src;
                galleryImage.style.opacity = '1';
                galleryText.style.opacity = '1';
            }, 1000);
        };
    }
    if (window.innerWidth > 768) { 
        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        }, 5000);
        updateImage();
    } else {
        galleryImage.src = mobileImages[currentIndex]; 
        console.log('Смена изображений отключена на мобильных устройствах.');
    }
});