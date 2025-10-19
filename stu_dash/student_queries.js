// student_queries.js

// Sample instructor responses data
const instructorResponses = [
    {
        id: 1,
        instructorName: "Instructor",
        responseTime: "2 days ago",
        responseText: "Your previous query has been addressed. Please check the resource links provided.",
        queryId: 101
    },
    {
        id: 2,
        instructorName: "Instructor",
        responseTime: "5 days ago",
        responseText: "For the upcoming assignment, make sure you review the last lecture video.",
        queryId: 102
    },
    {
        id: 3,
        instructorName: "Instructor",
        responseTime: "1 week ago",
        responseText: "The JavaScript concepts will be covered in detail in next week's session.",
        queryId: 103
    }
];

// Student's submitted queries (for demo purposes)
let studentQueries = [
    {
        id: 101,
        question: "Can you explain the CSS Grid layout more?",
        timestamp: "2024-09-10",
        status: "answered"
    },
    {
        id: 102,
        question: "When is the next assignment due?",
        timestamp: "2024-09-08",
        status: "answered"
    },
    {
        id: 103,
        question: "I'm having trouble with JavaScript promises.",
        timestamp: "2024-09-05",
        status: "answered"
    }
];

// Function to display instructor responses
function displayInstructorResponses() {
    const responseSection = document.getElementById('responseSection');
    
    if (!responseSection) {
        console.error('Response section not found');
        return;
    }
    
    // Clear existing content
    responseSection.innerHTML = '';
    
    // Display each response
    instructorResponses.forEach(response => {
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';
        
        responseItem.innerHTML = `
            <div class="response-header">
                <span class="instructor-name">${response.instructorName}:</span>
                <span class="response-time">${response.responseTime}</span>
            </div>
            <p class="response-text">${response.responseText}</p>
        `;
        
        responseSection.appendChild(responseItem);
    });
}

// Function to submit a new query
function submitQuery() {
    const queryInput = document.getElementById('queryInput');
    const queryStatus = document.getElementById('queryStatus');
    const queryText = queryInput.value.trim();
    
    if (!queryText) {
        queryStatus.textContent = 'Please enter a query before submitting.';
        queryStatus.style.color = 'red';
        return;
    }
    
    // Show submitting status
    queryStatus.textContent = 'Submitting query...';
    queryStatus.style.color = 'blue';
    
    // Simulate API call delay
    setTimeout(() => {
        // Create new query object
        const newQuery = {
            id: Date.now(), // Simple ID generation
            question: queryText,
            timestamp: new Date().toLocaleDateString(),
            status: 'pending'
        };
        
        // Add to student queries
        studentQueries.push(newQuery);
        
        // Clear input
        queryInput.value = '';
        
        // Show success message
        queryStatus.textContent = 'Query submitted successfully! The instructor will respond soon.';
        queryStatus.style.color = 'green';
        
        // Clear status message after 3 seconds
        setTimeout(() => {
            queryStatus.textContent = '';
        }, 3000);
        
        // In a real application, you would send the query to the server here
        console.log('Query submitted:', newQuery);
        
    }, 1000);
}

// Function to load student's query history (for future enhancement)
function loadQueryHistory() {
    // This function can be expanded to show the student's query history
    console.log('Student queries:', studentQueries);
}

// Function to simulate receiving a new response (for demo purposes)
function simulateNewResponse() {
    const newResponse = {
        id: instructorResponses.length + 1,
        instructorName: "Instructor",
        responseTime: "Just now",
        responseText: "Thank you for your question. I'll review it and get back to you shortly.",
        queryId: Date.now()
    };
    
    instructorResponses.unshift(newResponse); // Add to beginning
    displayInstructorResponses();
    
    // Show notification
    const queryStatus = document.getElementById('queryStatus');
    queryStatus.textContent = 'New response received!';
    queryStatus.style.color = 'green';
    
    setTimeout(() => {
        queryStatus.textContent = '';
    }, 3000);
}

// Initialize queries functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayInstructorResponses();
    loadQueryHistory();
    
    // Add event listener for Enter key in query input
    const queryInput = document.getElementById('queryInput');
    if (queryInput) {
        queryInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && event.ctrlKey) {
                submitQuery();
            }
        });
    }
    
    // Demo: Simulate receiving a new response after 10 seconds
    setTimeout(simulateNewResponse, 10000);
});

// Optional: Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        instructorResponses,
        studentQueries,
        submitQuery,
        displayInstructorResponses,
        loadQueryHistory
    };
}