// weekly_charts.js

// Weekly data for different weeks in minutes (example data for 3 weeks)
const weeklyProgressData = {
    current: [120, 180, 150, 200, 90, 160, 140], // Current week data
    week1: [100, 140, 120, 180, 110, 130, 100],  // Week 1 data
    week2: [110, 160, 130, 170, 80, 140, 90],   // Week 2 data
    week3: [90, 150, 120, 140, 100, 110, 80]    // Week 3 data
};

let selectedWeek = 'current'; // Default to current week
let progressChart = null;

// Function to calculate average and update the chart
function updateWeeklyProgress() {
    // Get selected week
    selectedWeek = document.getElementById('weekSelection').value;

    // Get data for selected week
    const data = weeklyProgressData[selectedWeek];

    // Calculate the average time spent for the selected week
    const totalMinutes = data.reduce((a, b) => a + b, 0);
    const averageMinutes = totalMinutes / data.length;

    // Update the average time display
    document.getElementById('averageTime').innerText = `Average Time Spent: ${Math.round(averageMinutes)} minutes`;

    // Update the chart with the selected week's data
    if (progressChart) {
        progressChart.data.datasets[0].data = data;
        progressChart.update();
    }
}

// Initialize chart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressChart();
});

// Function to initialize the progress chart
function initializeProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Minutes Worked',
                data: weeklyProgressData[selectedWeek], // Use current week data initially
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 240, // Set the maximum value to 240 minutes
                    ticks: {
                        stepSize: 30, // Step size of 30 minutes
                        color: '#b49018'
                    }
                },
                x: {
                    ticks: {
                        color: '#b49018'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#b49018'
                    }
                }
            }
        }
    });

    // Update chart when page loads
    updateWeeklyProgress();
}

// Optional: Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        weeklyProgressData,
        updateWeeklyProgress,
        initializeProgressChart
    };
}