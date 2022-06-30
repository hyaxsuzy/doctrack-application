const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/error', viewsController.getError);

router.get(
  '/documents',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getFiles
);
router.get(
  '/add-files',
  authController.isLoggedIn,
  authController.protect,
  viewsController.addPrintFiles
);
router.get(
  '/payment-proof/:id',
  authController.isLoggedIn,
  authController.protect,
  viewsController.proofPayment
);
router.get(
  '/file-info/:id',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getFileInfo
);
router.get(
  '/file-info1/:id',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getFileInfo1
);
router.get(
  '/viewproof/:id',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getViewproof
);
// router.get('/order/:id/file/:fileId', viewsController.getFileInfo);
router.get(
  '/invoice',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getInvoice
);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/login1', authController.isLoggedIn, viewsController.getLoginForm1);
router.get('/logout', authController.isLoggedIn, authController.logout);
router.get(
  '/register',
  authController.isLoggedIn,
  viewsController.getRegisterForm
);

router.get('/authentication', viewsController.getAuthentic);
router.get('/verification', viewsController.getVerif);
router.get('/verification1/:token', viewsController.getVerif1);

router.get(
  '/user-profile',
  authController.protect,
  viewsController.getUserProf
);

router.get('/forgot-password', viewsController.getForgotPw);
router.get('/reset-password/:token', viewsController.resetPassword);

router.get(
  '/settings',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getSettings
);
router.get(
  '/prices',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getPrices
);
router.get('/about1', viewsController.getAbout1);
router.get(
  '/about',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getAbout
);
router.get(
  '/terms&condition',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getTermsNCondi
);
router.get('/terms&condition1', viewsController.getTermsNCondi1);

router.get(
  '/dashboard',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getDash
);
router.get(
  '/all-users',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getUsers
);
router.get(
  '/products',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getProd
);
router.get(
  '/stats',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getStats
);

router.get(
  '/rep',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getRep
);

module.exports = router;
