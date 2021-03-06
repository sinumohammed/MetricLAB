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
    app.delete('/api/deleteProduct/:prodId',
        //isAuthenticated,
        ProductController.deleteProduct)

    // routes to postgress user tble
    app.post('/api/user',
        UserController.create);
    app.get('/api/users',
        UserController.getUsers);
    app.get('/api/users/:userId',
        UserController.getUserById);
    app.post('/api/login',
        UserController.login);
    app.post('/api/register',
        UserController.create);

    //suggestion
    app.post('/api/suggestion',
        SuggestionController.create);
    app.get('/api/getUserWithSuggestions/:userId',
        SuggestionController.getUserWithSuggestions);
    app.get('/api/getSuggestions/:userId',
        SuggestionController.getSuggestions);
}