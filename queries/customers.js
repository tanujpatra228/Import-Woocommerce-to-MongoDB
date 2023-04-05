const CUSTOMER_IMPORT_QUERY = `
    query {
        customers {
            nodes {
                id
                username
                email
                displayName
                firstName
                lastName
                billing {
                    firstName
                    lastName
                    address1
                    address2
                    city
                    state
                    postcode
                    country
                    phone
                }
                shipping {
                    firstName
                    lastName
                    address1
                    address2
                    city
                    state
                    postcode
                    country
                    phone
                }
                orders {
                    nodes {
                        databaseId
                        orderNumber
                        date
                        total(format: RAW)
                        subtotal(format: RAW)
                    }
                }
                date
            }
        }
    }
`;

module.exports = { CUSTOMER_IMPORT_QUERY }