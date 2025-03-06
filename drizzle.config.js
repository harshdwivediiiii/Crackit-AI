require('dotenv').config(); // Load environment variables from .env file

/** @type { import("drizzle-kit").Config } */
const config = {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url:  process.env.DATABASE_URL
    },
};

module.exports = config;
