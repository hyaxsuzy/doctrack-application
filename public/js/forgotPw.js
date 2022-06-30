/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const forgotPw = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `Sent to your email!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
