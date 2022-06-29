/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { updateSettings } from './updateSettings';
import { register } from './register';
import { deleteAcc } from './deleteAcc';
import { uploadFile } from './uploadFile';
import { forgotPw } from './forgotPw';
import { resetPw } from './resetPw';
import { emailVerif } from './emailVerif';
import { orderStatus } from './status';
import { download } from './dl';
import { uploadProof } from './payment';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
// const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const registerForm = document.querySelector('.form--register');
const deleteBtn = document.querySelector('.delete--acc');
const uploadFileForm = document.querySelector('.form-file-data');
const forgotPwBtn = document.querySelector('.forgot--pass');
const resetPwBtn = document.querySelector('.reset--pass');
const verifyBtn = document.querySelector('.verify--email');
const orderStatsForm = document.querySelector('.order--stats');
const downloadBtn = document.querySelector('.dl--btn');
const uploadProofBtn = document.querySelector('.upload--btn');

// DELEGATION
if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

// if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('contact', document.getElementById('contact').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'User');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'Password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    register(name, contact, email, password, passwordConfirm);
  });
}

if (deleteBtn) deleteBtn.addEventListener('click', deleteAcc);

if (verifyBtn) verifyBtn.addEventListener('click', emailVerif);

if (downloadBtn) downloadBtn.addEventListener('click', download);

// if (downloadBtn)
//   downloadBtn.addEventListener('submit', e => {
//     e.preventDefault();
//     const file = document.getElementById('file').files[0];
//     download(file);
//   });

if (uploadFileForm)
  uploadFileForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('namefile', document.getElementById('namefile').value);
    form.append('file', document.getElementById('file').files[0]);
    form.append('note', document.getElementById('note').value);
    form.append('type', document.getElementById('type').value);
    form.append('size', document.getElementById('size').value);
    form.append('side', document.getElementById('side').value);
    form.append('pages', document.getElementById('pages').value);
    form.append('copies', document.getElementById('copies').value);
    form.append('pickup', document.getElementById('pickup').value);
    form.append('orientation', document.getElementById('orientation').value);
    form.append('color', document.getElementById('color').value);
    // form.append('status', document.getElementById('status').value);
    uploadFile(form, 'datafile');
  });

if (uploadProofBtn)
  uploadProofBtn.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('payment', document.getElementById('payment').files[0]);
    form.append('paymode', document.getElementById('paymode').value);
    uploadProof(form, 'ecash');
  });

if (forgotPwBtn)
  forgotPwBtn.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPw(email);
  });

if (resetPwBtn)
  resetPwBtn.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    resetPw(password, passwordConfirm);
  });

if (orderStatsForm)
  orderStatsForm.addEventListener('submit', e => {
    e.preventDefault();
    let statusArray = [];
    let index = 0;
    while (true) {
      const status = document.getElementById(`status${index}`);
      if (!status) break;
      statusArray = [...statusArray, status.value];
      index++;
    }
    orderStatus(statusArray);
  });

// // togglePassword
// if (togglePassword) {
//   togglePassword.addEventListener('click', function(e) {
//     const type =
//       password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     this.classList.toggle('fa-eye-slash');
//   });
// }

// // togglePassword
// if (togglePasswordConfirm) {
//   togglePasswordConfirm.addEventListener('click', function(e) {
//     const type =
//       passwordConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordConfirm.setAttribute('type', type);
//     this.classList.toggle('fa-eye-slash');
//   });
// }
