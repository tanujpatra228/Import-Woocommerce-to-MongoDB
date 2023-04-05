const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({
    // ID of the user who placed the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    // WooCommerce ID
    woo_id: {
        type: Number
    },
    // Array of items in the order
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true,
            },
            qty: {
                type: Number,
                require: true,
            },
            // Price of the product at the time of purchase
            price: {
                type: Number,
                require: true,
            },
        }
    ],
    // Total price of the order
    total: {
        type: Number,
        require: true,
    },
    // Status of the order
    status: {
        type: String,
        required: true,
        enum: ['PLACED', 'SHIPPED', 'DELIVERED']
    },
    shipping_address: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postal_code: { type: String, required: true }
    },
    // Payment information for the order
    payment_info: {
        mode: {
            type: String,
            enum: ['COD', 'NET_BANKING', 'CARD', 'WALLET', 'EMI', 'UPI']
        },
        // :INFO Need to discuss
    },
    // Date and time the order was placed
    date_placed: {
        type: Date,
        required: true,
        default: Date.now
    },
    // Date and time the order was shipped (if applicable)
    date_shipped: {
        type: Date
    },
    // Date and time the order was delivered (if applicable)
    date_delivered: {
        type: Date
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;