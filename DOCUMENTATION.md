# Claim Form with EmailJS and PDF Integration - Documentation

## Overview

This documentation covers the implementation of a claim form system for Ascent Administration. The system allows users to fill out a detailed claim form, preview the form as a PDF, and submit it via email with the PDF attached. This solution addresses the previous issue where HTML emails were being sent as raw code by replacing them with professionally formatted PDF attachments.

## Key Components

### 1. EmailJS Configuration

The system uses EmailJS to handle email sending with the following configuration:

- **Public Key**: `OaFKQWwpLV-a4LIKF`
- **Service ID**: `service_cpqhxg7`
- **Template ID**: `template_4a1rmi3`

EmailJS is initialized in the JavaScript code:

```javascript
(function() {
    emailjs.init("OaFKQWwpLV-a4LIKF");
})();
```

### 2. PDF Generation

The system uses jsPDF library to generate PDF documents from form data. The PDF includes:

- A title and claim number
- A summary section with key information
- Detailed sections for all form categories
- Proper pagination with headers and footers
- Formatted field labels and values

The PDF generation is handled by the `generatePDF()` function which:
1. Creates a new jsPDF instance
2. Adds title and summary information
3. Iterates through all form sections and fields
4. Formats the data appropriately
5. Handles pagination automatically
6. Returns the PDF as a data URI string for attachment

### 3. Form Structure

The form is divided into six main sections:

1. **Dealer Information**: Details about the selling dealer and current location
2. **Contract Information**: Contract holder details and claim information
3. **Vehicle Information**: VIN, mileage, and vehicle specifications
4. **Claim Details**: Dates, warranties, and contract type
5. **Inspection & Findings**: Technical findings and inspection results
6. **Cost & Recommendation**: Cost details and adjuster recommendations

### 4. User Experience Features

The form includes several UX enhancements:

- **Progress Tracking**: Visual progress bar and completed fields counter
- **Section Navigation**: Tab-based navigation between form sections
- **Validation**: Real-time validation of required fields
- **Conditional Fields**: Dynamic showing/hiding of fields based on selections
- **VIN Decoder**: Simulated VIN decoding functionality
- **Auto-calculations**: Automatic calculation of miles and days since purchase
- **File Upload**: Support for attaching files to the form
- **Form Preview**: PDF preview before submission
- **Auto-save**: Local storage saving of form data

## Email Sending Process

When a user submits the form:

1. The form data is validated
2. A confirmation modal is displayed
3. Upon confirmation:
   - Form data is collected
   - A PDF is generated using jsPDF
   - The PDF is attached to the email as a data URI
   - The email is sent via EmailJS
   - A success message is displayed

The email parameters include:
- Recipient email (default: claimsteam@ascentadmin.com)
- Optional CC recipients
- Subject line with claim number
- Basic email body text
- PDF attachment with complete form data

## File Structure

- **index_with_pdf.html**: Main HTML file with form structure
- **css/styles.css**: Styling for the form
- **js/pdf_script.js**: JavaScript code for form functionality, PDF generation, and email sending
- **External Libraries**:
  - EmailJS (CDN): For email functionality
  - jsPDF (CDN): For PDF generation
  - jsPDF-AutoTable (CDN): For enhanced PDF tables
  - Font Awesome (CDN): For icons

## Implementation Notes

### PDF Generation

The PDF generation uses a structured approach:
1. Creates a new jsPDF instance
2. Adds a title and header information
3. Iterates through predefined sections and fields
4. Formats field labels from kebab-case to Title Case
5. Handles pagination automatically
6. Adds footers with page numbers

### Email Template

The EmailJS template is configured to:
1. Accept a PDF attachment
2. Include basic information in the email body
3. Use a professional format for the email

## Maintenance Instructions

### Updating EmailJS Configuration

If you need to change the EmailJS configuration:

1. Create a new EmailJS account or use the existing one
2. Create a new email service or use the existing one
3. Create a new email template that accepts:
   - Recipient email (`to_email`)
   - CC email (`cc_email`)
   - Subject line (`subject`)
   - Name (`name`)
   - Claim number (`claim-number`)
   - Contract holder name (`contract-first-name`, `contract-last-name`)
   - Submission date (`submission-date`)
   - PDF attachment (`pdf_attachment`)
4. Update the following values in js/pdf_script.js:
   - `emailjs.init("YOUR_PUBLIC_KEY")` (around line 62)
   - `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)` (around line 687)

### Modifying the PDF Format

To change the PDF layout or content:

1. Locate the `generatePDF()` function in js/pdf_script.js (around line 414)
2. Modify the function to change:
   - Title and header formatting
   - Section organization
   - Field inclusion/exclusion
   - Page layout and margins
   - Colors and styling

### Adding or Modifying Form Fields

To add new fields to the form:

1. Add the HTML for the new field in index_with_pdf.html
2. If the field should be included in the PDF, add it to the appropriate section in the `sections` object in the `generatePDF()` function
3. If the field requires special handling (calculations, validation, etc.), add the necessary JavaScript code in pdf_script.js

### Troubleshooting

Common issues and solutions:

1. **Emails not sending**:
   - Check EmailJS configuration (public key, service ID, template ID)
   - Verify the email template is properly set up in EmailJS dashboard
   - Check browser console for errors

2. **PDF not generating correctly**:
   - Check browser console for jsPDF errors
   - Verify that the form data is being properly collected
   - Check for any JavaScript errors in the console

3. **Form validation issues**:
   - Check the `validateForm()` and `validateSection()` functions
   - Verify that required fields are properly marked with the `required` attribute

## Conclusion

This implementation provides a robust solution for the claim form system, addressing the previous issue with HTML emails by replacing them with professionally formatted PDF attachments. The system is designed to be user-friendly, with features like progress tracking, validation, and preview functionality, while also ensuring that the submitted data is properly formatted and presented in the PDF attachment.