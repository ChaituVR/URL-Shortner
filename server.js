var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
//for getting URL as parameter
var url=process.env.PROD_MONGODB

app.use(function(req, res, next) {
    req.url = req.url.replace(/^(\/new\/)(.+)/, function($0, $1, $2) {
        return $1 + encodeURIComponent($2);
    });
    next();
});

//DB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
function makeShortId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var shortURL;
var response;
app.get('/:shortURLNew', function(req, res) {
    
var sendResponse =function(response){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
    
}
     MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to DataBase.");
            db.createCollection('urlShort', function(err, collection) {
                if (err) {
                    console.log("Collection Already Exists");
                }
            });
            var collection = db.collection('urlShort');

            //Creating
            
            collection.find({
                short_url: req.params.shortURLNew
            }).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                else if (result.length) {
                    
                    
                     res.redirect(result[0].original_url);
                     res.end();
                }
                else {
                    sendResponse({"error":"Sorry No such URL in DB..."});
                }
              db.close();
            });


        });

    
    
    
});
app.get('/new/:url', function(req, res) {
    var error = false;
var sendResponse =function(response){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
}
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(req.params.url)) {
        var error = true;
    }
    
    if (!error) {
        
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to DataBase.");
            db.createCollection('urlShort', function(err, collection) {
                if (err) {
                    console.log("Collection Already Exists");
                }
            });
            var collection = db.collection('urlShort');

            //Creating
            
            collection.find({
                original_url: req.params.url
            }).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                }
                else if (result.length) {
                    console.log('Found:', result);
                    shortURL=result[0].short_url;
                    response = {"original_url": req.params.url,"short_url": "https://smallu.herokuapp.com/"+shortURL};
                    sendResponse(response);
                    db.close();
                }
                else {
                    //console.log('No document(s) found with defined "find" criteria!');
                    shortURL= String(makeShortId());
                    response = {"original_url": req.params.url,"short_url": "shortURL"+shortURL};
                    
                    collection.insert(response, function(err, result) {
                        
                        if (err) {
                            console.log(err);
                        }
                        else {
                            //console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                        }
                        
                        db.close();
                        
                    });
                    sendResponse({"original_url": req.params.url,"short_url": "https://smallu.herokuapp.com/"+shortURL});
                }

            });

            // Insert some users


        });


    }

    ///////////////////////////////////////////////////////////////////////
    else {
        // var response = {
        //     "error": "PLEASE check your url macha :)"
        // };
        sendResponse({"error": "Please check the url  :)"});
    }



    
});

app.get('*', function(req, res) {

    res.sendFile(__dirname + '/index.html');

});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
