/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const orderStatus = async (statusArray, statsArray) => {
  try {
    // const filesRes = await axios({
    //   method: 'GET',
    //   url: '/api/v1/files'
    // });

    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/files/updateAllStats`,
      data: {
        statusArray,
        statsArray
      }
    });
    // const res = await axios({
    //   method: 'PATCH',
    //   url: `api/v1/files/updateStats/${file._id}`,
    //   data: {
    //     status
    //   }
    // });

    if (res.data.status === 'success') {
      showAlert('success', 'Updated orders successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
