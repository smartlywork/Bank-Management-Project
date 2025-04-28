/**
 * Display a success or error message
 * @param {string} containerId - ID of the container to display the message
 * @param {string} message - Message text to display
 * @param {boolean} isSuccess - Whether this is a success message (true) or error message (false)
 */
function showMessage(containerId, message, isSuccess) {
    const messageContainer = document.getElementById(containerId);
    if (messageContainer) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = isSuccess ? 'success-message' : 'error-message';
        messageElement.innerHTML = `
            <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            ${message}
        `;
        
        // Clear previous messages
        messageContainer.innerHTML = '';
        
        // Add new message
        messageContainer.appendChild(messageElement);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transition = 'opacity 0.5s ease';
            
            // Remove element after fade out
            setTimeout(() => {
                messageContainer.removeChild(messageElement);
            }, 500);
        }, 5000);
    }
}
