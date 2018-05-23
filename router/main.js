var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index.html');
});

router.get('/start', function(req, res){
    res.render('start.html');    
});

router.get('/result', function(req, res){
    res.render("getResult.html");
});

module.exports = router;