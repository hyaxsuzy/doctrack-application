/* eslint-disable */
const ctx = document.getElementById('prodChart').getContext('2d');
const typeArray = JSON.parse(
  document.getElementById('prodChart').dataset.typearray
);
const plain = typeArray.find(el => el.name === 'Plain Paper');
const glossy = typeArray.find(el => el.name === 'Glossy Paper');
const laser = typeArray.find(el => el.name === 'Laser Paper');

const prodChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Plain Bond Paper', 'Glossy Paper', 'Laser Paper'],
    datasets: [
      {
        label: 'products',
        data: [plain.value, glossy.value, laser.value],
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
