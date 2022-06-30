const express = require('express');
const payController = require('./../controllers/payController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post(
  '/uploadProof/:id',
  payController.proofPhoto,
  payController.resizeProofPhoto,
  payController.proofPay,
  payController.getProof
);

router
  .route('/')
  .get(authController.restrictTo('admin'), payController.getAllProofs)
  .post(authController.protect, payController.createProof);

router
  .route('/:id')
  .get(payController.getProof)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    payController.updateProof
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    payController.deleteProof
  );

module.exports = router;
