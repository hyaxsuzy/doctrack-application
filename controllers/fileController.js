const multer = require('multer');
// const download = require('download');
// const http = require('http'); // or 'https' for https:// URLs
// const fs = require('fs');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const File = require('./../models/fileModel');
const factory = require('./handlerFactory');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `files/users-${file.fieldname}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Not a PDF! Please upload only pdf file.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserFile = upload.single('file');

exports.uploadFile = catchAsync(async (req, res, next) => {
  const newFile = await File.create({
    user: req.user._id,
    // proof: req.proof._id,
    namefile: req.body.namefile,
    file: req.file.filename,
    note: req.body.note,
    type: req.body.type,
    size: req.body.size,
    side: req.body.side,
    pages: req.body.pages,
    copies: req.body.copies,
    pickup: req.body.pickup,
    orientation: req.body.orientation,
    color: req.body.color,
    totalPrice: req.body.totalPrice,
    status: req.body.status
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: newFile
    }
  });
});

exports.getDownload = async (req, res, next) => {
  const file = await File.findById(req.params.id);
  res.download(`public/${file.file}`, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Download complete');
    }
  });

  // const fileStream = fs.createWriteStream('doctrack-file.pdf');
  // const request = http.get(`http://127.0.0.1:3000/${file.file}`, function(
  //   response
  // ) {
  //   response.pipe(fileStream);

  //   // after download completed close filestream
  //   fileStream.on('finish', () => {
  //     console.log('Download Completed');
  //     res.set(`Content-Type`, `application/octet-stream`);
  //     res.set(
  //       `Content-Disposition`,
  //       `attachment; filename="doctrack-file.pdf"`
  //     );
  //     res.send();
  //     fileStream.close();
  //   });
  // });

  // res.status(200).json({
  //   status: 'success'
  // });
};

// exports.getDownload = async (req, res, next) => {
//   const file = req.query.file;
//   console.log(req.body.file);
// }

exports.updateStats = async (req, res, next) => {
  const updatedStats = await File.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      file: updatedStats
    }
  });
};

exports.updateAllStats = async (req, res, next) => {
  const files = await File.find();

  files.forEach(async (file, index) => {
    file.status = req.body.statusArray[index];
    file.stats = req.body.statsArray[index];
    await file.save({ validateBeforeSave: false });
  });

  // const updatedStats = await File.findByIdAndUpdate(
  //   req.params.id,
  //   { status: req.body.status },
  //   {
  //     new: true,
  //     runValidators: true
  //   }
  // );

  res.status(200).json({
    status: 'success',
    data: {
      files
    }
  });
};

// exports.getUserFile = (req, res, next) => {
//   req.params.id = req.file.id;
//   next();
// };

exports.getAllFiles = factory.getAll(File);
exports.getFile = factory.getOne(File);
exports.createFile = factory.createOne(File);
exports.updateFile = factory.updateOne(File);
exports.deleteFile = factory.deleteOne(File);
