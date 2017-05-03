const express = require('express');
const router = express.Router();
const debug = require('debug')('app:messages');

const Message = require('../models/Message');
const Incoming = require('../models/Incoming');

const DEFAULT_PAGE_SIZE = 40;

router.get('/', function(req, res) {
  //@TODO authorise and filter by current team only

  const limit = parseInt(req.query.limit, 10);
  const skip = parseInt(req.query.skip, 10);

  Message.find({})
    .sort({_id: -1})
    .limit(limit || DEFAULT_PAGE_SIZE)
    .skip(skip || 0)
    .exec((err, docs) => {
      if (err) {
        debug('Error querying', err);
        return res.sendStatus(500);
      }
      res.json(docs);
    });
});

router.get('/raw', function(req, res) {
  Incoming.find({})
    .exec((err, incomingRequests) => {
      if (err) {
        debug('Error', err);
        return res.sendStatus(500);
      }
      res.json(incomingRequests);
    });
});

module.exports = router;
