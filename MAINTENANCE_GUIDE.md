# Claim Form Maintenance Guide

This guide provides step-by-step instructions for common maintenance tasks related to the Ascent Administration Claim Form system.

## Table of Contents

1. [Testing the Form](#1-testing-the-form)
2. [Updating EmailJS Configuration](#2-updating-emailjs-configuration)
3. [Modifying Form Fields](#3-modifying-form-fields)
4. [Customizing the PDF Output](#4-customizing-the-pdf-output)
5. [Troubleshooting Common Issues](#5-troubleshooting-common-issues)

## 1. Testing the Form

To test the form functionality:

### 1.1. Basic Form Testing

1. Open `index_with_pdf.html` in a web browser
2. Fill out the required fields in each section
3. Navigate through all sections using the navigation buttons
4. Verify that the progress bar updates correctly
5. Check that validation works for required fields

### 1.2. Testing PDF Generation

1. Fill out the form with test data
2. Click the "Preview Email" button
3. Verify that the PDF displays correctly in the preview modal
4. Check that all form data appears in the PDF
5. Verify that the PDF formatting is correct

### 1.3. Testing Email Functionality

1. Fill out the form with test data
2. Set your own email address in the "Email Recipient" field
3. Click "Submit" or "Preview Email" followed by "Send Email"
4. Confirm the submission in the confirmation modal
5. Check your email to verify receipt of the PDF attachment

## 2. Updating EmailJS Configuration

### 2.1. Creating a New EmailJS Template

1. Log in to [EmailJS](https://www.emailjs.com/)
2. Navigate to "Email Templates"
3. Click "Create New Template"
4. Design your template with the following variables:
   - `{{to_email}}` - Recipient email
   - `{{subject}}` - Email subject
   - `{{name}}` - Sender name
   - `{{claim-number}}` - Claim number
   - `{{contract-first-name}}` - Contract holder first name
   - `{{contract-last-name}}` - Contract holder last name
   - `{{submission-date}}` - Submission date
5. Save the template and note the template ID

### 2.2. Updating the Code

1. Open `js/pdf_script.js` in a code editor
2. Locate the EmailJS initialization (around line 62):
   ```javascript
   emailjs.init("OaFKQWwpLV-a4LIKF");
   ```
3. Replace the public key with your new public key if needed
4. Locate the email sending code (around line 687):
   ```javascript
   emailjs.send('service_cpqhxg7', 'template_4a1rmi3', emailParams)
   ```
5. Replace the service ID and template ID with your new values
6. Save the file and test the form

## 3. Modifying Form Fields

### 3.1. Adding a New Field

1. Open `index_with_pdf.html` in a code editor
2. Locate the appropriate section for your new field
3. Add the HTML for the new field, following the existing pattern:
   ```html
   <div class="form-group">
       <label for="new-field-id">New Field Label</label>
       <input type="text" id="new-field-id" name="new-field-id">
   </div>
   ```
4. If the field is required, add the `required` attribute and the `required` class to the parent div:
   ```html
   <div class="form-group required">
       <label for="new-field-id">New Field Label</label>
       <input type="text" id="new-field-id" name="new-field-id" required>
   </div>
   ```
5. Open `js/pdf_script.js` in a code editor
6. Locate the `sections` object in the `generatePDF()` function (around line 430)
7. Add your new field ID to the appropriate section array
8. Save both files and test the form

### 3.2. Modifying an Existing Field

1. Open `index_with_pdf.html` in a code editor
2. Locate the field you want to modify using search
3. Update the HTML as needed (label, input type, attributes, etc.)
4. If changing the field ID/name, also update any JavaScript references in `js/pdf_script.js`
5. Save the files and test the form

### 3.3. Adding Conditional Logic

To make a field appear/disappear based on another field's value:

1. Open `js/pdf_script.js` in a code editor
2. Add an event listener for the controlling field:
   ```javascript
   document.getElementById('controlling-field').addEventListener('change', function() {
       if (this.value === 'specific-value') {
           document.getElementById('conditional-field-container').classList.remove('hidden');
       } else {
           document.getElementById('conditional-field-container').classList.add('hidden');
       }
   });
   ```
3. Make sure the conditional field container has the `hidden` class by default in the HTML
4. Save the file and test the form

## 4. Customizing the PDF Output

### 4.1. Changing PDF Layout

1. Open `js/pdf_script.js` in a code editor
2. Locate the `generatePDF()` function (around line 414)
3. Modify the layout parameters as needed:
   - Change margins by adjusting x and y coordinates
   - Modify font sizes with `doc.setFontSize()`
   - Change colors with `doc.setTextColor()`
   - Adjust spacing by changing the `yPos` increments

### 4.2. Adding a Logo to the PDF

1. Prepare your logo image (preferably small size, PNG format)
2. Add the logo to the project directory
3. Open `js/pdf_script.js` in a code editor
4. Locate the `generatePDF()` function
5. Add code to include the logo (after creating the jsPDF instance):
   ```javascript
   // Add logo
   const logoData = 'base64-encoded-logo-data'; // Replace with actual base64 data or URL
   doc.addImage(logoData, 'PNG', 10, 10, 30, 15); // Adjust coordinates and dimensions
   ```
6. Adjust other elements' positions to accommodate the logo
7. Save the file and test the PDF generation

### 4.3. Customizing Section Order

1. Open `js/pdf_script.js` in a code editor
2. Locate the `sections` object in the `generatePDF()` function
3. Reorder the sections as needed by changing their order in the object
4. Save the file and test the PDF generation

## 5. Troubleshooting Common Issues

### 5.1. Email Sending Failures

If emails are not being sent:

1. Check the browser console for errors
2. Verify EmailJS credentials (public key, service ID, template ID)
3. Confirm that the EmailJS template is properly configured
4. Test with a simple EmailJS example to isolate the issue
5. Check if the PDF is too large (EmailJS may have size limits)

### 5.2. PDF Generation Issues

If the PDF is not generating correctly:

1. Check the browser console for jsPDF errors
2. Verify that form data is being collected properly
3. Try generating a simple PDF to test jsPDF functionality
4. Check if any form values contain special characters that might cause issues
5. Ensure all required jsPDF libraries are properly loaded

### 5.3. Form Validation Problems

If form validation is not working correctly:

1. Check that required fields have the `required` attribute
2. Verify that the `validateForm()` and `validateSection()` functions are working
3. Check the browser console for JavaScript errors
4. Test individual validation functions with sample data
5. Ensure that conditional fields are properly handled in validation

### 5.4. Browser Compatibility Issues

If the form doesn't work in certain browsers:

1. Test in multiple browsers to identify browser-specific issues
2. Check for use of modern JavaScript features that might not be supported
3. Consider adding polyfills for older browsers
4. Verify that all libraries are compatible with the target browsers
5. Test on different devices (desktop, tablet, mobile)

## Contact Information

For additional support or questions, contact:
- Email: support@ascentadmin.com
- Phone: (555) 123-4567