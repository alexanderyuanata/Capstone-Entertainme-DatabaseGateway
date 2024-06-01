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

async function executeQuery(criteria, table) {
  //make sure that the query is appropriate
  let books;

  //if theres only one title, then just return the criteria alone
  if (typeof criteria === 'string') {
    books = `'${criteria}'`;
  //if its an array, format it for SQL
  } else if (Array.isArray(criteria)) {
    books = `'${criteria.join("', '")}'`;
  //else, then something is wrong
  } else {
      throw new TypeError('Input must be a string or an array of strings');
  }

  //connect to the database
  connection.connect((error) => {
    if (error){
      console.log(err.message);
      throw error;
    }

    console.log('Connected to the remote database!');
  });

  //perform the query
  const query = `SELECT * FROM ${table} WHERE LOWER(Book) IN (${books});`;
  console.log(query);

  //if all is good, execute the query and return the result
  connection.query(query, (err, results) => {
    if (err){
      console.log(err.message);
      throw err;
    }
    return results;
  });
}

module.exports = { executeQuery };