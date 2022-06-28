/* eslint-disable */
import api from '../../utils/api';
import axios from 'axios';
import { showAlert } from './alerts';
// import fileDownload from 'js-file-download';

export const download = async () => {
  const fileId = location.pathname.split('/')[2];

  location.assign(`/api/v1/files/download/${fileId}`);
};

// export const download = async (file) => {
//     try {
//         const res = await axios({
//             method: 'GET',
//             // responseType: 'blob',
//             url: `/api/v1/files/download/${file._id}`
//         });

//         if (res.data.status === 200) {
//             console.log(res);
//             showAlert('success', 'Downloaded successfully!');
//             // fileDownload(req.file.filename)
//         }
//     } catch (err) {
//         console.log(err.response);
//         showAlert('error', 'Error downloading file! Try again.');
//     }
// }
