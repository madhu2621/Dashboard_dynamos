// student_course_details.js

const studentCourseVideos = [
    {
        id: 1,
        title: "HTML & CSS",
        part: "Part-1",
        videoUrl: "https://www.youtube.com/embed/4WjtQjPQGIs?si=mPZwspC7C1CwHZUo",
        pdfUrl: "pdfs/html-basics.pdf"
    },
    {
        id: 2,
        title: "HTML & CSS",
        part: "Part-2",
        videoUrl: "https://www.youtube.com/embed/ESnrn1kAD4E?si=jE2pgnE7YBKUFxQu",
        pdfUrl: "pdfs/html-basics-2.pdf"
    },
    {
        id: 3,
        title: "HTML & CSS",
        part: "Part-3",
        videoUrl: "https://www.youtube.com/embed/MkcfB7S4fq0?si=ZZ8Efuw5uTFM2Jwi",
        pdfUrl: "pdfs/html-basics-3.pdf"
    },
    {
        id: 4,
        title: "Java Script",
        part: "Part-1",
        videoUrl: "https://www.youtube.com/embed/VlPiVmYuoqw?si=TozWTljdlcacux6U",
        pdfUrl: "pdfs/js-001.pdf"
    },
    {
        id: 5,
        title: "Java Script",
        part: "Part-2",
        videoUrl: "https://www.youtube.com/embed/7zcXPCt8Ck0?si=_Hy1cf1pLrznWtBA",
        pdfUrl: "pdfs/js-01.pdf"
    },
    {
        id: 6,
        title: "Java Script",
        part: "Part-3",
        videoUrl: "https://www.youtube.com/embed/ajdRvxDWH4w?si=jJHHMOduOjCdFwfO",
        pdfUrl: "pdfs/js-1.pdf"
    },
    {
        id: 7,
        title: "Portfolio Website",
        part: "Part-4",
        videoUrl: "https://www.youtube.com/embed/oFnIe-RpkE4?si=YNmiWDIRaW_1VKG_",
        pdfUrl: "pdfs/js-2.pdf"
    }
];

// Function to get current student data from localStorage
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

// Function to get student progress data
function getStudentProgress() {
    const student = getCurrentStudentData();
    if (!student) {
        return {
            name: "Student",
            streak: 0,
            score: 0,
            course: {
                title: "No Course Assigned",
                currentTopic: "No Topic Available"
            }
        };
    }

    // Determine course based on student's domain
    let courseTitle = "General Studies";
    let currentTopic = "Introduction";
    
    if (student.domain) {
        switch(student.domain.toLowerCase()) {
            case 'webd':
                courseTitle = "WEB DEVELOPMENT";
                currentTopic = "Introduction to Frontend";
                break;
            case 'lang':
                courseTitle = "PROGRAMMING LANGUAGES";
                currentTopic = "Programming Fundamentals";
                break;
            case 'ml':
                courseTitle = "MACHINE LEARNING";
                currentTopic = "Python for ML";
                break;
            case 'ai':
                courseTitle = "ARTIFICIAL INTELLIGENCE";
                currentTopic = "AI Fundamentals";
                break;
            case 'cs':
                courseTitle = "CYBER SECURITY";
                currentTopic = "Security Basics";
                break;
            case 'iot':
                courseTitle = "INTERNET OF THINGS";
                currentTopic = "IoT Fundamentals";
                break;
            default:
                courseTitle = student.domain.toUpperCase();
                currentTopic = "Getting Started";
        }
    }

    // Generate random streak and score for demo
    const streak = Math.floor(Math.random() * 30) + 1;
    const score = Math.floor(Math.random() * 500) + 50;

    return {
        name: `${student.firstName} ${student.lastName}`,
        streak: streak,
        score: score,
        course: {
            title: courseTitle,
            currentTopic: currentTopic
        },
        studentInfo: student
    };
}

// Function to generate personalized dashboard content
function generatePersonalizedDashboard() {
    const progress = getStudentProgress();
    
    // Capitalize first letter of first name
    const firstName = progress.name.split(' ')[0]; // Get first name only
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    
    // Update dashboard content
    document.getElementById('welcome-name').textContent = capitalizedFirstName;
    document.getElementById('streak').innerHTML = `🔥${progress.streak}`;
    document.getElementById('score').innerHTML = `${progress.score}🏆`;
    document.getElementById('course-title').textContent = progress.course.title;
    document.getElementById('current-topic').textContent = progress.course.currentTopic;

    console.log('✅ Dashboard personalized for:', capitalizedFirstName);
    return progress;
}

// Function to generate video section HTML
function generateVideoSection() {
    const progress = getStudentProgress();
    let filteredVideos = studentCourseVideos;

    // Filter videos based on student's course
    if (progress.course.title === "WEB DEVELOPMENT") {
        // Show all web development videos
        filteredVideos = studentCourseVideos;
    } else if (progress.course.title === "DATA SCIENCE") {
        // For demo - in real app, you'd have data science videos
        filteredVideos = studentCourseVideos.slice(0, 3).map(video => ({
            ...video,
            title: "Python & Data Analysis",
            part: video.part.replace("Part", "Module")
        }));
    }

    let videoHTML = `
        <div class="videos-section">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="text-dark mb-0">Course Videos - ${progress.course.title}</h5>
                <small class="text-muted">Enrolled in: ${progress.studentInfo?.domain || 'General'}</small>
            </div>
            <div class="row" id="video-container">
    `;

    if (filteredVideos.length === 0) {
        videoHTML += `
            <div class="col-12">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> No videos available for your course yet. Check back soon!
                </div>
            </div>
        `;
    } else {
        filteredVideos.forEach(video => {
            videoHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card video-card h-100">
                        <a href="${video.videoUrl}" class="video-link" target="_blank">
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="${video.videoUrl}" allowfullscreen></iframe>
                            </div>
                        </a>
                        <div class="card-body">
                            <h6 class="card-title">${video.title}</h6>
                            <p class="text-muted">${video.part}</p>
                            ${progress.studentInfo ? `
                                <small class="text-success">
                                    <i class="fas fa-user-graduate"></i> 
                                    ${progress.studentInfo.education || 'Student'}
                                </small>
                            ` : ''}
                        </div>
                        <div class="card-footer pdf-section">
                            <h6 class="card-title">Notes:</h6>
                            <a href="${video.pdfUrl}" class="btn btn-secondary btn-outline-light bgd-primary" target="_blank">
                                <i class="fas fa-file-pdf"></i> Open PDF
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    videoHTML += `
            </div>
        </div>
    `;

    return videoHTML;
}

// Function to get all videos
function getAllVideos() {
    return studentCourseVideos;
}

// Function to get videos by title
function getVideosByTitle(title) {
    return studentCourseVideos.filter(video => video.title === title);
}

// Function to get video by ID
function getVideoById(id) {
    return studentCourseVideos.find(video => video.id === id);
}

// Function to initialize student dashboard
function initializeStudentDashboard() {
    const progress = generatePersonalizedDashboard();
    const videoSectionHTML = generateVideoSection();
    document.getElementById('video-section-container').innerHTML = videoSectionHTML;
    
    return progress;
}

// Make functions available globally
window.studentCourseAPI = {
    generateVideoSection,
    getAllVideos,
    getVideosByTitle,
    getVideoById,
    getCurrentStudentData,
    getStudentProgress,
    generatePersonalizedDashboard,
    initializeStudentDashboard,
    studentCourseVideos
};

console.log('✅ Student Course Details loaded successfully');