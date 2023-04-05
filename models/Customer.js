const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    billing: {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        postal_code: {
            type: String,
        },
    },
    shipping: {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        postal_code: {
            type: String,
        },
    },
    orders: [
        {
            order_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
                // required: true
            },
            woo_id: {
                type: Number
            },
            order_number: {
                type: String,
            },
            date_placed: {
                type: Date,
                required: true
            },
            // Total price of the order
            total: {
                type: Number,
                required: true
            },
            // Price of the order after discount
            sub_total: {
                type: Number,
                required: true
            }
        }
    ],
    date_joined: {
        type: Date,
        default: Date.now
    },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
