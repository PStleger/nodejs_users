const { Pool } = require("pg");

const pool = new Pool({
  user: "ufompqrm",
  password: "ZOcHGrUJm2zDMKWjeREAc8YnF1gKarkP",
  database: "ufompqrm",
  host: "horton.db.elephantsql.com",
});

module.exports = pool;
