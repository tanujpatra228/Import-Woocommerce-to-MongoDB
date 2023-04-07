# Import Woocommerce to MongoDB
This Git repository contains the source code for a Node.js application that allows you to import WooCommerce database tables (products, orders, customers) into MongoDB. The application requires the WP-graphQL plugin to be installed in the WordPress website from where it fetches the data.

## ENV Variables
    MONGO_CONNECTION="mongoDB connection string"
    WOO_BASE_URI="graphql endpoint for WordPress website"
    WOO_APP_ADMIN_PASS="Username:Application Password"
