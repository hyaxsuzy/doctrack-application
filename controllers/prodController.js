const Product = require('../models/prodModel');
const factory = require('./handlerFactory');

exports.products = async (req, res, next) => {
  const newProds = await Product.create({
    bondlet: req.body.bondlet,
    bondleg: req.body.bondleg,
    bonda4: req.body.bonda4,
    bonda5: req.body.bonda5,
    glosa6: req.body.glosa6,
    glosa5: req.body.glosa5,
    gloslet: req.body.gloslet,
    glosa4: req.body.glosa4,
    lasa3: req.body.lasa3,
    lasa4: req.body.lasa4,
    lasa5: req.body.lasa5
  });

  res.status(201).json({
    status: 'success',
    data: {
      product: newProds
    }
  });
};

exports.updateProds = async (req, res, next) => {
  const updatedUser = await Product.findByIdAndUpdate(
    req.params.id,
    {
      bondlet: req.body.bondlet,
      bondleg: req.body.bondleg,
      bonda4: req.body.bonda4,
      bonda5: req.body.bonda5,
      glosa6: req.body.glosa6,
      glosa5: req.body.glosa5,
      gloslet: req.body.gloslet,
      glosa4: req.body.glosa4,
      lasa3: req.body.lasa3,
      lasa4: req.body.lasa4,
      lasa5: req.body.lasa5
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      product: updatedUser
    }
  });
};

exports.getAllProduct = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
