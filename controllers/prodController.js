const Product = require('../models/prodModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.updateAllProducts = catchAsync(async (req, res, next) => {
  const { plainArray, glossyArray, laserArray } = req.body;
  const products = await Product.find();
  const plainPapers = products.filter(product => product.type === 'plain');
  const glossyPapers = products.filter(product => product.type === 'glossy');
  const laserPapers = products.filter(product => product.type === 'laser');

  plainPapers.forEach(async (product, index) => {
    product.price = plainArray[index].price;
    product.additional = plainArray[index].additional;
    product.stocks = plainArray[index].stocks;

    await product.save();
  });

  glossyPapers.forEach(async (product, index) => {
    product.price = glossyArray[index].price;
    product.additional = glossyArray[index].additional;
    product.stocks = glossyArray[index].stocks;

    await product.save();
  });

  laserPapers.forEach(async (product, index) => {
    product.price = laserArray[index].price;
    product.additional = laserArray[index].additional;
    product.stocks = laserArray[index].stocks;

    await product.save();
  });

  const updatedProducts = [...plainPapers, ...glossyPapers, ...laserPapers];

  res.status(200).json({
    status: 'success',
    data: {
      products: updatedProducts
    }
  });
});

// exports.updateProds = async (req, res, next) => {
//   const updatedUser = await Product.findByIdAndUpdate(
//     req.params.id,
//     {
//       bondlet: req.body.bondlet,
//       bondleg: req.body.bondleg,
//       bonda4: req.body.bonda4,
//       bonda5: req.body.bonda5,
//       glosa6: req.body.glosa6,
//       glosa5: req.body.glosa5,
//       gloslet: req.body.gloslet,
//       glosa4: req.body.glosa4,
//       lasa3: req.body.lasa3,
//       lasa4: req.body.lasa4,
//       lasa5: req.body.lasa5
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );

//   res.status(200).json({
//     status: 'success',
//     data: {
//       product: updatedUser
//     }
//   });
// };

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
