const express = require('express');
const { executeQuery } = require('./mysqlConnector');
const app = express();

//define a handler for queries
async function handleQuery(req, res){
  //get the query from payload
  const payload = req.body;
  const query = payload.query;

  if (query == undefined){
    return res.status(400).json({
      status: 'failure',
      message: 'no query detected in request body',
    });
  }

  //retrieve result asynchronously
  try {
    const result = await executeQuery(query);

    return res.status(200).json({
      status: 'success',
      message: 'query successfully retrieved',
      data: result,
    });
  }
  catch(err){
    //something went wrong
    return res.status(500).json({
      status: 'failure',
      message: 'something went wrong with the query',
    });
  }
  

}

//server parses json payload
app.use(express.json());

//define an endpoint for queries
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'server is up and running!',
  });
});

//define an endpoint for queries
app.get('/query', handleQuery);

//server listening to requests now
const port = parseInt(process.env.PORT) || 8080;

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
