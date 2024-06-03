const connection = require('./mysqlConnector');

const QUERY_LIMIT = 10;

async function executeBookQuery(criteria){
  let books;

  //check if criteria is just a single string (one title)
  if (typeof criteria === 'string') {
    //format for one title
    books = `"%${criteria}%"`;
  
  //if its an array of strings (multiple titles)
  } else if (Array.isArray(criteria)) {
    //assemble the query properly to fuzzy search
    books = `"%${criteria.join("%\" OR LOWER(Book) LIKE \"%")}%"`;
  
  //anything other than that is an error
  } else {
      throw new TypeError('Input must be a string or an array of strings');
  }

  let querystring = `SELECT * FROM book_dataset WHERE LOWER(Book) LIKE ${books} LIMIT ${process.env.QUERY_LIMIT || QUERY_LIMIT};`;

  console.log(querystring);

  //get the result or throw an error if it happens
  const result = await connection.query(querystring).catch(err => {throw err});
  return result;
}

module.exports = { executeBookQuery };