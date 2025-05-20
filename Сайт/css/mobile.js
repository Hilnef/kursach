document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger');
    const navText = document.querySelector('.navo .text');
    const gridat = document.querySelector('.gridat');

    if (burgerButton && navText) {
        burgerButton.addEventListener('click', function() {
            navText.classList.toggle('active');
            this.classList.toggle('active');

            if (navText.classList.contains('active')) {
                gridat.style.transform = 'translateY(-11%)';
            } else {
                gridat.style.transform = 'translateY(0)';
            }
        });

        document.addEventListener('click', function(event) {
            if (!navText.contains(event.target) && !burgerButton.contains(event.target)) {
                navText.classList.remove('active');
                burgerButton.classList.remove('active');
                gridat.style.transform = 'translateY(0)';
            }
        });
        
        navText.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
}); 