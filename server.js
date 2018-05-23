var express = require('express');
var multer = require('multer');
var session = require('express-session');
var preloader = require('preloader');

var loader = preloader({
    xhrImages: false
  });


var render = require('./router/main');
var upload = require('./router/upload');


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', render);
app.use('/upload', upload);


var server = app.listen(3000, function(){
    console.log("Rainbowpic server has started on port 3000");
});

app.use(express.static('public'));

module.exports = app;
module.exports = session;
module.exports = loader;
