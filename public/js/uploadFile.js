/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const uploadFile = async datafile => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/files/uploadFile',
      data: datafile
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Proceed to payment');
      window.setTimeout(() => {
        location.assign(`/payment-proof/${res.data.data.data._id}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
