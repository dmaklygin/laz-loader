var express = require('express');
var router = express.Router();


// GET information of item
router.get('/item', require('../controllers/item'));


router.use(function(err, req, res, next) {
  res.json({ success: false, message: err.message });
});


module.exports = router;
