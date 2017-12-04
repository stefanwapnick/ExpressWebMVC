var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        // This will be called when doing passport.authenticate('local')
        // Tell password if the user is valid by calling done(null, user) or done(null, false) for invalid user
        function (username, password, done) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.findOne({username: username},
                    function (err, results) {
                        if (results && results.password === password) {
                            done(null, results);
                        } else {
                            done(null, false, {message: 'Bad password'});
                        }

                    }
                );
            });
        }));
};