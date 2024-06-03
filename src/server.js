const express = require('express');
const { executeBookQuery } = require('./queryHandlers');
const app = express();

//define a handler for queries
async function handleBookQuery(req, res){
  //get the query from payload
  let titles = req.query.title;

  if (titles == undefined){
    return res.status(400).json({
      status: 'failure',
      message: 'invalid query string parameters',
    });
  }

  //retrieve result asynchronously
  try {
    const result = await executeBookQuery(titles);

    return res.status(200).json({
      status: 'success',
      message: 'query successfully retrieved',
      titles: result,
    });
  }
  catch(err){
    //something went wrong
    console.log('--------------------caught error-----------------------');
    console.log(err.message);

    return res.status(500).json({
      status: 'failure',
      message: 'something went wrong with the query',
    });
  }
}

//server parses json payload
app.use(express.json());

//define an endpoint to check whether the server is up or not
app.get('/check', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'server is up and running!',
  });
});

//define an endpoint for book queries
app.get('/query/books', handleBookQuery);

//server listening to requests now
const port = parseInt(process.env.PORT) || 10600;

async function startServer(){
  //wait until we finish connecting to the database
  try {
    app.listen(port, () => {
      console.log(`helloworld: listening on port ${port}`);
    });
  }
  catch(err){
    console.log(err.message);
  }
}

//start the server
startServer();
