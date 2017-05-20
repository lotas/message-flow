const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/info', function(req, res) {
  res.json({
    user: req.user.user,
    team: req.user.team
  });
});

module.exports = router;
