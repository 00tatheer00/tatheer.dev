# EmailJS Setup Guide

To enable the contact form, you need to configure EmailJS with your credentials.

## Steps

1. **Create an EmailJS account** at [https://www.emailjs.com/](https://www.emailjs.com/)

2. **Add an Email Service** (e.g., Gmail, Outlook) in the EmailJS dashboard

3. **Create an Email Template** with these variables:
   - `{{from_name}}` – sender's name
   - `{{from_email}}` – sender's email
   - `{{subject}}` – email subject
   - `{{message}}` – message body

4. **Get your credentials** from the EmailJS dashboard:
   - **Public Key** (Account → API Keys)
   - **Service ID** (Email Services)
   - **Template ID** (Email Templates)

5. **Update `assets/js/script.js`** – replace the placeholders:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");   // Line ~95

var serviceID = "YOUR_SERVICE_ID";   // Line ~102
var templateID = "YOUR_TEMPLATE_ID"; // Line ~103
```

## Example

```javascript
emailjs.init("abc123xyz");

var serviceID = "service_contact";
var templateID = "template_portfolio";
```
