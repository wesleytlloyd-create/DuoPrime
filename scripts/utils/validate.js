/**
 * Form Validation Utilities
 * Provides validation functions for various form fields
 */

const ValidationRules = {
    // Email validation
    email: function(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },

    // Phone validation (UK format)
    phone: function(value) {
        const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
        return phoneRegex.test(value) || /^[0-9+\-\s()]{10,}$/.test(value);
    },

    // Name validation (min 2 characters)
    name: function(value) {
        return value && value.trim().length >= 2;
    },

    // Message validation (min 10 characters)
    message: function(value) {
        return value && value.trim().length >= 10;
    },

    // Required field
    required: function(value) {
        return value && value.toString().trim().length > 0;
    },

    // URL validation
    url: function(value) {
        const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        return urlRegex.test(value);
    },

    // Postcode validation (UK format)
    postcode: function(value) {
        const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][ABD-HJLNPQRST-UZ]{2}$/i;
        return postcodeRegex.test(value);
    },

    // Number validation
    number: function(value) {
        return !isNaN(value) && value !== '';
    },

    // Min length validation
    minLength: function(value, length) {
        return value && value.toString().length >= length;
    },

    // Max length validation
    maxLength: function(value, length) {
        return value && value.toString().length <= length;
    }
};

/**
 * Validate individual field
 * @param {string} fieldName - Name of the field to validate
 * @param {*} value - Value to validate
 * @param {string} rule - Validation rule to apply
 * @returns {boolean} - True if valid, false otherwise
 */
function validateField(fieldName, value, rule) {
    if (ValidationRules[rule]) {
        return ValidationRules[rule](value);
    }
    console.warn(`Validation rule '${rule}' not found`);
    return true;
}

/**
 * Validate entire form
 * @param {Object} formData - Object containing form field data
 * @param {Object} validationRules - Object with field names and their validation rules
 * @returns {Object} - Object with errors if any
 */
function validateFormData(formData, validationRules) {
    const errors = {};

    for (const [fieldName, rules] of Object.entries(validationRules)) {
        const value = formData[fieldName];
        const fieldRules = Array.isArray(rules) ? rules : [rules];

        for (const rule of fieldRules) {
            if (!validateField(fieldName, value, rule)) {
                errors[fieldName] = `${fieldName} is invalid`;
                break;
            }
        }
    }

    return errors;
}

/**
 * Display validation errors
 * @param {Object} errors - Object with field names and error messages
 * @param {HTMLElement} form - Form element
 */
function displayValidationErrors(errors, form) {
    // Clear previous errors
    form.querySelectorAll('.invalid-feedback').forEach(el => {
        el.style.display = 'none';
    });
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });

    // Display new errors
    for (const [fieldName, errorMessage] of Object.entries(errors)) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('is-invalid');
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = errorMessage;
                feedback.style.display = 'block';
            }
        }
    }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ValidationRules,
        validateField,
        validateFormData,
        displayValidationErrors
    };
}
