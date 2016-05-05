##Guide for using MongoDB and deploying it to Heroku

First Let us see how to work with MongoDB localy and then deploying it to Heroku using mLab

#### Setting up a free account on Heroku and mLab:

Sign up for [Heroku](https://signup.heroku.com/) and [mLab](https://mlab.com/signup/)

###Making a Connection with MongoDB in Node.js (While Working Locally)

To work with the database, you first need to create a connection. In this section we will be using MongoDB’s native Node.js driver to create the connection with the MongoDB server. To install the mongodb native drivers, use the npm command to install the mongodb module. After that, run the following command in your project directory.

``` npm install mongodb```

Basic Code for connecting to MongoDB

```
/lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://localhost:27017/my_database_name';      
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});
```

