const mysql = require("mysql");
const { promisify } = require("util"); // convert callbacks to js promises

const { database } = require("./keys");

const pool = mysql.createPool(database); // connect to our DB

// let's go to handle the errors
pool.getConnection((error, connection) => {
    if(error) {
        if(error.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Connection lost.");
        }
        if(error.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has to many connections.");
        }
        if(error.code === "ECONNREFUSED") {
            console.error("Database connection was refused.");
        }
    }

    if(connection) {
        connection.release();
    console.log("DB is connected");
    }
});

// promisify pool queries
pool.query = promisify(pool.query);

module.exports = pool;