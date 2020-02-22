var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const ProductSchema = Schema({
    productName: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }

});

module.exports = mongoose.model('Product', ProductSchema);