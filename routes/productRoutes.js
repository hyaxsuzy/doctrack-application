const express = require('express');
const prodController = require('./../controllers/prodController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/postStocks', prodController.postProducts);
// router.patch('/updateAllProds', prodController.updateProds);

// router.patch('/updateAllProds', prodController.updateAllStats);

router
  .route('/')
  .get(authController.restrictTo('admin'), prodController.getAllProducts)
  .post(authController.protect, prodController.createProduct);

router
  .route('/:id')
  .get(prodController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    prodController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    prodController.deleteProduct
  );

module.exports = router;
