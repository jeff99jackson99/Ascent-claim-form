# PDF Implementation Plan for Claim Form

## Overview
We'll modify the claim form to generate a PDF of the form data and attach it to the email instead of sending HTML content directly in the email body. This will ensure consistent formatting across all email clients.

## Implementation Steps

### 1. Add jsPDF Library
We'll add the jsPDF library to the project. This library allows us to generate PDFs directly in the browser.

```html
<!-- Add to the head section of index.html -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
```

### 2. Create PDF Generation Function
We'll add a function to generate a PDF from the form data.

```javascript
function generatePDF(data) {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Ascent Administration Claim Form", 105, 15, { align: "center" });
    
    // Add claim number
    doc.setFontSize(12);
    doc.text(`Claim #: ${data['claim-number'] || 'New Submission'}`, 105, 25, { align: "center" });
    
    // Add summary section
    doc.setFontSize(14);
    doc.text("Summary", 14, 35);
    doc.setFontSize(10);
    doc.text(`Submission Date: ${data.submission_date || 'Unknown date'}`, 14, 45);
    doc.text(`Contract Holder: ${data['contract-first-name'] || ''} ${data['contract-last-name'] || ''}`, 14, 50);
    doc.text(`Vehicle: ${data['vehicle-year'] || ''} ${data['vehicle-make'] || ''} ${data['vehicle-model'] || ''}`, 14, 55);
    doc.text(`VIN: ${data['vin'] || ''}`, 14, 60);
    
    // Define sections and their fields
    const sections = {
        'Dealer Information': [
            'selling-dealer', 'adjuster', 'current-dealer', 'street-address', 
            'street-address-2', 'city', 'state', 'zip', 'agent-first-name', 'agent-last-name'
        ],
        'Contract Information': [
            'contract-first-name', 'contract-last-name', 'reinsured-contract', 
            'claim-number', 'previous-claims', 'acv', 'lienholder', 
            'pending-contract', 'authorization-type'
        ],
        'Vehicle Information': [
            'purchase-date', 'vin', 'vehicle-make', 'vehicle-model', 'vehicle-year',
            'mileage-purchase', 'current-mileage', 'miles-since-purchase',
            'maintenance-records', 'vehicle-surcharges', 'tsb-checked',
            'power-sports', 'apex-surcharges'
        ],
        'Claim Details': [
            'claim-submission-date', 'claim-entry-date', 'days-since-purchase',
            'warranties-checked', 'rideshare', 'abuse-neglect', 'modifications',
            'modifications-found', 'contract-type'
        ],
        'Inspection & Findings': [
            'failed-components', 'tech-findings', 'inspection-ordered', 'inspector-findings'
        ],
        'Cost & Recommendation': [
            'repair-cost', 'goodwill-cost', 'adjusted-cost', 'price-adjustment-explanation',
            'adjuster-recommendation', 'comments', 'inspection-link', 'accuracy-check',
            'director-reviewed', 'review-hour', 'review-minute', 'review-ampm'
        ]
    };
    
    // Starting y position for sections
    let yPos = 70;
    
    // Add each section
    for (const [sectionName, fields] of Object.entries(sections)) {
        // Add section header
        doc.setFontSize(14);
        doc.setTextColor(41, 37, 96); // #272560
        doc.text(sectionName, 14, yPos);
        yPos += 10;
        
        // Reset text color
        doc.setTextColor(0, 0, 0);
        
        // Add fields for this section
        doc.setFontSize(10);
        fields.forEach(field => {
            // Format field label
            const fieldLabel = field.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            // Get field value
            const value = data[field] || '';
            const displayValue = value === '' ? 'Not provided' : value;
            
            // Add field to PDF
            doc.text(`${fieldLabel}: ${displayValue}`, 14, yPos);
            yPos += 5;
            
            // Add a new page if we're near the bottom
            if (yPos > 280) {
                doc.addPage();
                yPos = 20;
            }
        });
        
        // Add space after section
        yPos += 10;
        
        // Add a new page if we're near the bottom
        if (yPos > 280) {
            doc.addPage();
            yPos = 20;
        }
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text('This is an automated report from the Ascent Administration Claim Form system.', 105, 290, { align: 'center' });
        doc.text(`Page ${i} of ${pageCount}`, 195, 290, { align: 'right' });
    }
    
    // Return the PDF as a data URL
    return doc.output('datauristring');
}
```

### 3. Update EmailJS Template
We'll simplify the EmailJS template to include basic text and instructions to check the attachment.

Template content:
```
A claim form has been submitted by {{name}}.

Please find the attached PDF for the complete claim details.

Claim #: {{claim-number}}
Contract Holder: {{contract-first-name}} {{contract-last-name}}
Submission Date: {{submission-date}}

This is an automated email from the Ascent Administration Claim Form system.
```

### 4. Modify Email Sending Function
We'll update the email sending function to generate a PDF and attach it to the email.

```javascript
function sendEmail() {
    try {
        // Get form data
        const formData = new FormData(form);
        const templateParams = {};
        
        // Extract recipient email and CC emails
        const recipientEmail = document.getElementById('recipient-email').value;
        const ccEmails = document.getElementById('cc-emails').value;
        
        // Convert FormData to object for template parameters
        for (let [key, value] of formData.entries()) {
            templateParams[key] = value;
        }
        
        // Add additional information
        templateParams.submission_date = new Date().toLocaleString();
        
        // Generate PDF
        const pdfDataUri = generatePDF(templateParams);
        
        // Prepare the email parameters for EmailJS
        const emailParams = {
            to_email: recipientEmail,
            cc_email: ccEmails,
            subject: `Claim Form: ${templateParams['claim-number'] || 'New Submission'}`,
            name: templateParams['adjuster'] || 'User',
            'claim-number': templateParams['claim-number'] || 'New Submission',
            'contract-first-name': templateParams['contract-first-name'] || '',
            'contract-last-name': templateParams['contract-last-name'] || '',
            'submission-date': templateParams.submission_date,
            pdf_attachment: pdfDataUri
        };
        
        // Send the email using EmailJS
        emailjs.send('service_cpqhxg7', 'template_4a1rmi3', emailParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
                alert('There was an error sending the email. Please try again.');
            });
        
        // Log for debugging
        console.log('Email sent to:', recipientEmail);
        if (ccEmails) {
            console.log('CC:', ccEmails);
        }
        console.log('Email with PDF attachment prepared successfully');
    } catch (error) {
        console.error('Error in sendEmail function:', error);
        alert('There was an error preparing the email. Please try again.');
    }
}
```

### 5. Update Preview Function
We'll also update the preview function to show the PDF.

```javascript
// Preview button
previewBtn.addEventListener('click', function() {
    if (validateForm()) {
        // Get recipient email and CC emails
        const recipientEmail = document.getElementById('recipient-email').value;
        const ccEmails = document.getElementById('cc-emails').value;
        
        // Update preview modal with recipient information
        document.getElementById('preview-recipient').textContent = recipientEmail;
        document.getElementById('preview-cc').textContent = ccEmails || 'None';
        document.getElementById('preview-subject').textContent = `Claim Form: ${document.getElementById('claim-number')?.value || 'New Submission'}`;
        
        // Generate email preview
        const formData = new FormData(form);
        const templateParams = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            templateParams[key] = value;
        }
        
        // Add additional information
        templateParams.submission_date = new Date().toLocaleString();
        
        // Generate PDF and display it in the iframe
        const pdfDataUri = generatePDF(templateParams);
        const iframe = document.getElementById('email-preview-frame');
        iframe.src = pdfDataUri;
        
        // Show the preview modal
        previewModal.style.display = 'block';
    } else {
        alert('Please fill out all required fields before previewing the email.');
    }
});
```

## Implementation Notes

1. **EmailJS Template Update**:
   - You'll need to update your EmailJS template to include a field for the PDF attachment
   - The template should be configured to accept attachments

2. **PDF Styling**:
   - The PDF styling can be further customized to match your branding
   - jsPDF supports various styling options including colors, fonts, and images

3. **Testing**:
   - Test the PDF generation with various form inputs
   - Verify that the PDF is properly attached to the email
   - Check how the PDF appears in different email clients

4. **File Size Considerations**:
   - Be mindful of the PDF file size, especially if including images
   - EmailJS may have limitations on attachment sizes

## Next Steps

1. Implement these changes in your codebase
2. Update your EmailJS template to handle attachments
3. Test the PDF generation and email sending
4. Deploy the updated form to your GitHub Pages site