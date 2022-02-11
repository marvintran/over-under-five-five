const Pool = require("pg").Pool;
require('dotenv').config();
const database = process.env.NODE_ENV || "development";

const poolDev = new Pool({
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  host: process.env.REACT_APP_DB_HOST,
  port: process.env.REACT_APP_DB_PORT,
  database: process.env.REACT_APP_DB_DATABASE
});

const poolProd = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

if(database === "development") {
  module.exports = poolDev;
} else {
  module.exports = poolProd;
}