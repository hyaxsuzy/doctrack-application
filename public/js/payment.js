/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const uploadProof = async ecash => {
  const fileId = location.pathname.split('/')[2];
  console.log(fileId);
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/proofs/uploadProof/${fileId}`,
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
