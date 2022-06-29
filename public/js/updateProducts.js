/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateProducts = async (plainArray, glossyArray, laserArray) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/products`,
      data: {
        plainArray,
        glossyArray,
        laserArray
      }
    });

    if (res.data.status === 'success') {
      window.scrollTo(0, 0);
      showAlert('success', 'Updated successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
