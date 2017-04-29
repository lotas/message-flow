const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

router.get('/', function(req, res, next) {
  //@TODO authorise and filter by current team only
  Message.find({})
    .sort({event_type: 'desc'})
    .exec((err, docs) => {
      if (err) {
        debug('Error querying', err);
        return res.sendStatus(500);
      }
      res.json(docs);
    });
});

module.exports = router;
