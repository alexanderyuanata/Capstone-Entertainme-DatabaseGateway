const mysql = require('mysql2');

const connectionInfo = {
  host: process.env.MYSQLHOST || '10.184.0.4',
  port: process.env.MYSQLPORT || '3306',
  user: process.env.MYSQLUSER || 'username', //these will always be wrong
  password: process.env.MYSQLPASSWORD || 'password', //these will always be wrong
  database: process.env.MYSQLDB || 'dataset',
};


console.log('connecting to database...');
const connection = mysql.createConnection(connectionInfo);

executeQuery("select * from book_dataset limit 2;");


async function executeQuery(query) {
   //connect to the database
  connection.connect((error) => {
    if (error){
      console.log(err.message);
      throw error;
    }

    console.log('Connected to the remote database!');
  });

  //if all is good, execute the query and return the result
  connection.query(query, (err, results) => {
    if (err){
      console.log(err.message);
      throw err;
    }
    console.log(results);
    return results;
  });
}

module.exports = { executeQuery };