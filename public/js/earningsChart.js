/*eslint-disable*/
// not used
const chart = document.getElementById('earnedChart').getContext('2d');
const earnedChart = new Chart(chart, {
  type: 'line',
  data: {
    labels: [
      '7AM',
      '8AM',
      '9AM',
      '10AM',
      '11AM',
      '12AM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
      '6PM',
      '7PM',
      '8PM'
    ],
    datasets: [
      {
        label: 'earnings',
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
