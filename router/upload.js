var express = require('express');
var router = express.Router();
var multer = require('multer');
var originalName;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Loaded-imgs/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpeg')
    }
});

var upload = multer({ storage: storage }).single('inputImg');

// ROUTER
router.post('/', function (req, res) {
    var sess = req.session;

    res.render("ongoing.html"); // 로딩 화면
    upload(req, res, function (err) {
        if (err) {
            res.json({
                success: false,
                message: "Error is occured."
            });
          // 업로드할때 오류가 발생함
        }
    res.redirect("/result");
    // 정상적으로 완료됨
  })
})



module.exports = router;