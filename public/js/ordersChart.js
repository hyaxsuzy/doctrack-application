const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Completed', 'Pending', 'Rejected'],
        datasets: [{
            label: 'orders',
            data: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
            backgroundColor: 'rgb(153, 19, 19)',
            borderColor:'rgb(143, 15, 15)',
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