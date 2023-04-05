
/**
 * @args Array - customerNode from WordPress graphQL API
 * @return Array - array of customers object
 *
 * This function taked customers array from WordPress GraphQL response
 *  and converst it into a array that can be inserted into mongodb
 */

const createCustomerArray = (customerNode = []) => {
    const customers = customerNode.map(customer => {
        const orders = customer.orders.nodes.map(order => ({
            woo_id: order.databaseId,
            order_number: order.orderNumber,
            date_placed: order.date,
            total: order.total,
            sub_total: order.subtotal,
        }));
        const newCustomer = {
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            billing: {
                first_name: customer.billing.firstName,
                last_name: customer.billing.lastName,
                phone_number: customer.billing.phone,
                address: customer.billing.address1,
                city: customer.billing.city,
                state: customer.billing.state,
                country: customer.billing.country,
                postal_code: customer.billing.postcode
            },
            shipping: {
                first_name: customer.shipping.firstName,
                last_name: customer.shipping.lastName,
                phone_number: customer.shipping.phone,
                address: customer.shipping.address1,
                city: customer.shipping.city,
                state: customer.shipping.state,
                country: customer.shipping.country,
                postal_code: customer.shipping.postcode
            },
            orders: orders,
            date_joined: customer.date
        };
        return newCustomer;
    });

    return customers;
}

module.exports = { createCustomerArray };