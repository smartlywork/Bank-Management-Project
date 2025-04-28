// Input field validation functions
document.addEventListener('DOMContentLoaded', function() {
    // Add validation for all forms
    setupInputValidation();
});

/**
 * Set up validation for form inputs
 */
function setupInputValidation() {
    // SSN validation (9 digits)
    const ssnInputs = document.querySelectorAll('input[id*="SSN"], input[id*="ssn"]');
    ssnInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '').substring(0, 9);
            validateField(this, this.value.length === 9, 'SSN must be 9 digits');
        });
    });
    
    // Name validation (letters, spaces, and some special characters)
    const nameInputs = document.querySelectorAll('input[id*="Name"], input[id*="name"]');
    nameInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this, /^[a-zA-Z\s'.,-]{2,50}$/.test(this.value), 'Name must be 2-50 characters and contain only letters, spaces, and common punctuation');
        });
    });
    
    // Account Number validation (alphanumeric)
    const accountInputs = document.querySelectorAll('input[id*="account"], input[id*="Account"]');
    accountInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this, /^[a-zA-Z0-9]{5,15}$/.test(this.value), 'Account number must be 5-15 alphanumeric characters');
        });
    });
    
    // Contact Number validation (10 digits)
    const contactInputs = document.querySelectorAll('input[id*="contact"], input[id*="Contact"]');
    contactInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '').substring(0, 10);
            validateField(this, this.value.length === 10, 'Contact number must be 10 digits');
        });
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value) || this.value === '', 'Please enter a valid email address');
        });
    });
    
    // Password validation (at least 8 characters with mix of letters, numbers)
    const passwordInputs = document.querySelectorAll('input[id*="password"], input[id*="Password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,30}$/.test(this.value), 'Password must be 8-30 characters with at least one letter and one number');
        });
    });
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const passwordInput = document.getElementById('password');
            validateField(this, this.value === passwordInput.value, 'Passwords must match');
        });
    }
    
    // Aadhaar Card validation (12 digits)
    const aadhaarInputs = document.querySelectorAll('input[id*="aadhaar"], input[id*="Aadhaar"]');
    aadhaarInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '').substring(0, 12);
            validateField(this, this.value.length === 12, 'Aadhaar number must be 12 digits');
        });
    });
    
    // PAN Card validation (10 alphanumeric characters)
    const panInputs = document.querySelectorAll('input[id*="pan"], input[id*="Pan"]');
    panInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            validateField(this, /^[A-Z0-9]{10}$/.test(this.value), 'PAN card number must be 10 alphanumeric characters');
        });
    });
}

/**
 * Validate a field and show error message if invalid
 * @param {HTMLElement} field - The input field to validate
 * @param {boolean} isValid - Whether the field is valid
 * @param {string} errorMessage - Error message to display if invalid
 */
function validateField(field, isValid, errorMessage) {
    // Add or remove is-invalid class
    if (isValid) {
        field.classList.remove('is-invalid');
        
        // Remove existing error message if any
        const existingError = field.parentElement.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    } else {
        field.classList.add('is-invalid');
        
        // Add error message if not already present
        let errorElement = field.parentElement.querySelector('.invalid-feedback');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    }
}
