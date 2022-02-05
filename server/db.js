const Pool = require("pg").Pool;
require('dotenv').config();
const database = process.env.DB_ENVIRONMENT || "development";

const poolProd = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: true
});

const poolDev = new Pool({
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  host: process.env.REACT_APP_DB_HOST,
  port: process.env.REACT_APP_DB_PORT,
  database: process.env.REACT_APP_DB_DATABASE
});

if(database === "development") {
  module.exports = poolDev;
} else {
  module.exports = poolProd;
}
