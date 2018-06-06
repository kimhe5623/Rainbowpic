var express = require('express');
var router = express.Router();
var multer = require('multer');
var nrc = require('node-run-cmd');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Loaded-imgs/ouputs/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});

var upload = multer({ storage: storage }).single('Inputimg');


// ROUTER
router.post('/', function (req, res) {
  var sess = req.session;

  upload(req, res, function (err) {
    if (err) { // 업로드할때 오류가 발생함
      res.json({
        success: false,
        message: "Error is occured."
      });
    }

    var localStorageID = req.file.filename.split('.')[0];
    // localStorage에 파일정보 저장
    localStorage.setItem(localStorageID, JSON.stringify(req.file));
    sess.localStorageID = localStorageID; // store localStorage information to session
//    res.send(JSON.parse(localStorage.getItem('file')));

    var cmd = "python Loaded-imgs/pix2pix.py "
            +"--mode test "
            +"--which_direction BtoA "
            +"--input_dir /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs/images "
            +"--input_file "+ req.file.filename +" "
            +"--output_dir /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs "
            +"--checkpoint /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs";

    nrc.run(cmd).then(function(exitCodes){
      res.redirect('/result');
    }, function(err){
      res.json({
        success: false,
        message: "Error is occured in GAN Codes"
      });
    });
  });
});

/* Convert API list */
router.post('/api/imgres', function (req, res) {
  var sess = req.session;

  upload(req, res, function (err) {
    if (err) { // 업로드할때 오류가 발생함
      res.json({
        success: false,
        message: "Error is occured."
      });
    }

    var localStorageID = req.file.filename.split('.')[0];
    // localStorage에 파일정보 저장
    localStorage.setItem(localStorageID, JSON.stringify(req.file));
    sess.localStorageID = localStorageID; // store localStorage information to session

    var cmd = "python Loaded-imgs/pix2pix.py "
            +"--mode test "
            +"--which_direction BtoA "
            +"--input_dir /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs/images "
            +"--input_file "+ req.file.filename + " "
            +"--output_dir /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs "
            +"--checkpoint /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs";

    nrc.run(cmd).then(function(exitCodes){
      res.redirect('/api/get/after');
    }, function(err){
      res.json({
        success: false,
        message: "Error is occured in GAN Codes"
      });
    });
  });
});

router.post('/api/jsonres', function (req, res) {
  var sess = req.session;

  upload(req, res, function (err) {
    if (err) { // 업로드할때 오류가 발생함
      res.json({
        success: false,
        message: "Error is occured."
      });
    }
    var localStorageID = req.file.filename.split('.')[0];
    // localStorage에 파일정보 저장
    localStorage.setItem(localStorageID, JSON.stringify(req.file));
    sess.localStorageID = localStorageID; // store localStorage information to session

    var cmd = "python Loaded-imgs/pix2pix.py "
            +"--mode test "
            +"--which_direction BtoA "
            +"--input_dir /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs/images "
            +"--input_file "+ req.file.filename + " "
            +"--output_dir /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs "
            +"--checkpoint /home/jhsong/Rainbowpic-webserver/Loaded-imgs/ouputs";

    nrc.run(cmd).then(function(exitCodes){
      res.send(req.file);
    }, function(err){
      res.json({
        success: false,
        message: "Error is occured in GAN Codes"
      });
    });
  })
});


module.exports = router;