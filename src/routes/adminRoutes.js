let express = require('express');
let adminRouter = express.Router();
let mongoClient = require('mongodb').MongoClient;
const connectionString = require('./constants').DB_CONNECTION_STRING;

let factoryFunction = function(){
    adminRouter.route('/removeallbooks').get(function(req, res){

        mongoClient.connect(connectionString, function(err, db){
            db.collection('books').remove({}, function(err, results){
                res.redirect('/books');
                db.close();
            });
        });
    });

    return adminRouter;
};

module.exports = factoryFunction;