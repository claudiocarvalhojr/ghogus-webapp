var express = require('express');
var router = express.Router();

/* GET home c/ findAll */
router.get('/', function (req, res) {
  res.render('index', {
    page: 'menu',
    title: 'Home'
  });
})

module.exports = router;