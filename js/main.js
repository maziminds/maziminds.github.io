// Smooth scrolling for navigation
const scrollIndicator = document.querySelector('.scroll-indicator');
const sections = document.querySelectorAll('section');

// Add scroll animation to elements
const animateOnScroll = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if(sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('animate');
        }
    });
};

// Hide scroll indicator when user scrolls
document.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// Initialize animations
window.addEventListener('load', () => {
    animateOnScroll();
});

// Update animations on scroll
window.addEventListener('scroll', () => {
    animateOnScroll();
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add hover effect to game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add click handler for download buttons
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (button.getAttribute('data-target') === '_blank') {
            window.open(button.href, '_blank');
        }
    });
});
