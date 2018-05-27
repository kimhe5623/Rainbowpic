var express = require('express');
var fs = require('fs');
var router = express.Router();
var nrc = require('node-run-cmd');
var rimraf = require('rimraf');

router.get('/', function (req, res) {
    res.render('index.html');
});

router.get('/home', function (req, res) {
    res.redirect('/');
});

router.get('/start', function (req, res) {
    res.render('start.html');
});

router.get('/result', function (req, res) {
    var sess = req.session;
    var file = JSON.parse(localStorage.getItem(sess.localStorageID));
    var filetype = '.' + file.mimetype.split('/')[1];
    var afterImage = file.filename.split(filetype)[0] + '-result' + filetype;

    //    res.send(file);
    res.render('getResult.html', {
        beforeImage: file.filename,
        afterImage: afterImage
    });

    //   res.render('test.html',{beforeImage:file.filename, afterImage:afterImage});
});

router.get('/get', function (req, res) {
    var sess = req.session;
    var file = JSON.parse(localStorage.getItem(sess.localStorageID));

    fs.readFile(file.path, function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' });
            console.log(err);
            res.end('No such image');
        } else {
            res.writeHead(200, { 'Content-type': file.mimetype });
            res.end(content);
        }
    });

    //   res.send(file);

});

router.get('/download', function (req, res) {
    var sess = req.session;
    var file = JSON.parse(localStorage.getItem(sess.localStorageID));
    var filetype = '.' + file.mimetype.split('/')[1];
    var afterImage = file.filename.split(filetype)[0] + '-result' + filetype;

    res.download('Loaded-imgs/' + afterImage, afterImage);
});

router.get('/go/:where', function (req, res) {
    var sess = req.session;

    rimraf('Loaded-imgs/'+sess.localStorageID+'*', function(err){
        if(err){
            res.json({
                success: false,
                message: "Error is occured in going back or home"
            });
        }

        localStorage.removeItem(sess.localStorageID);

        sess.destroy(function (err) {
            if (err) {
                res.json({
                    success: "false",
                    message: "Session can't be destroyed"
                });
            }
            if (req.params.where = "back")
                res.redirect('/start');
            else if (req.params.where = "home")
                res.redirect('/');
        });
    });
});


module.exports = router;
