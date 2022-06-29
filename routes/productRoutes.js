const express = require('express');
const prodController = require('./../controllers/prodController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// router.post('/postStocks', prodController.postProducts);
// router.patch('/updateAllProds', prodController.updateProds);

// router.patch('/updateAllProds', prodController.updateAllStats);

router
  .route('/')
  .get(prodController.getAllProducts)
  .post(authController.restrictTo('admin'), prodController.createProduct)
  .patch(authController.restrictTo('admin'), prodController.updateAllProducts);

router
  .route('/:id')
  .get(prodController.getProduct)
  .patch(authController.restrictTo('admin'), prodController.updateProduct)
  .delete(authController.restrictTo('admin'), prodController.deleteProduct);

module.exports = router;
