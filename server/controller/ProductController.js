const Product = require('../mongoDB/models/product');

module.exports = {
  async create(req, res) {
    try {
      await Product.insertMany([req.body]);
      res.send({
        error: false,
        message: `Product added succesfully`
      });
    } catch (err) {
      res.status(500).send({
        error: true,
        message: "Error has occured trying to add new product"
      });
    }
    finally {
      // TODO:
    }
  },
  async getProducts(req, res) {
    try {
      let query = {}
      const products = await Product.find(query);
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "Error has occured trying to fetch the products"
      });
    }
    finally {
      //TODO:
    }
  },
  async deleteProduct(req, res) {
    try {
      let query = { _id: req.params.prodId };
      const product = await Product.deleteOne(query);
      res.send(product);
    } catch (err) {
      res.status(500).send({
        error: "Error has occured trying to fetch the products"
      });
    }
    finally {
      //TODO:
    }
  },
}