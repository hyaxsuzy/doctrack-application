const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./../utils/appError');
const Proof = require('./../models/proofModel');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.proofPhoto = upload.single('payment');

exports.resizeProofPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `file-${req.user._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/proofs/${req.file.filename}`);

  next();
};

exports.proofPay = async (req, res, next) => {
  const newUpload = await Proof.create({
    user: req.user._id,
    file: req.params.id,
    payment: req.file.filename,
    // gcash: req.body.gcash,
    // paymaya: req.body.paymaya,
    paymentMethod: req.body.paymentMethod
  });

  res.status(201).json({
    status: 'success',
    data: {
      proof: newUpload
    }
  });
};

exports.getProof = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getAllProofs = factory.getAll(Proof);
exports.getProof = factory.getOne(Proof);
exports.createProof = factory.createOne(Proof);
exports.updateProof = factory.updateOne(Proof);
exports.deleteProof = factory.deleteOne(Proof);
