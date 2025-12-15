// Configuration file for Santa Claus Chatbot - EXAMPLE
// Copy this file to config.public.js and replace with your EmailJS settings.
// OpenAI key is NOT stored in the browser; on Vercel, set OPENAI_API_KEY as an Environment Variable.

window.CONFIG = {
    // EmailJS Configuration (required for email notifications)
    // Sign up at: https://www.emailjs.com/
    EMAILJS_SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID_HERE',
    EMAILJS_TEMPLATE_ID: 'YOUR_EMAILJS_TEMPLATE_ID_HERE',
    EMAILJS_PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY_HERE',

    // Your email address where gift selections will be sent
    RECIPIENT_EMAIL: 'your-email@example.com'
};
