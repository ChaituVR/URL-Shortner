##Guide for using MongoDB and deploying it to Heroku

In this guide lets see how to work with MongoDB localy and with mLab for deploying it to Heroku

#### Setting up a free account on Heroku and mLab:

Sign up for [Heroku](https://signup.heroku.com/) and [mLab](https://mlab.com/signup/)


####Starting your Mongodb(Locally): 
```mongod --port 27017 --dbpath=./data``` _(Create a directory named data if it doesn't exist)_

Now your Db is running at-

`mongodb://localhost:27017/my_database_name`

>If you are using C9 and If you are having trouble starting your DB in C9 refer to this [page](https://community.c9.io/t/setting-up-mongodb/1717)

####Starting your Mongodb(mLab):
1. After Creating your mLab Account click on create new button and select Single-node -> Sandbox to get the free Db and give your database a name (i've created a db named 'food' for this) 
2. Now a database is created with the name 'food' now create a new collection of your own
3. Finally Add a User/Users who can acess this Database,While Adding a user it will ask for Database username and password which are used to acess the Database

Now your Db is running at something like this -
` mongodb://username:password@ds01316.mlab.com:1316/food `


where username and password are those details you are given when you added a user.

>You can find your DB url at [https://mlab.com/databases/my_database_name](https://mlab.com/databases/my_database_name)

####Making a Connection with MongoDB in Node.js (While DB is running in your Local System):

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

We need to know where our mongodb server is running. The url represents the location where the mongodb server instance is running such that we can connect to it. The url contains the database name to which we intend to connect.

Assuming that your database is running on the url mentioned above let us now focus on the Url connecting the Database(local)

```var url = 'mongodb://localhost:27017/my_database_name';```

This is the url for connecting to mLab DB

```var url = 'mongodb://username:password@ds01316.mlab.com:1316/food';```


