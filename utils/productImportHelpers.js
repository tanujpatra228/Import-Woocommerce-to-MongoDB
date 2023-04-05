
/**
 * @args Array - productsNode from WordPress graphQL API
 * @return Array - array of products object
 *
 * This function taked products array from WordPress GraphQL response
 *  and converst it into a array that can be inserted into mongodb
 */
const createProductsArray = (productsNode = []) => {
    const productsArray = productsNode.map(node => {
        const newProduct = {
            name: node.name,
            shortDescription: node.shortDescription,
            description: node.description,
            onSale: node.onSale,
            type: node.type,
            sku: node.sku,
            status: node.status,
        };

        if (node.price) {
            newProduct.price = parseFloat(node.price);
        }

        if (node.salePrice) {
            newProduct.salePrice = parseFloat(node.salePrice);
        }

        if (node.products) {
            const productNodes = node.products.nodes;
            const groupProductPrices = [];
            const groupProductSalePrices = [];
            newProduct.products = productNodes;

            productNodes.forEach(productNode => {
                if (productNode.price) {
                    groupProductPrices.push(parseFloat(productNode.price));
                }

                if (productNode.salePrice) {
                    groupProductSalePrices.push(parseFloat(productNode.salePrice));
                }
            });

            if (groupProductPrices.length > 0) {
                newProduct.price = Math.min(...groupProductPrices);
            }

            if (groupProductSalePrices.length > 0) {
                newProduct.salePrice = Math.min(...groupProductSalePrices);
            }
        }

        return newProduct;
    });

    return productsArray;
}

module.exports = { createProductsArray };