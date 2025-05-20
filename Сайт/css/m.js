document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger');
    const navText = document.querySelector('.navo .text');
    const mainConr = document.querySelector('.main-conr'); 

    if (burgerButton && navText) {
        burgerButton.addEventListener('click', function() {
            navText.classList.toggle('active');
            this.classList.toggle('active');

            if (navText.classList.contains('active')) {
                mainConr.style.transform = 'translateY(0%)'; 
            } else {
                mainConr.style.transform = 'translateY(0)'; 
            }
        });

        document.addEventListener('click', function(event) {
            if (!navText.contains(event.target) && !burgerButton.contains(event.target)) {
                navText.classList.remove('active');
                burgerButton.classList.remove('active');
                mainConr.style.transform = 'translateY(0)'; 
            }
        });
        
        navText.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});