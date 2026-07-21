// DOM Manipulation Utilities

/**
 * Utility object for DOM operations
 */
const DOM = {
    /**
     * Query selector wrapper
     */
    select: function(selector) {
        return document.querySelector(selector);
    },

    /**
     * Query selector all wrapper
     */
    selectAll: function(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Add class to element
     */
    addClass: function(element, className) {
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element
     */
    removeClass: function(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     */
    toggleClass: function(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Check if element has class
     */
    hasClass: function(element, className) {
        return element && element.classList.contains(className);
    },

    /**
     * Set text content
     */
    setText: function(element, text) {
        if (element) {
            element.textContent = text;
        }
    },

    /**
     * Set HTML content
     */
    setHTML: function(element, html) {
        if (element) {
            element.innerHTML = html;
        }
    },

    /**
     * Get text content
     */
    getText: function(element) {
        return element ? element.textContent : '';
    },

    /**
     * Get HTML content
     */
    getHTML: function(element) {
        return element ? element.innerHTML : '';
    },

    /**
     * Set attribute
     */
    setAttribute: function(element, attr, value) {
        if (element) {
            element.setAttribute(attr, value);
        }
    },

    /**
     * Get attribute
     */
    getAttribute: function(element, attr) {
        return element ? element.getAttribute(attr) : null;
    },

    /**
     * Remove attribute
     */
    removeAttribute: function(element, attr) {
        if (element) {
            element.removeAttribute(attr);
        }
    },

    /**
     * Set CSS styles
     */
    setStyle: function(element, styles) {
        if (element) {
            Object.assign(element.style, styles);
        }
    },

    /**
     * Show element
     */
    show: function(element) {
        if (element) {
            element.style.display = '';
        }
    },

    /**
     * Hide element
     */
    hide: function(element) {
        if (element) {
            element.style.display = 'none';
        }
    },

    /**
     * Check if element is visible
     */
    isVisible: function(element) {
        return element && element.style.display !== 'none';
    },

    /**
     * Add event listener
     */
    on: function(element, event, callback) {
        if (element) {
            element.addEventListener(event, callback);
        }
    },

    /**
     * Remove event listener
     */
    off: function(element, event, callback) {
        if (element) {
            element.removeEventListener(event, callback);
        }
    },

    /**
     * Trigger event
     */
    trigger: function(element, event) {
        if (element) {
            const customEvent = new Event(event, { bubbles: true, cancelable: true });
            element.dispatchEvent(customEvent);
        }
    },

    /**
     * Create element
     */
    create: function(tagName, options = {}) {
        const element = document.createElement(tagName);

        if (options.id) {
            element.id = options.id;
        }

        if (options.class) {
            element.className = options.class;
        }

        if (options.text) {
            element.textContent = options.text;
        }

        if (options.html) {
            element.innerHTML = options.html;
        }

        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (options.styles) {
            Object.assign(element.style, options.styles);
        }

        return element;
    },

    /**
     * Append element to parent
     */
    append: function(parent, child) {
        if (parent && child) {
            parent.appendChild(child);
        }
    },

    /**
     * Prepend element to parent
     */
    prepend: function(parent, child) {
        if (parent && child) {
            parent.insertBefore(child, parent.firstChild);
        }
    },

    /**
     * Remove element
     */
    remove: function(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },

    /**
     * Get parent element
     */
    getParent: function(element, selector) {
        if (!element) return null;
        return element.closest(selector);
    },

    /**
     * Get next sibling
     */
    getNext: function(element, selector) {
        if (!element) return null;
        let next = element.nextElementSibling;
        while (next) {
            if (!selector || next.matches(selector)) {
                return next;
            }
            next = next.nextElementSibling;
        }
        return null;
    },

    /**
     * Get previous sibling
     */
    getPrev: function(element, selector) {
        if (!element) return null;
        let prev = element.previousElementSibling;
        while (prev) {
            if (!selector || prev.matches(selector)) {
                return prev;
            }
            prev = prev.previousElementSibling;
        }
        return null;
    },

    /**
     * Check if element is in viewport
     */
    isInViewport: function(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Scroll element into view
     */
    scrollIntoView: function(element, smooth = true) {
        if (element) {
            element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
        }
    },

    /**
     * Get element position
     */
    getPosition: function(element) {
        if (!element) return { top: 0, left: 0 };
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
        };
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOM;
}