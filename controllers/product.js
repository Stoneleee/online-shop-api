const Model = require('../model');
const { Product } = Model;

const productController = {
  all(req, res) {
    Product
      .find({})
      .populate('manufacturer')
      .exec((err, products) => res.json(products));
  },

  byId(req, res) {
    const idParams = req.params.id;

    Product
      .findOne({ _id: idParams })
      .populate('manufacturer')
      .exec((err, product) => res.json(product));
  },

  create(req, res) {
    const requestBody = req.body;
    const newProduct = new Product(requestBody);

    newProduct.save((err, saved) => {
      Product
        .findOne({ _id: newProduct._id })
        .populate('manufacturer')
        .exec((err, product) => res.json(product));
    })
  },

  update(req, res) {
    const idParams = req.params.id;
    const product = req.body;

    Product.updateOne({ _id: idParams }, { ...product }, (err, updated) => {
      Product
        .findOne({ _id: product._id })
        .populate('manufacturer')
        .exec((err, product) => res.json(product));
    });
  },

  remove(req, res) {
    const idParams = req.params.id;

    Product
      .findOne({ _id: idParams })
      .remove((err, reomved) => res.json(idParams));
  }
}

module.exports = productController;
