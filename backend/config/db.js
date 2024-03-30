const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbs_project_db",
});

// trying to connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database server:", err);
    return;
  }
  // Creating the database
  db.query("CREATE DATABASE IF NOT EXISTS dbs_project_db", (createDbErr) => {
    if (createDbErr) {
      console.error("Error creating database:", createDbErr);
    } else {
      console.log(
        "Database 'dbs_project_db' created (if it didn't exist already)"
      );
    }
    // db.end();
  });
});

module.exports = db;
