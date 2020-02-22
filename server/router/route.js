const ProductController = require('../controller/ProductController')
const isAuthenticated = require('../policies/isAuthenticated')
module.exports = (app) => {
    app.post('/api/product',
        //isAuthenticated,
        ProductController.product)
    app.get('/api/products',
        //isAuthenticated,
        ProductController.getProducts)
}