var express = require('express');
var router = express.Router();
var passport = require('../models/passport')

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        failureRedirect: '/'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name);
    });

router.get('/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));



module.exports = router;