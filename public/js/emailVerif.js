/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const emailVerif = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/verify/${signToken}`
        });
        
        if (res.status === 200) {
            showAlert('success', 'Email verified!');
            window.setTimeout(() => {
                location.assign('/login');
            }, 1500);
        }
    } catch (err) { 
        console.log(err.response);
        showAlert('error', 'Verifying email failed! Try again.');
    }
}