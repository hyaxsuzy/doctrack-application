/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const deleteAcc = async () => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: '/api/v1/users/deleteMe'
        });
        
        if (res.status === 204) {
            showAlert('success', 'Account deleted successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) { 
        console.log(err.response);
        showAlert('error', 'Error deleting account! Try again.');
    }
}