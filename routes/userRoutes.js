var express = require('express');
var router = express.Router();
var User = require("../models/UserModel");
var passport = require('passport');


router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

module.exports = router
