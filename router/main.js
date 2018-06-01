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

router.get('/download', function (req, res) {
    var sess = req.session;
    var file = JSON.parse(localStorage.getItem(sess.localStorageID));
    var filetype = '.' + file.mimetype.split('/')[1];
    var afterImage = file.filename.split(filetype)[0] + '-result' + filetype;

    res.download('Loaded-imgs/outputs/images' + afterImage, afterImage);
});

router.get('/go/:where', function (req, res) {
    var sess = req.session;

    rimraf('Loaded-imgs/outputs/images/' + sess.localStorageID + '*', function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error is occured in going back or home"
            });
        }
        rimraf('Loaded-imgs/outputs/events*', function (err) {
            if (err) {
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
});

/* API - Remove related Data */
router.get('/api/get/before', function (req, res) {
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

router.get('/api/get/after', function (req, res) {
    var sess = req.session;
    var file = JSON.parse(localStorage.getItem(sess.localStorageID));
    var filetype = '.' + file.mimetype.split('/')[1];
    var afterPath = file.path.split(filetype)[0] + '-result' + filetype;

    fs.readFile(afterPath, function (err, content) {
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

router.get('/api/removeall', function (req, res) {
    var sess = req.session;
    var filename = sess.localStorageID;

    rimraf('Loaded-imgs/outputs/images/' + sess.localStorageID + '*', function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error is occured in going back or home"
            });
        }
        rimraf('Loaded-imgs/outputs/events*', function (err) {
            if (err) {
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
                res.json({
                    success: "true",
                    message: "All of files relevent to " + filename + " are successfully removed"
                })
            });
        });
    });
});


module.exports = router;
