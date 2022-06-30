const ctx = document.getElementById('prodChart').getContext('2d');
const prodChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Plain Bond Paper', 'Glossy Paper', 'Laser Paper'],
    datasets: [
      {
        label: 'products',
        data: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
        backgroundColor: 'rgb(153, 19, 19)',
        borderColor: 'rgb(143, 15, 15)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
