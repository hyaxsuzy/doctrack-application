/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const uploadProof = async (ecash) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/proofs/uploadProof',
      data: ecash
    });

    if (res.data.status === 'success') {
      showAlert('success', 'File uploaded successfully!');
        window.setTimeout(() => {
          location.assign('/documents');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};