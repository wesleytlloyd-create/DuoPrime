// Form Validation Utilities
const ValidationRules = {
    /**
     * Validate a text field (name, etc.)
     */
    validateName: function(value) {
        if (!value || value.trim().length < 2) {
            return { valid: false, message: 'Please enter a valid name (minimum 2 characters).' };
        }
        return { valid: true };
    },

    /**
     * Validate email format
     */
    validateEmail: function(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            return { valid: false, message: 'Please enter a valid email address.' };
        }
        return { valid: true };
    },

    /**
     * Validate phone number
     */
    validatePhone: function(value) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!value || !phoneRegex.test(value)) {
            return { valid: false, message: 'Please enter a valid phone number (minimum 10 digits).' };
        }
        return { valid: true };
    },

    /**
     * Validate required field
     */
    validateRequired: function(value, fieldName = 'This field') {
        if (!value || value.trim() === '') {
            return { valid: false, message: `${fieldName} is required.` };
        }
        return { valid: true };
    },

    /**
     * Validate message field
     */
    validateMessage: function(value) {
        if (!value || value.trim().length < 10) {
            return { valid: false, message: 'Please enter a message (minimum 10 characters).' };
        }
        return { valid: true };
    },

    /**
     * Validate a field based on rules
     */
    validateField: function(value, rule, fieldName = 'Field') {
        switch (rule) {
            case 'name':
                return this.validateName(value);
            case 'email':
                return this.validateEmail(value);
            case 'phone':
                return this.validatePhone(value);
            case 'required':
                return this.validateRequired(value, fieldName);
            case 'message':
                return this.validateMessage(value);
            default:
                return { valid: true };
        }
    }
};

/**
 * Validate form data against rules
 */
function validateFormData(data, rules) {
    const errors = {};

    for (const field in rules) {
        if (rules.hasOwnProperty(field)) {
            const value = data[field] || '';
            const rule = rules[field];
            const result = ValidationRules.validateField(value, rule, field);

            if (!result.valid) {
                errors[field] = result.message;
            }
        }
    }

    return errors;
}

/**
 * Display validation errors in form
 */
function displayValidationErrors(errors, form) {
    // Clear previous errors
    form.querySelectorAll('.invalid-feedback').forEach(el => {
        el.style.display = 'none';
    });

    for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                input.classList.add('is-invalid');
                const feedbackEl = input.nextElementSibling;
                if (feedbackEl && feedbackEl.classList.contains('invalid-feedback')) {
                    feedbackEl.textContent = errors[field];
                    feedbackEl.style.display = 'block';
                }
            }
        }
    }
}

/**
 * Clear validation errors from form
 */
function clearValidationErrors(form) {
    form.querySelectorAll('.form-control, .form-select').forEach(el => {
        el.classList.remove('is-invalid');
    });

    form.querySelectorAll('.invalid-feedback').forEach(el => {
        el.style.display = 'none';
    });
}