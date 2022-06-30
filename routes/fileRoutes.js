const express = require('express');
const fileController = require('./../controllers/fileController');
const authController = require('./../controllers/authController');

const router = express.Router();

// protect all routes after this middleware
router.use(authController.protect);

router.post(
  '/uploadFile',
  fileController.uploadUserFile,
  fileController.uploadFile
);

router.patch('/updateStats/:id', fileController.updateStats);
router.patch('/updateAllStats', fileController.updateAllStats);

router.get(
  '/download/:id',
  authController.restrictTo('admin'),
  fileController.getDownload
);

router
  .route('/')
  .get(authController.restrictTo('admin'), fileController.getAllFiles)
  .post(authController.protect, fileController.createFile);

router
  .route('/:id')
  .get(fileController.getFile)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    fileController.updateFile
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    fileController.deleteFile
  );
// router.post('/uploadFile')

module.exports = router;
