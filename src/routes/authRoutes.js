var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };

                db.collection('users').insert(user,
                    function (err, results) {
                        req.login(results.ops[0], function () {
                            res.redirect('/auth/profile');
                        });
                    });
            });

        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {failureRedirect: '/'}), function (req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.render('profile', {user: req.user});
        });
    return authRouter;
};

module.exports = router;