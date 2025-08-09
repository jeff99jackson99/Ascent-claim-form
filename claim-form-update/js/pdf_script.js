document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('claim-form');
    const formSections = document.querySelectorAll('.form-section');
    const navButtons = document.querySelectorAll('.nav-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const saveBtn = document.getElementById('save-btn');
    
    // Progress tracking elements
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const completedFieldsCount = document.getElementById('completed-fields');
    const totalRequiredFields = document.getElementById('total-required-fields');
    
    // Modal elements
    const confirmationModal = document.getElementById('confirmation-modal');
    const successModal = document.getElementById('success-modal');
    const previewModal = document.getElementById('preview-modal');
    const closeButtons = document.querySelectorAll('.close');
    const cancelSubmit = document.getElementById('cancel-submit');
    const confirmSubmit = document.getElementById('confirm-submit');
    const newFormBtn = document.getElementById('new-form');
    const previewBtn = document.getElementById('preview-btn');
    const editEmailBtn = document.getElementById('edit-email');
    const sendEmailBtn = document.getElementById('send-email');
    
    // Conditional fields
    const modificationsSelect = document.getElementById('modifications');
    const modificationsDetails = document.getElementById('modifications-details');
    const inspectionOrderedSelect = document.getElementById('inspection-ordered');
    const inspectorFindingsContainer = document.getElementById('inspector-findings-container');
    
    // VIN decoder
    const vinInput = document.getElementById('vin');
    const decodeVinBtn = document.getElementById('decode-vin');
    const vinDetails = document.getElementById('vin-details');
    const vehicleMake = document.getElementById('vehicle-make');
    const vehicleModel = document.getElementById('vehicle-model');
    const vehicleYear = document.getElementById('vehicle-year');
    
    // Mileage calculation
    const mileagePurchase = document.getElementById('mileage-purchase');
    const currentMileage = document.getElementById('current-mileage');
    const milesSincePurchase = document.getElementById('miles-since-purchase');
    
    // Date calculation
    const purchaseDate = document.getElementById('purchase-date');
    const daysSincePurchase = document.getElementById('days-since-purchase');
    
    // File upload
    const fileUpload = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    
    // Required fields
    const requiredFields = document.querySelectorAll('[required]');
    totalRequiredFields.textContent = requiredFields.length;
    
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init("OaFKQWwpLV-a4LIKF");
    })();
    
    // ===== NAVIGATION FUNCTIONS =====
    
    // Show a specific section
    function showSection(sectionId) {
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(sectionId).classList.add('active');
        
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-section') === sectionId) {
                button.classList.add('active');
            }
        });
        
        // Update progress
        updateProgress();
    }
    
    // Navigation button click handlers
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Next button click handlers
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = this.closest('.form-section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection && nextSection.classList.contains('form-section')) {
                // Validate current section before proceeding
                if (validateSection(currentSection)) {
                    showSection(nextSection.id);
                } else {
                    alert('Please fill out all required fields in this section before proceeding.');
                }
            }
        });
    });
    
    // Previous button click handlers
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentSection = this.closest('.form-section');
            const prevSection = currentSection.previousElementSibling;
            
            if (prevSection && prevSection.classList.contains('form-section')) {
                showSection(prevSection.id);
            }
        });
    });
    
    // ===== VALIDATION FUNCTIONS =====
    
    // Validate a specific section
    function validateSection(section) {
        const requiredInputs = section.querySelectorAll('[required]');
        let valid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return valid;
    }
    
    // Validate the entire form
    function validateForm() {
        let valid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        // Special validation for email field
        const emailField = document.getElementById('recipient-email');
        if (emailField && emailField.value.trim()) {
            // Check if it's a valid email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                valid = false;
                emailField.classList.add('error');
                alert('Please enter a valid email address for the recipient.');
            }
        }
        
        // Validate CC emails if provided
        const ccEmailsField = document.getElementById('cc-emails');
        if (ccEmailsField && ccEmailsField.value.trim()) {
            const emails = ccEmailsField.value.split(',').map(email => email.trim());
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            for (const email of emails) {
                if (!emailPattern.test(email)) {
                    valid = false;
                    ccEmailsField.classList.add('error');
                    alert('Please enter valid email addresses in the CC field (comma-separated).');
                    break;
                }
            }
        }
        
        return valid;
    }
    
    // ===== PROGRESS TRACKING =====
    
    // Update progress bar and completed fields count
    function updateProgress() {
        let completed = 0;
        
        requiredFields.forEach(field => {
            if (field.value.trim()) {
                completed++;
            }
        });
        
        const percentage = Math.round((completed / requiredFields.length) * 100);
        
        progressBar.style.width = percentage + '%';
        progressPercentage.textContent = percentage;
        completedFieldsCount.textContent = completed;
        
        // Add visual indicator for completed sections
        formSections.forEach(section => {
            const sectionRequiredFields = section.querySelectorAll('[required]');
            const sectionNavBtn = document.querySelector(`.nav-btn[data-section="${section.id}"]`);
            
            let allCompleted = true;
            sectionRequiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allCompleted = false;
                }
            });
            
            if (allCompleted && sectionRequiredFields.length > 0) {
                sectionNavBtn.innerHTML += ' <i class="fas fa-check"></i>';
            } else {
                sectionNavBtn.innerHTML = sectionNavBtn.innerHTML.replace(' <i class="fas fa-check"></i>', '');
            }
        });
    }
    
    // ===== CONDITIONAL FIELDS =====
    
    // Show/hide modifications details
    modificationsSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            modificationsDetails.classList.remove('hidden');
        } else {
            modificationsDetails.classList.add('hidden');
        }
    });
    
    // Show/hide inspector findings
    inspectionOrderedSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            inspectorFindingsContainer.classList.remove('hidden');
        } else {
            inspectorFindingsContainer.classList.add('hidden');
        }
    });
    
    // ===== VIN DECODER =====
    
    decodeVinBtn.addEventListener('click', function() {
        const vin = vinInput.value.trim();
        
        if (vin.length !== 17) {
            alert('Please enter a valid 17-character VIN.');
            return;
        }
        
        // In a real implementation, you would call a VIN decoder API
        // For this example, we'll simulate a response
        simulateVinDecode(vin);
    });
    
    function simulateVinDecode(vin) {
        // This is a placeholder function that would normally call a VIN API
        // For demonstration purposes, we'll use the first few characters to determine make/model
        
        // Show loading state
        decodeVinBtn.textContent = 'Decoding...';
        decodeVinBtn.disabled = true;
        
        setTimeout(() => {
            let make, model, year;
            
            // Simple simulation based on first character
            const firstChar = vin.charAt(0).toUpperCase();
            
            switch(firstChar) {
                case '1':
                case '4':
                case '5':
                    make = 'Chevrolet';
                    model = 'Silverado';
                    break;
                case '2':
                    make = 'Ford';
                    model = 'F-150';
                    break;
                case '3':
                    make = 'Dodge';
                    model = 'Ram';
                    break;
                case 'J':
                    make = 'Jeep';
                    model = 'Wrangler';
                    break;
                case 'W':
                    make = 'Mercedes-Benz';
                    model = 'C-Class';
                    break;
                default:
                    make = 'Toyota';
                    model = 'Camry';
            }
            
            // Extract year from 10th character (simplified)
            const yearChar = vin.charAt(9);
            const yearMap = {
                'A': '2010', 'B': '2011', 'C': '2012', 'D': '2013', 'E': '2014',
                'F': '2015', 'G': '2016', 'H': '2017', 'J': '2018', 'K': '2019',
                'L': '2020', 'M': '2021', 'N': '2022', 'P': '2023', 'R': '2024'
            };
            
            year = yearMap[yearChar] || '2020';
            
            // Update the form
            vehicleMake.value = make;
            vehicleModel.value = model;
            vehicleYear.value = year;
            
            // Show the details
            vinDetails.classList.remove('hidden');
            
            // Reset button
            decodeVinBtn.textContent = 'Decode VIN';
            decodeVinBtn.disabled = false;
        }, 1000);
    }
    
    // ===== CALCULATIONS =====
    
    // Calculate miles since purchase
    function calculateMilesDifference() {
        const initialMiles = parseFloat(mileagePurchase.value) || 0;
        const currentMiles = parseFloat(currentMileage.value) || 0;
        
        if (initialMiles && currentMiles) {
            milesSincePurchase.value = Math.max(0, currentMiles - initialMiles);
        }
    }
    
    mileagePurchase.addEventListener('input', calculateMilesDifference);
    currentMileage.addEventListener('input', calculateMilesDifference);
    
    // Calculate days since purchase
    function calculateDaysSincePurchase() {
        const purchaseDateValue = purchaseDate.value;
        
        if (purchaseDateValue) {
            const purchase = new Date(purchaseDateValue);
            const today = new Date();
            
            const diffTime = Math.abs(today - purchase);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            daysSincePurchase.value = diffDays;
        }
    }
    
    purchaseDate.addEventListener('input', calculateDaysSincePurchase);
    
    // ===== FILE UPLOAD =====
    
    fileUpload.addEventListener('change', function() {
        updateFileList();
    });
    
    function updateFileList() {
        fileList.innerHTML = '';
        
        if (fileUpload.files.length > 0) {
            for (let i = 0; i < fileUpload.files.length; i++) {
                const file = fileUpload.files[i];
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = file.name;
                
                const fileSize = document.createElement('span');
                fileSize.className = 'file-size';
                fileSize.textContent = formatFileSize(file.size);
                
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-file';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.setAttribute('data-index', i);
                
                fileItem.appendChild(fileName);
                fileItem.appendChild(fileSize);
                fileItem.appendChild(removeBtn);
                fileList.appendChild(fileItem);
            }
        }
    }
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return bytes + ' B';
        } else if (bytes < 1048576) {
            return (bytes / 1024).toFixed(1) + ' KB';
        } else {
            return (bytes / 1048576).toFixed(1) + ' MB';
        }
    }
    
    // Remove file (note: this is a UI simulation as we can't modify FileList directly)
    fileList.addEventListener('click', function(e) {
        if (e.target.closest('.remove-file')) {
            const fileItem = e.target.closest('.file-item');
            fileItem.remove();
        }
    });
    
    // ===== PDF GENERATION =====
    
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
    
    // ===== FORM SUBMISSION =====
    
    // Show confirmation modal
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Get the recipient email and update the confirmation modal
            const recipientEmail = document.getElementById('recipient-email').value;
            document.getElementById('confirm-email').textContent = recipientEmail;
            
            confirmationModal.style.display = 'block';
        } else {
            alert('Please fill out all required fields before submitting.');
            
            // Find the first section with an error and navigate to it
            formSections.forEach(section => {
                const errorFields = section.querySelectorAll('.error');
                if (errorFields.length > 0 && !section.classList.contains('active')) {
                    showSection(section.id);
                    return;
                }
            });
        }
    });
    
    // Cancel submission
    cancelSubmit.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });
    
    // Confirm submission
    confirmSubmit.addEventListener('click', function() {
        // Get the recipient email for the success modal
        const recipientEmail = document.getElementById('recipient-email').value;
        document.getElementById('success-email').textContent = recipientEmail;
        
        // In a real implementation, you would send the form data via EmailJS
        sendEmail();
        
        // Close confirmation modal
        confirmationModal.style.display = 'none';
        
        // Show success modal
        successModal.style.display = 'block';
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            successModal.style.display = 'none';
            previewModal.style.display = 'none';
        });
    });
    
    // Start new form
    newFormBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
        form.reset();
        showSection('dealer-info');
        updateProgress();
    });
    
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
    
    // Edit email button
    editEmailBtn.addEventListener('click', function() {
        // Close the preview modal
        previewModal.style.display = 'none';
        
        // Navigate to the section with email fields
        showSection('cost-recommendation');
    });
    
    // Send email button
    sendEmailBtn.addEventListener('click', function() {
        // Close the preview modal
        previewModal.style.display = 'none';
        
        // Get the recipient email for the confirmation modal
        const recipientEmail = document.getElementById('recipient-email').value;
        document.getElementById('confirm-email').textContent = recipientEmail;
        
        // Show the confirmation modal
        confirmationModal.style.display = 'block';
    });
    
    // ===== EMAIL SUBMISSION =====
    
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
    
    // ===== AUTO-SAVE FUNCTIONALITY =====
    
    // Save form data to localStorage
    saveBtn.addEventListener('click', function() {
        const formData = new FormData(form);
        const formDataObj = {};
        
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
        
        localStorage.setItem('claimFormData', JSON.stringify(formDataObj));
        alert('Form data saved successfully!');
    });
    
    // Load saved form data
    function loadSavedData() {
        const savedData = localStorage.getItem('claimFormData');
        
        if (savedData) {
            const formDataObj = JSON.parse(savedData);
            
            for (const key in formDataObj) {
                const input = form.elements[key];
                if (input) {
                    input.value = formDataObj[key];
                }
            }
            
            // Update calculations and conditional fields
            calculateMilesDifference();
            calculateDaysSincePurchase();
            updateProgress();
            
            // Check conditional fields
            if (modificationsSelect.value === 'yes') {
                modificationsDetails.classList.remove('hidden');
            }
            
            if (inspectionOrderedSelect.value === 'yes') {
                inspectorFindingsContainer.classList.remove('hidden');
            }
        }
    }
    
    // ===== REAL-TIME VALIDATION =====
    
    // Add input event listeners to all required fields
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
            } else {
                this.classList.add('error');
            }
            
            updateProgress();
        });
    });
    
    // ===== INITIALIZATION =====
    
    // Initialize the form
    function init() {
        showSection('dealer-info');
        loadSavedData();
        updateProgress();
    }
    
    init();
});