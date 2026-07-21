/**
 * DOM Manipulation Utilities
 * Provides utility functions for common DOM operations
 */

const DOM = {
    /**
     * Select element(s)
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (default: document)
     * @returns {Element|NodeList|null}
     */
    select: function(selector, parent = document) {
        const result = parent.querySelectorAll(selector);
        return result.length === 1 ? result[0] : result.length > 0 ? result : null;
    },

    /**
     * Select single element
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (default: document)
     * @returns {Element|null}
     */
    selectOne: function(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Select all elements
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (default: document)
     * @returns {NodeList}
     */
    selectAll: function(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Add class to element(s)
     * @param {Element|NodeList} elements - Element(s) to modify
     * @param {string} className - Class name to add
     */
    addClass: function(elements, className) {
        const nodeList = elements instanceof NodeList ? elements : [elements];
        nodeList.forEach(el => el.classList.add(className));
    },

    /**
     * Remove class from element(s)
     * @param {Element|NodeList} elements - Element(s) to modify
     * @param {string} className - Class name to remove
     */
    removeClass: function(elements, className) {
        const nodeList = elements instanceof NodeList ? elements : [elements];
        nodeList.forEach(el => el.classList.remove(className));
    },

    /**
     * Toggle class on element(s)
     * @param {Element|NodeList} elements - Element(s) to modify
     * @param {string} className - Class name to toggle
     */
    toggleClass: function(elements, className) {
        const nodeList = elements instanceof NodeList ? elements : [elements];
        nodeList.forEach(el => el.classList.toggle(className));
    },

    /**
     * Set HTML content
     * @param {Element} element - Target element
     * @param {string} html - HTML content
     */
    setHTML: function(element, html) {
        element.innerHTML = html;
    },

    /**
     * Set text content
     * @param {Element} element - Target element
     * @param {string} text - Text content
     */
    setText: function(element, text) {
        element.textContent = text;
    },

    /**
     * Get element attribute
     * @param {Element} element - Target element
     * @param {string} attribute - Attribute name
     * @returns {string|null}
     */
    getAttribute: function(element, attribute) {
        return element.getAttribute(attribute);
    },

    /**
     * Set element attribute
     * @param {Element} element - Target element
     * @param {string} attribute - Attribute name
     * @param {string} value - Attribute value
     */
    setAttribute: function(element, attribute, value) {
        element.setAttribute(attribute, value);
    },

    /**
     * Remove element attribute
     * @param {Element} element - Target element
     * @param {string} attribute - Attribute name
     */
    removeAttribute: function(element, attribute) {
        element.removeAttribute(attribute);
    },

    /**
     * Add event listener
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} callback - Event handler
     */
    on: function(element, event, callback) {
        element.addEventListener(event, callback);
    },

    /**
     * Remove event listener
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} callback - Event handler
     */
    off: function(element, event, callback) {
        element.removeEventListener(event, callback);
    },

    /**
     * Show element
     * @param {Element|NodeList} elements - Element(s) to show
     */
    show: function(elements) {
        const nodeList = elements instanceof NodeList ? elements : [elements];
        nodeList.forEach(el => {
            el.style.display = '';
            el.classList.remove('hidden');
        });
    },

    /**
     * Hide element
     * @param {Element|NodeList} elements - Element(s) to hide
     */
    hide: function(elements) {
        const nodeList = elements instanceof NodeList ? elements : [elements];
        nodeList.forEach(el => {
            el.style.display = 'none';
            el.classList.add('hidden');
        });
    },

    /**
     * Check if element has class
     * @param {Element} element - Target element
     * @param {string} className - Class name
     * @returns {boolean}
     */
    hasClass: function(element, className) {
        return element.classList.contains(className);
    },

    /**
     * Get element dimensions
     * @param {Element} element - Target element
     * @returns {Object} - Object with width and height
     */
    getDimensions: function(element) {
        return {
            width: element.offsetWidth,
            height: element.offsetHeight,
            top: element.offsetTop,
            left: element.offsetLeft
        };
    },

    /**
     * Scroll to element
     * @param {Element} element - Target element
     * @param {boolean} smooth - Use smooth scroll
     */
    scrollTo: function(element, smooth = true) {
        element.scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
            block: 'start'
        });
    },

    /**
     * Create element
     * @param {string} tag - Tag name
     * @param {Object} attributes - Element attributes
     * @param {string} content - Element content
     * @returns {Element}
     */
    createElement: function(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        if (content) {
            element.textContent = content;
        }
        return element;
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOM;
}
