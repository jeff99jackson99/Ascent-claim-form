# Enhanced Claim Form

This project is an enhanced version of a vehicle claim form for Ascent Administration. The form has been redesigned to improve user experience, add validation, and streamline the submission process.

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
- **Email Integration**: Sends form data directly
- **Confirmation Process**: Two-step confirmation before submission
- **Success Feedback**: Clear confirmation when form is successfully submitted

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with flexbox for responsive layout
- **JavaScript**: Client-side validation and interactive features
- **EmailJS**: Email submission without server-side code
- **LocalStorage API**: For saving form progress

### Form Structure
The form is divided into six logical sections:
1. **Dealer Information**: Details about the selling dealer and current location
2. **Contract Information**: Contract holder details and claim information
3. **Vehicle Information**: VIN, mileage, and vehicle characteristics
4. **Claim Details**: Dates, warranties, and usage information
5. **Inspection & Findings**: Technical findings and inspection details
6. **Cost & Recommendation**: Repair costs and adjuster recommendations

### Validation System
- Real-time validation for all required fields
- Section validation before proceeding to next section
- Complete form validation before submission
- Visual indicators for errors and completed sections

### Data Handling
- Form data is collected and formatted for email submission
- File attachments are included in the email
- Auto-save functionality preserves user input
- Print-friendly version for physical records

## Improvements Over Original Form

### Design Improvements
- **Visual Hierarchy**: Clear distinction between sections and field groups
- **Color Coding**: Intuitive color scheme for status and actions
- **Typography**: Improved readability with modern font stack
- **Spacing**: Consistent spacing for better visual flow
- **Mobile Optimization**: Fully responsive for all device sizes

### Usability Improvements
- **Guided Navigation**: Step-by-step process with clear next/previous buttons
- **Contextual Help**: Field descriptions and tooltips where needed
- **Error Prevention**: Real-time validation prevents submission errors
- **Progress Indication**: Clear feedback on completion status
- **Simplified Sections**: Logical grouping of related fields

### Functional Improvements
- **VIN Decoder**: Automatic vehicle information retrieval
- **Automatic Calculations**: Reduces manual calculation errors
- **Conditional Logic**: Shows only relevant fields based on selections
- **Data Persistence**: Auto-save prevents data loss
- **Enhanced File Upload**: Better file management with previews

## Installation and Usage

1. Clone or download this repository
2. Open index.html in a web browser
3. Fill out the form sections
4. Submit when complete

## Email Configuration

To enable email functionality:
1. Sign up for an EmailJS account
2. Create an email template
3. Update the EmailJS configuration in script.js with your user ID and template ID

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)
