// Hover effects for service cards
// Section 2 JS for ai-annotation.html

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    const ctaLink = document.getElementById('ctaLink');

    // Card hover effects (already handled by CSS, but this is for additional JS functionality if needed)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Additional hover functionality can be added here
            console.log('Card hovered:', this.dataset.card);
        });

        card.addEventListener('mouseleave', function() {
            // Additional hover out functionality can be added here
        });
    });

    // CTA link hover effect (already handled by CSS, but this is for additional JS functionality if needed)
    ctaLink.addEventListener('mouseenter', function() {
        console.log('CTA link hovered');
    });

    ctaLink.addEventListener('mouseleave', function() {
        console.log('CTA link unhovered');
    });

    // Smooth scroll for CTA link
    ctaLink.addEventListener('click', function(e) {
        // e.preventDefault();
        // Add smooth scroll or modal functionality here
        console.log('CTA clicked - Add your contact form or navigation here');
    });
});
