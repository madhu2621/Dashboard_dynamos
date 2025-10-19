// learning_path_data.js

// Learning path data structure
const learningPathData = [
    {
        title: "Introduction to Web Development",
        duration: "3 hours",
        description: "Overview, Basics of the Internet, DNS, HTTP Protocol",
        type: "section"
    },
    {
        title: "HTML & CSS",
        type: "category",
        items: [
            {
                title: "HTML Basics: Tags, Elements, Document Structure",
                duration: "4 hours"
            },
            {
                title: "Advanced HTML: Forms, Tables, Semantic HTML",
                duration: "3 hours"
            },
            {
                title: "CSS Basics: Selectors, Box Model, Positioning",
                duration: "5 hours"
            },
            {
                title: "Advanced CSS: Flexbox, Grid, Responsive Design",
                duration: "6 hours"
            }
        ]
    },
    {
        title: "JavaScript",
        type: "category",
        items: [
            {
                title: "JavaScript Basics: Syntax, Variables, Flow Control",
                duration: "6 hours"
            },
            {
                title: "DOM Manipulation: Events, Selecting and Modifying Elements",
                duration: "5 hours"
            },
            {
                title: "JavaScript ES6+: Promises, Async/Await, Modules",
                duration: "7 hours"
            }
        ]
    },
    {
        title: "Version Control",
        duration: "3 hours",
        description: "Introduction to Git: Repositories, Branching, Merging",
        type: "section"
    },
    {
        title: "Front-End Frameworks",
        type: "category",
        items: [
            {
                title: "React: Components, State, Hooks",
                duration: "10 hours"
            },
            {
                title: "Angular: Modules, Services, Routing",
                duration: "12 hours"
            },
            {
                title: "Vue: Vue CLI, Components, Vuex",
                duration: "8 hours"
            }
        ]
    },
    {
        title: "Back-End Development",
        duration: "15 hours",
        description: "Node.js, Express, SQL/NoSQL Databases",
        type: "section"
    },
    {
        title: "Full-Stack Integration",
        duration: "8 hours",
        description: "Connecting Front-End to Back-End, API Integration, Deployment",
        type: "section"
    },
    {
        title: "Capstone Projects",
        duration: "20 hours",
        description: "Individual and Group Projects to consolidate full-stack skills",
        type: "section"
    },
    {
        title: "Career Preparation",
        duration: "5 hours",
        description: "Building Portfolio, Resume Tips, Technical Interview Preparation",
        type: "section"
    }
];

// Function to generate learning path sections
function generateLearningPath() {
    const learningPathContainer = document.getElementById('learning-path-container');
    
    if (!learningPathContainer) {
        console.error('Learning path container not found');
        return;
    }
    
    // Clear existing content
    learningPathContainer.innerHTML = '';
    
    // Generate learning path sections
    learningPathData.forEach(section => {
        const pathSection = document.createElement('div');
        pathSection.className = 'path-section';
        
        if (section.type === 'section') {
            // Simple section with title and description
            pathSection.innerHTML = `
                <h5 class="text-light">${section.title} <span class="time-badge">${section.duration}</span></h5>
                <p>${section.description}</p>
            `;
        } else if (section.type === 'category') {
            // Category with multiple items
            pathSection.innerHTML = `
                <h5 class="text-light">${section.title}</h5>
                <ul>
                    ${section.items.map(item => `
                        <li>${item.title} <span class="time-badge">${item.duration}</span></li>
                    `).join('')}
                </ul>
            `;
        }
        
        learningPathContainer.appendChild(pathSection);
    });
}

// Initialize learning path when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateLearningPath();
});

// Optional: Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        learningPathData,
        generateLearningPath
    };
}