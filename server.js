var express = require('express');
var multer = require('multer');
var session = require('express-session');
var bodyParser = require('body-parser');
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


app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYRAINBOWPIC#@$#$',  // 쿠키를 임의로 변조하는 것을 방지하기 위한 값.
                                // 이 값을 통하여 세션을 암호화하여 저장함
    resave: false,  // 세션을 언제나 저장할 지 정하는 값.
    saveUninitialized: true // 세션이 저장되기 전에 uninitialized 상태로
                            // 미리 만들어서 저장.
}));

var server = app.listen(3000, function(){
    console.log("Rainbowpic server has started on port 3000");
});

app.use(express.static('public'));
app.use(express.static(__dirname+'/Loaded-imgs/ouputs/images/'));
app.use('/', render);
app.use('/upload', upload);

module.exports = app;
module.exports = loader;