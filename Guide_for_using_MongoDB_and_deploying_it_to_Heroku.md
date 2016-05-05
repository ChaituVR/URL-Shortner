##Guide for using MongoDB and deploying it to Heroku

First Let us see how to work with MongoDB localy and then deploying it to Heroku using mLab

#### Setting up a free account on Heroku and mLab:

Sign up for [Heroku](https://signup.heroku.com/) and [mLab](https://mlab.com/signup/)


###Starting your Mongodb: 

>If you have trouble starting your DB in C9 refer to this [page](https://community.c9.io/t/setting-up-mongodb/1717)

###Making a Connection with MongoDB in Node.js (While DB is running in your Local System):

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
});

```
>For more examples to work with MongoDB you can refer this  [blog](http://blog.modulus.io/mongodb-tutorial) 

Assuming that your database is running on the url mentioned above let us now focus on the Url connecting the Database

```var url = 'mongodb://localhost:27017/my_database_name';```

We need to know where our mongodb server is running. The url represents the location where the mongodb server instance is running such that we can connect to it. The url contains the database name to which we intend to connect.



