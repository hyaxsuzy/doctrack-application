/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const register = async (name, contact, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name, 
                contact, 
                email, 
                password,
                passwordConfirm
            }
        });
        
        if (res.data.status === 'success') {
            showAlert('success', 'Please verify the email sent to your account');
            window.setTimeout(() => {
                location.assign('/verification');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};
