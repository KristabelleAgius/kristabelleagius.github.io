// Step 2: Initialize EmailJS
// This should be placed in your main JS file or right before the contact form script
(function () {
    // Initialize EmailJS with your user ID from environment variables or a config file
    // The actual ID should be loaded from your configuration, not hardcoded
    emailjs.init(EMAIL_USER_ID);
})();

// Step 3: Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Prepare template parameters
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'kristabelleagius@2@gmail.com' // Replace with your contact email
    };

    // Send email using EmailJS
    // Service ID and Template ID should be loaded from config
    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thanks for your message! I will get back to you soon.');
            document.getElementById('contactForm').reset();
        }, function (error) {
            console.log('FAILED...', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        })
        .finally(function () {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});