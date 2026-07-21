// DuoPrime Main JavaScript

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DuoPrime website loaded');
    initializeEventListeners();
    initializeFormValidation();
    updateActiveNavLink();
    lazyLoadImages();
});

// Initialize Event Listeners
function initializeEventListeners() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteFormSubmit);
    }

    // Smooth scroll for navigation links
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
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('[novalidate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.classList.add('was-validated');
        }, false);
    });
}

// Handle Contact Form Submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validate form using ValidationRules if available
    if (typeof ValidationRules !== 'undefined') {
        const validationRules = {
            name: 'name',
            email: 'email',
            phone: 'phone',
            service: 'required',
            message: 'message'
        };
        
        const errors = validateFormData(data, validationRules);
        if (Object.keys(errors).length > 0) {
            displayValidationErrors(errors, event.target);
            showAlert('Please fix the errors in the form.', 'danger');
            return;
        }
    }

    // Log form data (in production, this would send to a server)
    console.log('Contact Form Submitted:', data);
    
    // Show success message
    showAlert('Thank you for your message! We will get back to you shortly.', 'success');
    
    // Reset form
    event.target.classList.remove('was-validated');
    event.target.reset();
}

// Handle Quote Form Submission
function handleQuoteFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validate form using ValidationRules if available
    if (typeof ValidationRules !== 'undefined') {
        const validationRules = {
            name: 'name',
            email: 'email',
            phone: 'phone',
            description: 'message'
        };
        
        const errors = validateFormData(data, validationRules);
        if (Object.keys(errors).length > 0) {
            displayValidationErrors(errors, event.target);
            showAlert('Please fix the errors in the form.', 'danger');
            return;
        }
    }

    // Log quote data (in production, this would send to a server)
    console.log('Quote Form Submitted:', data);
    
    // Show success message
    showAlert('Quote request received! We will contact you within 24 hours.', 'success');
    
    // Reset form
    event.target.reset();
}

// Validate Form Data
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    
    if (!data.name || data.name.trim().length < 2) {
        return false;
    }
    
    if (!data.email || !emailRegex.test(data.email)) {
        return false;
    }
    
    if (!data.phone || !phoneRegex.test(data.phone)) {
        return false;
    }
    
    return true;
}

// Show Alert Message
function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            if (alert.textContent.includes(message)) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        });
    }, 5000);
}

// Submit Quote (Modal)
function submitQuote() {
    const form = document.getElementById('quoteForm');
    if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
        
        // Close modal after validation passes
        setTimeout(() => {
            if (!form.classList.contains('was-validated') || form.checkValidity()) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('quoteModal'));
                if (modal) {
                    modal.hide();
                }
            }
        }, 500);
    }
}

// Lazy Load Images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// Add Active Class to Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
}