// students_leaderboard.js

// Top 3 students data
const topThreeStudents = [
    {
        rank: 1,
        name: "Pravallika",
        score: "98 🏆",
        streak: "25 days 🔥",
        avatar: "https://img.freepik.com/free-vector/trophy_78370-345.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724716800&semt=ais_hybrid",
        position: "first"
    },
    {
        rank: 2,
        name: "Asha",
        score: "95 🏆",
        streak: "22 days 🔥",
        avatar: "https://thumb.ac-illust.com/09/09e235c1cbc5f5904ed4d323f0cc0186_t.jpeg",
        position: "second"
    },
    {
        rank: 3,
        name: "Manas",
        score: "94 🏆",
        streak: "23 days 🔥",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaaZUpm0WKLYvIyMJTKVOmOoOwSM3ccB8aQ&s",
        position: "third"
    }
];

// Remaining students data
const remainingStudents = [
    { rank: 4, name: "Prem", score: "231", streak: "21 days" },
    { rank: 5, name: "Janani", score: "210", streak: "20 days" },
    { rank: 5, name: "Preethi", score: "210", streak: "20 days" },
    { rank: 7, name: "Rithin", score: "210", streak: "20 days" },
    { rank: 8, name: "Surya", score: "178", streak: "18 days" },
    { rank: 9, name: "Riya", score: "156", streak: "16 days" },
    { rank: 10, name: "Krishna", score: "194", streak: "19 days" },
    { rank: 11, name: "Krupa", score: "146", streak: "15 days" },
    { rank: 12, name: "Leela", score: "167", streak: "17 days" },
    { rank: 13, name: "Lyra", score: "146", streak: "15 days" },
    { rank: 14, name: "Sunitha", score: "132", streak: "14 days" },
    { rank: 15, name: "Shyam", score: "119", streak: "13 days" },
    { rank: 16, name: "Sanjana", score: "106", streak: "12 days" },
    { rank: 17, name: "Ram", score: "119", streak: "13 days" },
    { rank: 18, name: "Sidhu", score: "178", streak: "18 days" },
    { rank: 19, name: "Charan", score: "86", streak: "11 days" },
    { rank: 20, name: "Harry", score: "85", streak: "10 days" },
    { rank: 21, name: "Vinay", score: "83", streak: "9 days" },
    { rank: 22, name: "Sirisha", score: "81", streak: "9 days" },
    { rank: 23, name: "Kartheek", score: "82", streak: "8 days" },
    { rank: 24, name: "Manikanta", score: "80", streak: "8 days" },
    { rank: 25, name: "Roshini", score: "77", streak: "7 days" },
    { rank: 26, name: "Meghana", score: "75", streak: "5 days" },
    { rank: 27, name: "Koushik", score: "74", streak: "6 days" },
    { rank: 28, name: "Sriram", score: "70", streak: "4 days" },
    { rank: 29, name: "Amrutha", score: "65", streak: "3 days" }
];

// Function to generate top 3 students podium
function generateTopThreeStudents() {
    const topThreeContainer = document.getElementById('top-three-container');
    
    if (!topThreeContainer) {
        console.error('Top three container not found');
        return;
    }
    
    // Clear existing content
    topThreeContainer.innerHTML = '';
    
    // Create podium container
    const podium = document.createElement('div');
    podium.className = 'podium';
    
    // Generate top 3 students in correct order (2nd, 1st, 3rd for podium layout)
    const podiumOrder = ['second', 'first', 'third'];
    
    podiumOrder.forEach(position => {
        const student = topThreeStudents.find(s => s.position === position);
        if (student) {
            const studentElement = document.createElement('div');
            studentElement.className = `student ${student.position}`;
            
            studentElement.innerHTML = `
                <img src="${student.avatar}" alt="Avatar" class="avatar">
                <div class="info">
                    <p class="name">${student.name}</p>
                    <p class="score">${student.score}</p>
                    <p class="streak">${student.streak}</p>
                </div>
            `;
            
            podium.appendChild(studentElement);
        }
    });
    
    topThreeContainer.appendChild(podium);
}

// Function to generate remaining students table
function generateRemainingStudents() {
    const remainingContainer = document.getElementById('remaining-students-container');
    
    if (!remainingContainer) {
        console.error('Remaining students container not found');
        return;
    }
    
    // Clear existing content
    remainingContainer.innerHTML = '';
    
    // Generate table rows for remaining students
    remainingStudents.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.rank}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.streak}</td>
        `;
        
        remainingContainer.appendChild(row);
    });
}

// Initialize leaderboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateTopThreeStudents();
    generateRemainingStudents();
});

// Optional: Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        topThreeStudents,
        remainingStudents,
        generateTopThreeStudents,
        generateRemainingStudents
    };
}