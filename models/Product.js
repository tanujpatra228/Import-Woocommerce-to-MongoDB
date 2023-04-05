const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String },
    onSale: { type: Boolean, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    sku: { type: String },
    status: { type: String },
});

const groupedProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String },
    onSale: { type: Boolean, required: true },
    type: { type: String, required: true },
    products: [{
        price: { type: Number, required: true },
        salePrice: { type: Number },
        sku: { type: String },
        status: { type: String },
    }]
});

const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    sku: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    onSale: { type: Boolean, required: true },
    type: { type: String, required: true, enum: ['SIMPLE', 'GROUPED', 'EXTERNAL', 'VARIABLE'] },
    status: { type: String },
    products: [productSchema, groupedProductSchema]
    // products: { type: Array }
});

const Products = mongoose.model('Product', ProductsSchema);

module.exports = Products;
