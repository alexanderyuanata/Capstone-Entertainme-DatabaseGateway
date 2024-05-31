const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '10.184.0.4',
  user: 'cloudrun',
  password: 'password',
  database: 'dataset',
});

async function testFetch() {
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the remote database!');
  });

  const query = 'SELECT * FROM book_dataset LIMIT 1;';

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('Data fetched:', results);
  });
}

module.exports = { testFetch, connection };