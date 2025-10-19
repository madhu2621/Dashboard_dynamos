// instructor_details.js

// Array to store all instructor registration data
let instructorRegistrations = [];

// Function to hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Function to convert image file to Data URL
function imageFileToDataURL(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            resolve(e.target.result); // This is the Data URL
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

// Function to add new instructor registration
async function addInstructorRegistration(formData) {
    const password = formData.get('password');
    const hashedPassword = await hashPassword(password);

    // Convert photo to Data URL
    const photoFile = formData.get('photo');
    let photoDataURL = null;
    
    if (photoFile && photoFile.size > 0) {
        try {
            photoDataURL = await imageFileToDataURL(photoFile);
            console.log('✅ Instructor photo converted to Data URL');
        } catch (error) {
            console.error('❌ Error converting instructor photo:', error);
        }
    }

    const instructorData = {
        id: generateInstructorId(),
        timestamp: new Date().toISOString(),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        adminID: formData.get('adminID'),
        email: formData.get('email'),
        dob: formData.get('dob'),
        phone: formData.get('phone'),
        gender: formData.get('gender'),
        specialization: formData.get('specialization'),
        address: {
            street: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode'),
            country: formData.get('country')
        },
        education: formData.get('education'),
        experience: formData.get('experience'),
        photo: photoDataURL, // ✅ Store Data URL instead of filename
        password: hashedPassword,
        registrationDate: new Date().toLocaleDateString()
    };

    // Add to local storage
    instructorRegistrations.push(instructorData);
    
    // Save to localStorage for persistence
    saveToLocalStorage();
    
    // Log to console (for demonstration)
    console.log('✅ New instructor registration:', instructorData);
    console.log('📸 Photo stored as Data URL:', photoDataURL ? 'Yes' : 'No');
    
    return instructorData;
}

// Function to verify password
async function verifyPassword(password, hashedPassword) {
    const testHash = await hashPassword(password);
    return testHash === hashedPassword;
}

// Function to generate unique instructor ID
function generateInstructorId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `INS${timestamp}${randomStr}`.toUpperCase();
}

// Function to save data to localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('instructorRegistrations', JSON.stringify(instructorRegistrations));
        console.log('💾 Instructor data saved to localStorage');
    } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
    }
}

// Function to load data from localStorage
function loadFromLocalStorage() {
    try {
        const storedData = localStorage.getItem('instructorRegistrations');
        if (storedData) {
            instructorRegistrations = JSON.parse(storedData);
            console.log('📥 Instructor data loaded from localStorage:', instructorRegistrations.length, 'registrations');
        }
    } catch (error) {
        console.error('❌ Error loading from localStorage:', error);
    }
}

// Function to get all instructor registrations
function getAllRegistrations() {
    return instructorRegistrations;
}

// Function to get instructor by ID
function getInstructorById(instructorId) {
    return instructorRegistrations.find(instructor => instructor.id === instructorId);
}

// Function to get instructor by email
function getInstructorByEmail(email) {
    return instructorRegistrations.find(instructor => instructor.email === email);
}

// Function to get instructors by specialization
function getInstructorsBySpecialization(specialization) {
    return instructorRegistrations.filter(instructor => instructor.specialization === specialization);
}

// Function to export data as JSON file
function exportRegistrations() {
    const dataStr = JSON.stringify(instructorRegistrations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `instructor_registrations_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Function to display registration statistics
function getRegistrationStats() {
    const stats = {
        total: instructorRegistrations.length,
        bySpecialization: {},
        byGender: {},
        byExperience: {},
        recentRegistrations: instructorRegistrations.slice(-5)
    };

    // Count by various categories
    instructorRegistrations.forEach(instructor => {
        stats.bySpecialization[instructor.specialization] = (stats.bySpecialization[instructor.specialization] || 0) + 1;
        stats.byGender[instructor.gender] = (stats.byGender[instructor.gender] || 0) + 1;
        stats.byExperience[instructor.experience] = (stats.byExperience[instructor.experience] || 0) + 1;
    });

    return stats;
}

// Function to validate form data
function validateFormData(formData) {
    const errors = [];

    // Password validation
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    // Email validation
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    // Check if email already exists
    if (instructorRegistrations.some(instructor => instructor.email === email)) {
        errors.push('Email already registered');
    }

    // Phone validation
    const phone = formData.get('phone');
    const phoneRegex = /^\+?[\d\s-]+$/;
    if (!phoneRegex.test(phone)) {
        errors.push('Invalid phone number format');
    }

    return errors;
}

// Function to clear all instructor data
function clearAllInstructorData() {
    if (confirm('⚠️ WARNING: This will delete ALL instructor registration data permanently! Continue?')) {
        localStorage.removeItem('instructorRegistrations');
        instructorRegistrations = [];
        console.log('🗑️ All instructor data deleted');
        alert('✅ All instructor data has been cleared!');
        return true;
    }
    return false;
}

// Initialize by loading existing data
loadFromLocalStorage();

// Make functions available globally
window.instructorSignupAPI = {
    addInstructorRegistration,
    getAllRegistrations,
    getInstructorById,
    getInstructorByEmail,
    getInstructorsBySpecialization,
    exportRegistrations,
    getRegistrationStats,
    validateFormData,
    verifyPassword,
    clearAllInstructorData,
    imageFileToDataURL // ✅ Add this to make it available
};

// Log initial state
console.log('✅ Instructor Signup Details JS loaded. Current registrations:', instructorRegistrations.length);
localStorage.removeItem('instructorRegistrations');
console.log('Registered Instructors :',localStorage.getItem('instructorRegistrations'));