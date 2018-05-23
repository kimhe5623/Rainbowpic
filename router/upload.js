var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Loaded-imgs/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.'+ file.mimetype.split('/')[1]);
  }
});

var upload = multer({ storage: storage }).single('Inputimg');


// ROUTER
router.post('/', function (req, res, next) {

    upload(req, res, function (err) {
      if (err) { // 업로드할때 오류가 발생함
        res.json({
          success: false,
          message: "Error is occured."
        });
      }
      res.json(req.file);
    })

});



module.exports = router;