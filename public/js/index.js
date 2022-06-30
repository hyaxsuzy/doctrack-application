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
import { updateProducts } from './updateProducts';
import { getProducts } from './getProducts';
// import { updateProd } from './products';

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
const prodForm = document.querySelector('.upd--prods');
const typeSelect = document.getElementById('type');
const sizeSelect = document.getElementById('size');
const sideSelect = document.getElementById('side');
const colorSelect = document.getElementById('color');
const filenameField = document.getElementById('namefile');
const copiesField = document.getElementById('copies');
const pagesField = document.getElementById('pages');

let previewImage, previewDefaultText, products, total;
uploadFileForm && getProducts().then(res => (products = res.data.data.data));

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
    form.append('totalPrice', total);
    // form.append('status', document.getElementById('status').value);
    uploadFile(form, 'datafile');
  });

if (uploadProofBtn)
  uploadProofBtn.addEventListener('submit', (e, values) => {
    e.preventDefault();
    const form = new FormData();
    form.append('payment', document.getElementById('inpFile').files[0]);
    form.append(
      'paymentMethod',
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

      if (!status) break;
      statusArray = [...statusArray, status.value];
      index++;
    }

    index = 0;

    while (true) {
      const stats = document.getElementById(`stats${index}`);

      if (!stats) break;
      statsArray = [...statsArray, stats.value];
      index++;
    }

    orderStatus(statusArray, statsArray);
  });

if (prodForm)
  prodForm.addEventListener('submit', e => {
    e.preventDefault();
    let plainArray = [];
    let glossyArray = [];
    let laserArray = [];

    let index = 0;
    while (true) {
      const price = document.getElementById(`plainPrice-${index}`);
      const additional = document.getElementById(`plainAdditional-${index}`);
      const stocks = document.getElementById(`plainStocks-${index}`);

      if (!price) break;

      plainArray = [
        ...plainArray,
        {
          price: price.value,
          additional: additional.value,
          stocks: stocks.value
        }
      ];

      index++;
    }

    index = 0;
    while (true) {
      const price = document.getElementById(`glossyPrice-${index}`);
      const additional = document.getElementById(`glossyAdditional-${index}`);
      const stocks = document.getElementById(`glossyStocks-${index}`);

      if (!price) break;

      glossyArray = [
        ...glossyArray,
        {
          price: price.value,
          additional: additional.value,
          stocks: stocks.value
        }
      ];

      index++;
    }

    index = 0;
    while (true) {
      const price = document.getElementById(`laserPrice-${index}`);
      const additional = document.getElementById(`laserAdditional-${index}`);
      const stocks = document.getElementById(`laserStocks-${index}`);

      if (!price) break;

      laserArray = [
        ...laserArray,
        {
          price: price.value,
          additional: additional.value,
          stocks: stocks.value
        }
      ];

      index++;
    }

    updateProducts(plainArray, glossyArray, laserArray);
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

if (typeSelect)
  typeSelect.addEventListener('change', e => {
    sizeSelect.innerHTML = '';
    const filtered = products.filter(
      product => product.type === typeSelect.value
    );

    const option = document.createElement('option');
    option.disabled = true;
    option.selected = true;
    sizeSelect.appendChild(option);

    filtered.forEach(product => {
      const option = document.createElement('option');
      option.text = product.name;
      option.value = product.name;
      sizeSelect.appendChild(option);
    });

    updatePrice();
  });
if (sizeSelect) sizeSelect.addEventListener('change', e => updatePrice());
if (colorSelect) colorSelect.addEventListener('change', e => updatePrice());

if (sideSelect)
  sideSelect.addEventListener('change', e => {
    const summarySide = document.getElementById('summarySide');
    summarySide.textContent =
      sideSelect.value === 'front' ? 'Front' : 'Front & Back';
  });

if (filenameField)
  filenameField.addEventListener('input', e => {
    const summaryFilename = document.getElementById('summaryFilename');
    summaryFilename.textContent = filenameField.value;
  });

if (copiesField)
  copiesField.addEventListener('input', e => {
    updatePrice();
    const summaryCopies = document.getElementById('summaryCopies');
    summaryCopies.textContent = `x${copiesField.value}`;
  });

if (pagesField)
  pagesField.addEventListener('input', e => {
    updatePrice();
    const summaryPages = document.getElementById('summaryPages');
    summaryPages.textContent = pagesField.value;
  });

const updatePrice = () => {
  const type = typeSelect.value;
  const size = sizeSelect.value;
  const color = colorSelect.value;
  const pages = pagesField.value;
  const copies = copiesField.value;

  const product = products.find(
    product => product.type === type && product.name === size
  );

  total = 0;
  let pricePerPage = 0;
  if (product) {
    pricePerPage =
      product.price + (color === 'colored' ? product.additional : 0);
    total = pricePerPage * pages * copies;
  }

  const summaryPrice = document.getElementById('summaryPrice');
  summaryPrice.textContent = `Php ${pricePerPage.toFixed(2)}`;
  const summaryTotal = document.getElementById('summaryTotal');
  summaryTotal.textContent = `Php ${total.toFixed(2)}`;
};
