document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.scroll-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    function scrollToSection(index) {
        const top = sections[index].offsetTop;
        scrollContainer.scrollTo({ top: top, behavior: 'smooth' });
    }

    function updateActiveButton() {
        const sectionIndex = Math.round(scrollContainer.scrollTop / window.innerHeight);
        navButtons.forEach(function(button, index) {
            button.classList.toggle('active', index === sectionIndex);
        });
    }

    navButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            scrollToSection(index);
        });
    });

    scrollContainer.addEventListener('scroll', updateActiveButton);
    updateActiveButton();
});
