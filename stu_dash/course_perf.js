// performance.js

document.addEventListener('DOMContentLoaded', () => {
    const ctxPerformance = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctxPerformance, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Grade Trend',
          data: [75, 80, 85, 82, 88, 90],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    const ctxAssignment = document.getElementById('assignmentChart').getContext('2d');
    const assignmentChart = new Chart(ctxAssignment, {
      type: 'bar',
      data: {
        labels: ['Assignment 1', 'Assignment 2'],
        datasets: [{
          label: 'Scores',
          data: [90, 80],
          backgroundColor: ['#4caf50', '#ff9800'],
          borderColor: ['#388e3c', '#f57c00'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
  /*  const ctxQuiz = document.getElementById('quizChart').getContext('2d');
    const quizChart = new Chart(ctxQuiz, {
      type: 'pie',
      data: {
        labels: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
        datasets: [{
          label: 'Quiz Scores',
          data: [85, 78, 90],
          backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });*/
  });
  