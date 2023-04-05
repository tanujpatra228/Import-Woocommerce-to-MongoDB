const PRODUCT_IMPORT_QUERY = `
    query {
        products(first: 210) {
            nodes {
                name
                shortDescription
                description
                onSale
                type
                sku
                status
                ... on SimpleProduct {
                    name
                    shortDescription
                    onSale
                    type
                    sku
                    status
                    price(format: RAW)
                    salePrice(format: RAW)
                }
                ... on VariableProduct {
                    name
                    shortDescription
                    onSale
                    type
                    sku
                    status
                    price(format: RAW)
                    salePrice(format: RAW)
                }
                ... on ExternalProduct {
                    name
                    shortDescription
                    onSale
                    type
                    status
                    price(format: RAW)
                    salePrice(format: RAW)
                }
                ... on GroupProduct {
                    products {
                        nodes {
                            ... on SimpleProduct {
                                name
                                shortDescription
                                onSale
                                type
                                sku
                                status
                                price(format: RAW)
                                salePrice(format: RAW)
                            }
                            ... on VariableProduct {
                                name
                                shortDescription
                                onSale
                                type
                                sku
                                status
                                price(format: RAW)
                                salePrice(format: RAW)
                            }
                            ... on ExternalProduct {
                                name
                                shortDescription
                                onSale
                                type
                                status
                                price(format: RAW)
                                salePrice(format: RAW)
                            }
                        }
                    }
                }
            }
        }
    }
`;

module.exports = { PRODUCT_IMPORT_QUERY };