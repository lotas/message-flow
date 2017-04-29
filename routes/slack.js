const debug = require('debug')('app:slack');
const express = require('express');
const router = express.Router();

const SLACK_REQ_URL_VERIFICATION = 'url_verification';
const SLACK_REQ_EVENT_CALLBACK = 'event_callback';

const SLACK_EVENT_MESSAGE = 'message';

const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;

const Message = require('../models/Message');

/* GET users listing. */
router.post('/event', function(req, res, next) {
  const slackReq = req.body;

  const token = slackReq.token;
  if (token !== SLACK_VERIFICATION_TOKEN) {
    debug(`Slack verification token mismatch: ${token}`);
    return res.send(401);
  }

  const reqType = slackReq.type || '';
  debug(`Incoming msg type: ${reqType}`);

  if (reqType === SLACK_REQ_URL_VERIFICATION) {
    return res.send(slackReq.challenge);
  } else if (reqType === SLACK_REQ_EVENT_CALLBACK) {
    const event = slackReq.event;
    switch (event.type) {
      case SLACK_EVENT_MESSAGE:
        // @TODO private channels? avoid completely or save
        const message = Message.newFromSlackRequest(slackReq);
        message.save((err, record) => {
          if (err) {
            return debug('Error saving entity', err);
          }
          debug(`Message saved: ${record._id}`);
        });
        break;

      default:
        debug(`Unsupported slack event type: ${event.type}`);
        break;
    }
  }

  res.send(200);

});


module.exports = router;
