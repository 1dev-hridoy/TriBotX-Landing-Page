       // Animation on scroll
       document.addEventListener('DOMContentLoaded', function() {
        // Animate elements when they come into view
        const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
            
            // Add delay if specified
            if (element.style.getPropertyValue('--delay')) {
                element.style.transitionDelay = element.style.getPropertyValue('--delay');
            }
        });
        
        // Typing effect for hero text
        const heroText = document.getElementById('hero-text');
        if (heroText) {
            const text = heroText.textContent;
            heroText.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    heroText.classList.remove('typing-effect');
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
        
        // FAQ toggles
        const faqToggles = document.querySelectorAll('.faq-toggle');
        
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('i');
                
                if (content.style.display === 'none' || !content.style.display) {
                    content.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.style.display = 'none';
                    icon.style.transform = 'rotate(0)';
                }
            });
        });
        
        // Mobile menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const closeMenuButton = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.querySelector('div').classList.add('active');
            }, 10);
        });
        
        const closeMenu = () => {
            mobileMenu.querySelector('div').classList.remove('active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        };
        
        closeMenuButton.addEventListener('click', closeMenu);
        
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

    // jQuery script for image preview
    $(document).ready(function() {
        // Open modal when clicking on an image with class 'preview-image'
        $('.preview-image').on('click', function() {
            const imgSrc = $(this).attr('src');
            $('#previewImage').attr('src', imgSrc);
            $('#imagePreviewModal').fadeIn();
        });

        // Close modal when clicking on the close button
        $('.close-preview').on('click', function() {
            $('#imagePreviewModal').fadeOut();
        });

        // Close modal when clicking outside the image
        $('#imagePreviewModal').on('click', function(e) {
            if (e.target === this) {
                $(this).fadeOut();
            }
        });

        // Close modal on ESC key press
        $(document).on('keydown', function(e) {
            if (e.key === "Escape") {
                $('#imagePreviewModal').fadeOut();
            }
        });
    });