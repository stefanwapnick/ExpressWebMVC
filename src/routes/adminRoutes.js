let express = require('express');
let adminRouter = express.Router();
let mongoClient = require('mongodb').MongoClient;
const connectionString = require('./constants').DB_CONNECTION_STRING;

let books = [
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

let factoryFunction = function(nav){
    adminRouter.route('/addBooks').get(function(req, res){

        mongoClient.connect(connectionString, function(err, db){
            db.collection('books').insertMany(books, function(err, results){
                res.send(err || results);
                db.close();
            });
        });

        //res.send('results');
    });

    return adminRouter;
};

module.exports = factoryFunction;