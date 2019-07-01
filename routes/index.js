const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/services', (req, res) => {
  console.log(req)
  res.render('/services/services');
});

module.exports = router;
