const moment = require('moment');
const File = require('../models/fileModel');
const Proof = require('../models/proofModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const api = require('../utils/api');

exports.getOverview = catchAsync(async (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-fIwqnIo+yWEvO7X5/2byYLcY7HNhQRc5589WPlxIRAk=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('wc');
});

exports.getFiles = catchAsync(async (req, res, next) => {
  // const file = await File.findById(req.params.id);
  const files = await File.find();
  const userfiles = await File.find({ user: req.user._id });

  // if (!files) return next();
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.cloudflare.com https://*.fontawesome.com https://*.googleapis.com 'unsafe-inline' 'unsafe-eval';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';"
    )
    .render('files', {
      route: 'DOCUMENTS',
      // file,
      files,
      userfiles,
      moment: moment
    });
});

// exports.getAllFiles = catchAsync(async (req, res) => {
//   const files = await File.find();
//   res
//     .status(200)
//     .set(
//       'Content-Security-Policy',
//       "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-0XdFfytbL1xDomHYzFdvDONhuGRRWt8KqBoc8UE5RQI=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
//     )
//     .render('files', {
//       route: 'DOCUMENTS',
//       files
//     });
// });

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com https://kit.fontawesome.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('login');
};

exports.getLoginForm1 = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.cloudflare.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com https://kit.fontawesome.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('login1');
};

exports.getRegisterForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.cloudflare.com https://*.fontawesome.com 'unsafe-inline' 'unsafe-eval';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';"
    )
    .render('register');
};

exports.getAuthentic = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('authen2');
};

exports.getPrices = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('prices', {
      route: 'PRINT GUIDE'
    });
};

exports.getUserProf = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('user-prof', {
      route: 'USER PROFILE'
    });
};

exports.getError = (req, res) => {
  res.status(200).render('error');
};

exports.getAbout = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('about', {
      route: 'DOCTRACK'
    });
};

exports.getAbout1 = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('about1');
};

exports.getTermsNCondi = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('termsncondi', {
      route: 'DOCTRACK'
    });
};

exports.getTermsNCondi1 = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'sha256-0XdFfytbL1xDomHYzFdvDONhuGRRWt8KqBoc8UE5RQI=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('termsncondi1');
};

exports.addPrintFiles = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('add-files', {
      route: 'UPLOAD FILE'
    });
};

exports.proofPayment = async (req, res) => {
  const file = await File.findById(req.params.id);
  const proof = await Proof.findById(req.params.id);
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'unsafe-inline' 'unsafe-eval' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('payment', {
      route: 'UPLOAD FILE',
      file,
      proof
    });
};

exports.getFileInfo = catchAsync(async (req, res) => {
  const file = await File.findById(req.params.id);
  const proof = await Proof.findById(req.params.id);
  const proofs = await Proof.find({user: req.user._id});
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('file-info', {
      route: 'RECEIPT',
      file,
      proof,
      proofs,
      moment: moment
    });
});

exports.getFileInfo1 = catchAsync(async (req, res) => {
  const file = await File.findById(req.params.id);
  const proof = await Proof.findById(req.params.id);
  const proofs = await Proof.find({user: req.user._id});

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'self' blob: 'unsafe-inline' ;style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('file-info1', {
      route: 'RECEIPT',
      file,
      proof,
      proofs,
      moment: moment
    });
});

exports.getSettings = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('settings', {
      route: 'DOCTRACK'
    });
};

exports.getForgotPw = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'unsafe-inline' 'self' blob: ;style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('forgotpw');
};

exports.resetPassword = async (req, res) => {
  // const resetToken = req.params.token;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'unsafe-inline' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('resetPw');
};

exports.getInvoice = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://kit.fontawesome.com 'sha256-0XdFfytbL1xDomHYzFdvDONhuGRRWt8KqBoc8UE5RQI=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('invoice');
};

exports.getVerif = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://*.jsdelivr.net https://*.fontawesome.com 'unsafe-inline' 'unsafe-eval';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';"
    )
    .render('email-verif', {
      route: 'DOCTRACK'
    });
};

exports.getVerif1 = async (req, res) => {
  await api.get(`/users/verify/${req.params.token}`);

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://*.jsdelivr.net https://*.fontawesome.com 'unsafe-inline' 'unsafe-eval';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';"
    )
    .render('email-verif1', {
      route: 'DOCTRACK'
    });
};

exports.getDash = catchAsync(async (req, res) => {
  const numUsers = await User.countDocuments();
  const numFiles = await File.countDocuments();
  const placed = await File.countDocuments({ status: 'Placed' });
  const completed = await File.countDocuments({ status: 'Completed' });
  const rejected = await File.countDocuments({ status: 'Rejected' });
  const users = await User.find();
  const file = await File.findById(req.params.id);
  const files = await File.find();
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://*.jsdelivr.net https://*.fontawesome.com https://*.googleapis.com 'unsafe-inline' 'unsafe-eval';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';"
    )
    .render('dash', {
      route: 'DASHBOARD',
      numUsers,
      numFiles,
      placed,
      completed,
      rejected,
      users,
      file,
      files,
      moment: moment
    });
});

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('getUsers', {
      route: 'USERS',
      users
    });
});

exports.getProd = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('products', {
      route: 'PRODUCTS'
    });
};

exports.getStats = catchAsync(async (req, res) => {
  const numFiles = await File.countDocuments();
  const completed = await File.countDocuments({ status: 'Completed' });
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('statistics', {
      route: 'STATISTICS',
      numFiles,
      completed
    });
});

exports.getRep = catchAsync(async (req, res) => {
  const file = await File.findById(req.params.id);
  const files = await File.find();
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.jsdelivr.net https://unpkg.com https://*.fontawesome.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdn.jsdelivr.net https://unpkg.com https://kit.fontawesome.com 'sha256-ummjbBUujetdVg7wfra/doxXnMc8b/VJ2oLMkHn6Vs0=' 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('rep', {
      route: 'REPORT',
      file,
      files,
      moment: moment
    });
});
