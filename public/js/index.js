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
import { updateProd } from './products';

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
const inpFile = document.getElementById('inpFile');
const previewContainer = document.getElementById('imagePreview');
const prodForm = document.getElementById('.upd--prods');

let previewImage, previewDefaultText;

if (previewContainer) {
  previewImage = previewContainer.querySelector('.image-preview__image');
  previewDefaultText = previewContainer.querySelector(
    '.image-preview__default-text'
  ); // DELEGATION
}

if (inpFile) {
  inpFile.addEventListener('change', function() {
    var file = this.files[0];

    if (file) {
      var reader = new FileReader();
      previewDefaultText.style.display = 'none';
      previewImage.style.display = 'block';
      reader.addEventListener('load', function() {
        previewImage.setAttribute('src', this.result);
      });
      reader.readAsDataURL(file);
    } else {
      previewDefaultText.style.display = null;
      previewImage.style.display = null;
      previewImage.setAttribute('src', '');
    }
  });
}

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
  uploadProofBtn.addEventListener('submit', (e, values) => {
    e.preventDefault();
    const form = new FormData();
    form.append('payment', document.getElementById('inpFile').files[0]);
    form.append(
      'paymode',
      document.querySelector('input[name="paymentmethod"]:checked').value
    );
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
    let statsArray = [];
    let index = 0;
    while (true) {
      const status = document.getElementById(`status${index}`);
      const stats = document.getElementById(`stats${index}`);
      if (!status) break;
      statusArray = [...statusArray, status.value];
      index++;

      if (!stats) break;
      statsArray = [...statsArray, stats.value];
      index++;
    }
    orderStatus(statusArray, statsArray);
  });

if (prodForm)
prodForm.addEventListener('submit', e => {
  e.preventDefault();
  const bondlet = document.getElementById('bondlet').value;
  const bondleg = document.getElementById('bondleg').value;
  const bonda4 = document.getElementById('bonda4').value;
  const bonda5 = document.getElementById('bonda5').value;
  const glosa6 = document.getElementById('glosa6').value;
  const glosa5 = document.getElementById('glosa5').value;
  const gloslet = document.getElementById('gloslet').value;
  const glosa4 = document.getElementById('glosa4').value;
  const lasa3 = document.getElementById('lasa3').value;
  const lasa4 = document.getElementById('lasa4').value;
  const lasa5 = document.getElementById('lasa5').value;
  updateProd(bondlet, bondleg, bonda4, bonda5, glosa6, glosa5, gloslet, glosa4, lasa3, lasa4, lasa5);
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
