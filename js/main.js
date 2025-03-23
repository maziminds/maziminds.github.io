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

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for lazy loading images
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Add lazy loading to images
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });

    // Add skeleton loading for game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        card.appendChild(skeleton);
    });

    // Remove skeleton loading when content is loaded
    window.addEventListener('load', () => {
        document.querySelectorAll('.skeleton').forEach(skeleton => {
            skeleton.remove();
        });
    });

    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.game-card, .service-card, .team-member');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check and scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Add game trailer modal functionality
    document.querySelectorAll('.game-trailer').forEach(trailer => {
        trailer.addEventListener('click', () => {
            const iframe = trailer.querySelector('iframe');
            const modal = document.createElement('div');
            modal.className = 'game-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    ${iframe.outerHTML}
                    <button class="close-modal">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);

            // Close modal functionality
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });

            // Close modal on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Add game filtering functionality
    const filterButtons = document.createElement('div');
    filterButtons.className = 'filter-buttons';
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Games</button>
        <button class="filter-btn" data-filter="mobile">Mobile</button>
        <button class="filter-btn" data-filter="pc">PC</button>
        <button class="filter-btn" data-filter="card">Card</button>
    `;
    document.querySelector('.portfolio').insertBefore(filterButtons, document.querySelector('.game-grid'));

    // Filter game cards
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            document.querySelectorAll('.game-card').forEach(card => {
                if (filter === 'all' || card.querySelector(`p:contains('${filter}')`)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add game rating functionality
    document.querySelectorAll('.game-card').forEach(card => {
        const rating = document.createElement('div');
        rating.className = 'game-rating';
        rating.innerHTML = `
            <span class="rating-stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </span>
            <span class="rating-count">4.5</span>
        `;
        card.insertBefore(rating, card.querySelector('.game-image'));
    });
});
