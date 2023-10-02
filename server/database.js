require("dotenv").config();
const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const login_pool = new Pool({
    connectionString: `${process.env.PG_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
});

const register_pool = new Pool({
    connectionString: `${process.env.PG_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
});

const todos_pool = new Pool({
    connectionString: `${process.env.PG_HOST}://${process.env.TD_USER}:${process.env.TD_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
});

module.exports = { login_pool, register_pool, todos_pool };
// Every query that will be done to the database will be done through this "pool"
