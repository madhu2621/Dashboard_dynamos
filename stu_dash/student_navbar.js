// student_navbar.js
document.addEventListener('DOMContentLoaded', function() {
    // Create the sidebar element
    const sidebarContainer = document.createElement('div');
    sidebarContainer.className = 'd-flex';
    
    // Set the HTML content for the sidebar
    sidebarContainer.innerHTML = `
        <div class="sidebar bg-dark p-3">
            <div class="text-center mb-4 pt-2">
                <img id="profile-pic" src="img/default.jpg" alt="profile" class="mb-3 profile-pic"><br/>
                <h3 id="student-name">Loading...</h3>
            </div>
            <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link" href="home.html"><i class="fa-solid fa-house"></i> Home</a></li>
                <li class="nav-item"><a class="nav-link" href="course_perf.html"><i class="fa-solid fa-book-open"></i> Course Performance</a></li>
                <li class="nav-item"><a class="nav-link" href="weekly_progress.html"><i class="fas fa-chart-line"></i> Weekly Progress</a></li>
                <li class="nav-item"><a class="nav-link" href="leaderboard.html"><i class="fas fa-trophy"></i> Leaderboard</a></li>
                <li class="nav-item"><a class="nav-link" href="learning_path.html"><i class="fas fa-chalkboard-teacher"></i> Learning Path</a></li>
                <li class="nav-item"><a class="nav-link" href="assignments.html"><i class="fas fa-clipboard"></i> Assignments</a></li>
                <li class="nav-item"><a class="nav-link" href="queries.html"><i class="fas fa-comments"></i> Queries</a></li>
                <li class="nav-item"><a class="nav-link" href="../login_interface/login_interface.html"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    `;
    
    // Find the current page URL
    const currentPage = window.location.pathname.split("/").pop();
    
    // Set active class for the current page
    const navLinks = sidebarContainer.querySelectorAll('.nav-item .nav-link');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Insert the sidebar at the beginning of the body
    document.body.insertBefore(sidebarContainer, document.body.firstChild);
    
    // Load student data after navbar is inserted
    loadStudentData();
});

// Function to get current student data from localStorage/sessionStorage
function getCurrentStudentData() {
    try {
        // Try to get from sessionStorage first (from login)
        const sessionStudent = sessionStorage.getItem('currentStudent');
        if (sessionStudent) {
            return JSON.parse(sessionStudent);
        }
        
        // Fallback to localStorage student registrations
        const storedData = localStorage.getItem('studentRegistrations');
        if (storedData) {
            const allStudents = JSON.parse(storedData);
            // Get the most recent student or first one (for demo)
            return allStudents.length > 0 ? allStudents[allStudents.length - 1] : null;
        }
        
        return null;
    } catch (error) {
        console.error('Error getting student data:', error);
        return null;
    }
}

// Function to load student data from signup information
function loadStudentData() {
    try {
        const studentData = getCurrentStudentData();
        
        const profilePic = document.getElementById('profile-pic');
        const studentName = document.getElementById('student-name');
        
        if (studentData) {
            // Update profile picture - CHECK FOR DATA URL
            if (studentData.photo) {
                // Check if it's a Data URL (starts with "data:image")
                if (studentData.photo.startsWith('data:image')) {
                    // ✅ It's a Data URL - use it directly!
                    profilePic.src = studentData.photo;
                    console.log('✅ Using Data URL image from storage');
                } else {
                    // ❌ It's just a filename - try to use it as path
                    profilePic.src = `uploads/${studentData.photo}`;
                    console.log('⚠️ Using filename path:', studentData.photo);
                    
                    // Add error handling for filename approach
                    profilePic.onerror = function() {
                        console.log('❌ Photo not found at path, using default');
                        this.src = 'img/default.jpg';
                    };
                }
            } else {
                profilePic.src = 'img/default.jpg';
                console.log('⚠️ No photo found in student data');
            }
            
            // Update student name - capitalize first letter of first name
            if (studentData.firstName) {
                const firstName = studentData.firstName;
                const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
                studentName.textContent = capitalizedFirstName;
                console.log('✅ Student name set to:', capitalizedFirstName);
            } else {
                studentName.textContent = 'Student';
            }
            
            console.log('✅ Navbar updated with student data:', studentData.firstName);
            
        } else {
            // Fallback if no student data found
            if (profilePic) profilePic.src = 'img/default.jpg';
            if (studentName) studentName.textContent = 'Student';
            console.log('⚠️ No student data found in localStorage');
        }

    } catch (error) {
        console.error("Error loading student data for navbar:", error);
        
        // Ultimate fallback
        const profilePic = document.getElementById('profile-pic');
        const studentName = document.getElementById('student-name');
        
        if (profilePic) profilePic.src = 'img/default.jpg';
        if (studentName) studentName.textContent = 'Student';
    }
}

// Function to handle file upload and display (for photo)
function handleProfilePhotoUpload(fileInput) {
    return new Promise((resolve, reject) => {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Update the profile picture in the navbar
                const profilePic = document.getElementById('profile-pic');
                if (profilePic) {
                    profilePic.src = e.target.result;
                }
                resolve(e.target.result);
            };
            
            reader.onerror = function(error) {
                reject(error);
            };
            
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            reject(new Error('No file selected'));
        }
    });
}

// Make functions available globally for other scripts
window.studentNavbarAPI = {
    loadStudentData,
    getCurrentStudentData,
    handleProfilePhotoUpload
};

console.log('✅ Student Navbar loaded successfully');
console.log(localStorage.getItem('studentRegistrations'));