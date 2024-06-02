const mysql = require("mysql2");
const util = require("util");

const connectionInfo = {
  host: process.env.MYSQLHOST || "localhost",
  port: process.env.MYSQLPORT || "3306",
  user: process.env.MYSQLUSER || "testing", //these will always be wrong
  password: process.env.MYSQLPASSWORD || "password", //these will always be wrong
  database: process.env.MYSQLDB || "testing", //these will always be wrong
};

//create a connection to the MySQL database
let connection = mysql.createConnection(connectionInfo);

//promisify the callback connection
connection.query = util.promisify(connection.query).bind(connection);

console.log('attempting to connect to database...');

connection.connect(err => {
  if (err){
    console.log(err.message);
    return;
  }
  console.log('connection established as thread ' + connection.threadId);
});

module.exports = connection;
