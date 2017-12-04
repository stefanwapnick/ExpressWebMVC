let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let bookRouter = express.Router();
let connectionString = require('./constants').DB_CONNECTION_STRING;

// Example of how to pass in arguments to router functions
let router = function(){

    bookRouter.use(function(req, res, next){
            if(!req.isAuthenticated()){
                res.render('unauthorized');
                return;
            }
            next();
        });

    bookRouter.route('/')
        .get(function (req, res) {

            mongoClient.connect(connectionString, function (err, db) {

                db.collection('books').find().toArray(function (err, results) {
                    res.render('bookListView', {
                        title: 'Books',
                        books: results
                    });
                });
            });
        });

    bookRouter.route('/:id')
    .get(function (req, res) {
        let id = new ObjectID(req.params.id);

        mongoClient.connect(connectionString, function(err, db){
            db.collection('books').findOne({_id: id}, function(err, result){
                res.render('bookView', {
                    title: 'Books',
                    book: result
                });
            });
        });

    })
    .post(function(req, res){
        let id = new ObjectID(req.params.id);
        mongoClient.connect(connectionString, function(err, db){
            db.collection('books').findOne({_id: id}, function(err, result){

                if(!result){
                    res.send('Not found');
                    return;
                }

                let book = req.body;
                book._id = id;

                db.collections('books').updateOne({_id: id}, book, function(err, result){
                    res.redirect('/books');
                });

            });
        });
    });
    return bookRouter;
};
module.exports = router;