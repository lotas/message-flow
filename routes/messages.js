const express = require('express');
const router = express.Router();
const debug = require('debug')('app:messages');

const Message = require('../models/Message');
const Incoming = require('../models/Incoming');

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

router.get('/raw', function(req, res, next) {
  Incoming.find({})
    .exec((err, incomingRequests) => {
      if (err) {
        debug('Error', err);
        return res.sendStatus(500);
      }
      res.json(incomingRequests);
    });
})

module.exports = router;
