// Navbar scroll behavior
const scrollContainer = document.querySelector('.scroll-container');
const navBtns = document.querySelectorAll('.nav-btn');

scrollContainer.addEventListener('scroll', () => {
    const scrollPos = scrollContainer.scrollTop;
    const windowHeight = window.innerHeight;
    const currentSection = Math.round(scrollPos / windowHeight);
    
    navBtns.forEach((btn, index) => {
        if (index === currentSection) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
});

navBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    });
});