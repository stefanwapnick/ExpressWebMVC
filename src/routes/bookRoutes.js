let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let bookRouter = express.Router();
let connectionString = require('./constants').DB_CONNECTION_STRING;

// Example of how to pass in arguments to router functions
var router = function(nav){
    var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Misérables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
    },
    {
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    },
    {
        title: 'The Dark World',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        read: false
    },
    {
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        read: false
    },
    {
        title: 'Life On The Mississippi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    }
    ];
    bookRouter.route('/')
    .get(function (req, res) {

        mongoClient.connect(connectionString, function(err, db){

            db.collection('books').find().toArray(function(err, results){
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
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
                    nav: nav,
                    book: result
                });
            });
        });

    });
    return bookRouter;
};
module.exports = router;