// /* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';

// export const updateProd = async (bondlet, bondleg, bonda4, bonda5, glosa6, glosa5, gloslet, glosa4, lasa3, lasa4, lasa5) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: '/api/v1/products/updateAllProds',
//       data: {
//           bondlet,
//           bondleg,
//           bonda4,
//           bonda5,
//           glosa6,
//           glosa5,
//           gloslet,
//           glosa4,
//           lasa3,
//           lasa4,
//           lasa5
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Updated product stocks!');
//       window.setTimeout(() => {
//         location.reload();
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
