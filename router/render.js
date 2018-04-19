module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index.html');
    });

    app.get('/start', function(req, res){
        res.render('start.html')
    })
}