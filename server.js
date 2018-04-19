var express = require('express');
var app = express();
var router = require('./router/render')(app);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Rainbowpic server has started on port 3000");
});

app.use(express.static('public'));