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
                    res.render('bookListView', {books: results});
                    db.close();
                });
            });
        });

    bookRouter.route('/new')
        .get(function(req, res){
            res.render('bookView', {book: {title: '', author: '', genre: '', read: false}});
        })
        .post(function(req, res){

            let book = {
                title: req.body.title,
                genre: req.body.title,
                author: req.body.title,
                read: req.body.read
            };

            var url = 'mongodb://localhost:27017/libraryApp';
            mongoClient.connect(url, function (err, db) {
                db.collection('books').insert(book,
                    function (err, results) {
                        req.login(results.ops[0], function () {
                            res.redirect('/books');
                            db.close();
                        });
                    });
            });

        });

    bookRouter.route('/:id')
    .get(function (req, res) {
        let id = new ObjectID(req.params.id);

        mongoClient.connect(connectionString, function(err, db){
            db.collection('books').findOne({_id: id}, function(err, result){
                console.log(result);
                res.render('bookView', {book: result});
                db.close();
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

                let book = {
                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    read: req.body.read,
                    _id: id
                };

                db.collection('books').updateOne({_id: id}, book, function(err, result){
                    res.redirect('/books');
                    db.close();
                });

            });
        });
    });
    return bookRouter;
};
module.exports = router;