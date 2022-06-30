/* eslint-disable */
import axios from 'axios';

export const getProducts = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/products'
    });

    return res;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
