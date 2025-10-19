// student_signup_details.js

// Array to store all student registration data
let studentRegistrations = [];

// Function to hash password (using simple hashing for demo)
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

// Function to add new student registration
async function addStudentRegistration(formData) {
    const password = formData.get('password');
    const hashedPassword = await hashPassword(password);

    // Convert photo to Data URL
    const photoFile = formData.get('photo');
    let photoDataURL = null;
    
    if (photoFile && photoFile.size > 0) {
        try {
            photoDataURL = await imageFileToDataURL(photoFile);
            console.log('✅ Photo converted to Data URL');
        } catch (error) {
            console.error('❌ Error converting photo:', error);
        }
    }

    const studentData = {
        id: generateStudentId(),
        timestamp: new Date().toISOString(),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        adminID: formData.get('adminID'),
        email: formData.get('email'),
        dob: formData.get('dob'),
        phone: formData.get('phone'),
        gender: formData.get('gender'),
        university: formData.get('university'),
        address: {
            street: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode'),
            country: formData.get('country')
        },
        domain: formData.get('domain'),
        education: formData.get('education'),
        graduationYear: formData.get('graduationYear'),
        photo: photoDataURL, // ✅ Store Data URL instead of filename
        password: hashedPassword,
        registrationDate: new Date().toLocaleDateString()
    };

    // Add to local storage
    studentRegistrations.push(studentData);
    
    // Save to localStorage for persistence
    saveToLocalStorage();
    
    // Log to console (for demonstration)
    console.log('New student registration:', studentData);
    console.log('Photo stored as Data URL:', photoDataURL ? 'Yes' : 'No');
    
    return studentData;
}

// Function to generate unique student ID
function generateStudentId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `STU${timestamp}${randomStr}`.toUpperCase();
}

// Function to save data to localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('studentRegistrations', JSON.stringify(studentRegistrations));
        console.log('Data saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Function to load data from localStorage
function loadFromLocalStorage() {
    try {
        const storedData = localStorage.getItem('studentRegistrations');
        if (storedData) {
            studentRegistrations = JSON.parse(storedData);
            console.log('Data loaded from localStorage:', studentRegistrations.length, 'registrations');
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

// Function to get all student registrations
function getAllRegistrations() {
    return studentRegistrations;
}

// Function to get student by ID
function getStudentById(studentId) {
    return studentRegistrations.find(student => student.id === studentId);
}

// Function to get students by domain
function getStudentsByDomain(domain) {
    return studentRegistrations.filter(student => student.domain === domain);
}

// Function to export data as JSON file
function exportRegistrations() {
    const dataStr = JSON.stringify(studentRegistrations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_registrations_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Function to display registration statistics
function getRegistrationStats() {
    const stats = {
        total: studentRegistrations.length,
        byDomain: {},
        byGender: {},
        recentRegistrations: studentRegistrations.slice(-5) // Last 5 registrations
    };

    // Count by domain
    studentRegistrations.forEach(student => {
        stats.byDomain[student.domain] = (stats.byDomain[student.domain] || 0) + 1;
        stats.byGender[student.gender] = (stats.byGender[student.gender] || 0) + 1;
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
    if (studentRegistrations.some(student => student.email === email)) {
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

// Initialize by loading existing data
loadFromLocalStorage();

// Make functions available globally
window.studentSignupAPI = {
    addStudentRegistration,
    getAllRegistrations,
    getStudentById,
    getStudentsByDomain,
    exportRegistrations,
    getRegistrationStats,
    validateFormData
};

// Log initial state
console.log('Student Signup Details JS loaded. Current registrations:', studentRegistrations.length);
// localStorage.removeItem('studentRegistrations');
// console.log('Registered Students :',localStorage.getItem('studentRegistrations'));