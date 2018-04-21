module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index.html');
    });
    app.get('/start', function(req, res){
        res.render('start.html')
    });
    app.get('/ongoing', function(req, res){
        res.render("ongoing.html")
    });
    app.get('/result', function(req, res){
        res.render("getResult.html");
    });
}