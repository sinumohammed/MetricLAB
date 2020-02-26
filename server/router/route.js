const ProductController = require('../controller/ProductController');
const UserController = require('../controller/UserController');
const SuggestionController = require('../controller/SuggestionController');
const isAuthenticated = require('../policies/isAuthenticated');

module.exports = (app) => {
    // Routes to Mongo DB product collection
    app.post('/api/product',
        //isAuthenticated,
        ProductController.create)
    app.get('/api/products',
        //isAuthenticated,
        ProductController.getProducts)

    // routes to postgress user tble
    app.post('/api/user',
        UserController.create);
    app.get('/api/users',
        UserController.getUsers);
    app.post('/api/login',
        UserController.login);
    //suggestion
    app.post('/api/suggestion',
        SuggestionController.create);
}