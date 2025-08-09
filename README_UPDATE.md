# Enhanced Claim Form with PDF Generation

This project is an enhanced version of a vehicle claim form for Ascent Administration. The form has been redesigned to improve user experience, add validation, and streamline the submission process. The latest update adds PDF generation functionality to solve the issue with HTML emails being sent as raw code.

## Latest Enhancements

### PDF Generation and Attachment
- Added jsPDF library to generate professional PDF documents from form data
- PDF is attached to the email instead of sending HTML content directly
- Includes proper formatting, sections, and pagination
- Preview functionality allows users to see the PDF before sending

### Email Configuration Update
- Updated EmailJS configuration with correct credentials:
  - Public Key: OaFKQWwpLV-a4LIKF
  - Service ID: service_cpqhxg7
  - Template ID: template_4a1rmi3
- Simplified email template to focus on the PDF attachment

### Comprehensive Documentation
- Added detailed technical documentation (DOCUMENTATION.md)
- Created step-by-step maintenance guide (MAINTENANCE_GUIDE.md)
- Provided implementation summary (IMPLEMENTATION_SUMMARY.md)

### Email Recipient Customization
- Added a recipient email field with default value of claimsteam@ascentadmin.com
- Added a CC field for additional recipients
- Both fields are properly validated for email format

### Email Preview Functionality
- Added a "Preview Email" button that shows how the email will look before sending
- The preview shows the recipient, CC addresses, and the PDF attachment
- Users can edit the email or proceed with sending from the preview modal

## Features

### User Interface Improvements
- **Modern, Clean Design**: Professional appearance with clear visual hierarchy
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Section-Based Navigation**: Form divided into logical sections for easier completion
- **Progress Tracking**: Real-time progress bar and completion percentage
- **Required Field Tracking**: Shows how many required fields have been completed

### Functional Enhancements
- **Real-Time Validation**: Immediate feedback on field completion
- **Auto-Save Functionality**: Saves form progress to local storage
- **Conditional Fields**: Shows/hides fields based on user selections
- **VIN Decoder**: Automatically retrieves vehicle information from VIN
- **Automatic Calculations**:
  - Miles since purchase
  - Days since purchase
- **File Upload**: Drag-and-drop file upload with preview
- **Print-Friendly Version**: Optimized layout for printing

### Submission Process
- **PDF Generation**: Creates professional PDF of form data
- **Email Integration**: Sends form data with PDF attachment to specified email recipients
- **Confirmation Process**: Two-step confirmation before submission
- **Success Feedback**: Clear confirmation when form is successfully submitted

## Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. Create a new GitHub repository
2. Clone this repository to your local machine
3. Push the code to your GitHub repository:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```
4. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select the main branch as the source
   - Click Save
5. Your form will be available at: https://yourusername.github.io/your-repo-name/

### Option 2: Using the Deployment Script

1. Create a new GitHub repository
2. Run the deployment script:
   ```
   ./deploy.sh https://github.com/yourusername/your-repo-name.git
   ```
3. Enable GitHub Pages in your repository settings

### Option 3: Manual Deployment to Web Server

1. Upload the following files to your web server:
   - index_with_pdf.html (rename to index.html if desired)
   - css/styles.css
   - js/pdf_script.js
   - 404.html
2. No server-side code is required as the form uses EmailJS for submission

## Email Configuration

The email functionality is already configured with the correct EmailJS credentials. If you need to update the configuration:

1. Sign up for an EmailJS account at https://www.emailjs.com/
2. Create an email template that supports PDF attachments
3. Update the EmailJS configuration in pdf_script.js with your user ID:
   ```javascript
   emailjs.init("YOUR_USER_ID");
   ```
4. Update the email service and template IDs:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
   ```

## Documentation

This project includes comprehensive documentation:

- **DOCUMENTATION.md**: Detailed technical documentation of the entire system
- **MAINTENANCE_GUIDE.md**: Step-by-step instructions for common maintenance tasks
- **IMPLEMENTATION_SUMMARY.md**: High-level overview of the implementation

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)