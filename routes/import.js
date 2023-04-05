const router = require('express').Router();
const axios = require('axios');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const { createProductsArray } = require('../utils/productImportHelpers');
const { createCustomerArray } = require('../utils/customerImportHelpers');
const { PRODUCT_IMPORT_QUERY } = require('../queries/products');
const { CUSTOMER_IMPORT_QUERY } = require('../queries/customers');
const { ORDER_IMPORT_QUERY } = require('../queries/orders');

router.get('/products', async (req, res) => {
    // Get Data from WooCommerce
    axios.post(process.env.WOO_BASE_URI, {
        query: PRODUCT_IMPORT_QUERY
    }).then(response => {
        // Create new Product objects from fetched data and insert into MongoDB
        const productsToInsert = createProductsArray(response.data.data.products.nodes);
        Product.insertMany(productsToInsert)
            .then((result) => {
                res.status(200).send({ count: productsToInsert.length, products: result });
            })
            .catch((err) => {
                res.status(200).send({ error: err.message });
                console.log('err', err.message);
            });
    }).catch(err => {
        res.status(500).send({ error: err.message });
    });
});


router.get('/customers', async (req, res) => {
    axios.post(process.env.WOO_BASE_URI, {
        query: CUSTOMER_IMPORT_QUERY
    }, {
        headers: {
            'Authorization': `Basic ${btoa(process.env.WOO_APP_ADMIN_PASS)}`
        }
    }).then((response) => {
        // Create new Customer objects from fetched data and insert into MongoDB
        const newCustomers = createCustomerArray(response.data.data.customers.nodes);
        res.status(200).send({ count: newCustomers.length, newCustomers: newCustomers });
        if (newCustomers.length) {
            Customer.insertMany(newCustomers)
                .then((result) => {
                    res.status(200).send({ count: newCustomers.length, newCustomers: newCustomers, customers: result });
                })
                .catch((err) => {
                    res.status(200).send({ error: err.message });
                });
        }
    }).catch(err => {
        res.status(500).send({ error: err.message });
    });
});

router.get('/orders', async (req, res) => {
    axios.post(process.env.WOO_BASE_URI, {
        query: ORDER_IMPORT_QUERY
    }, {
        headers: {
            'Authorization': `Basic ${btoa(process.env.WOO_APP_ADMIN_PASS)}`
        }
    }).then((response) => {
        res.status(200).send({ response: response });
    }).catch(err => {
        res.status(500).send({ error: err.message });
    });
});

module.exports = router;