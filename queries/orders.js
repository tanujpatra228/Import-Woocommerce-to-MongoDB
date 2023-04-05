const ORDER_IMPORT_QUERY = `
    query {
        orders{
            nodes{
                orderNumber
                customer{
                    databaseId
                    firstName
                }
            }
        }
    }
`;

module.exports = { ORDER_IMPORT_QUERY }