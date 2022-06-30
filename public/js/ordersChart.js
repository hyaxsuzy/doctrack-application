/*eslint-disable*/
const pending = parseInt(document.getElementById('numPending').textContent);
const rejected = parseInt(document.getElementById('numRejected').textContent);
const completed = parseInt(document.getElementById('numCompleted').textContent);

const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Completed', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'orders',
        data: [completed, pending, rejected],
        // data: [file.status, file.status, file.status],
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
