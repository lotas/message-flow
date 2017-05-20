const express = require('express');
const router = express.Router();
const debug = require('debug')('app:messages');

const Message = require('../models/Message');
const Incoming = require('../models/Incoming');

const DEFAULT_PAGE_SIZE = 40;

router.get('/', function(req, res) {
  const teamId = req.user.team.id;

  const limit = parseInt(req.query.limit, 10);
  const skip = parseInt(req.query.skip, 10);

  Message.find({
      isChanged: false,
      team_id: teamId
    })
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

router.get('/stats', async function(req, res) {
  const teamId = req.user.team.id;
  const totalMessages = await Message.count({
    team_id: teamId
  });

  let today = new Date();
  today.setHours(0,0,0,0);

  const totalToday = await Message.count({
    team_id: teamId,
    event_time: {
      $gt: today
    }
  });

  res.json({
    total: totalMessages,
    today: totalToday
  });
});

module.exports = router;
