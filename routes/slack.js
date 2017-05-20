const debug = require('debug')('app:slack');
const express = require('express');
const request = require('request');

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL;
const API_URL = process.env.REACT_APP_API_URL;

const SLACK_REQ_URL_VERIFICATION = 'url_verification';
const SLACK_REQ_EVENT_CALLBACK = 'event_callback';

const SLACK_EVENT_MESSAGE = 'message';
const SLACK_EVENT_SUBTYPE_MESSAGE_CHANGED = 'message_changed';

const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

const Message = require('../models/Message');
const Incoming = require('../models/Incoming');
const SlackAuth = require('../models/SlackAuth');

const messageSaveCallback = (err, record) => {
  if (err) {
    return debug('Error saving entity', err);
  }
  debug(`Message saved: ${record._id}`);
};

/* GET users listing. */
router.post('/event', function(req, res) {
  const slackReq = req.body;

  const token = slackReq.token;
  if (token !== SLACK_VERIFICATION_TOKEN) {
    debug(`Slack verification token mismatch: ${token}`);
    return res.send(401);
  }

  const incoming = new Incoming({
    rawRequest: slackReq
  });
  incoming.save();

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

        if (event.subtype == SLACK_EVENT_SUBTYPE_MESSAGE_CHANGED) {
          // mark as isChanged previous one
          Message.supressChangedMessage(slackReq)
            .exec((err) => {
              if (err) {
                return debug('Error updating changed message', err);
              }
              message.save(messageSaveCallback);
            });
        } else {
          message.save(messageSaveCallback);
        }

        break;

      default:
        debug(`Unsupported slack event type: ${event.type}`);
        break;
    }
  }

  res.send(200);

});

router.get('/auth', function(req, res) {
    let code = req.query.code;
    let state = req.query.state;

    if (!code) {
        return res.redirect(`${FRONTEND_URL}`);
    }

    debug(`New AddSlack oauth request code=${code}`);

    performSlackAuth(code)
        .then(teamInfo => {
            console.log(teamInfo);
            if (teamInfo.ok === false || !!teamInfo.error) {
                return res.redirect(`${FRONTEND_URL}login/?slack_error=${teamInfo.error}`);
            }

            const slackAuth = SlackAuth.newFromSlackResponse(teamInfo);
            slackAuth.generateSessionToken()
              .then(() => {
                return slackAuth.save();
              })
              .then(() => {
                res.cookie('mfAuth', slackAuth.session_token, {httpOnly: true});
                res.redirect(`${FRONTEND_URL}`);
              })
              .catch(err => {
                console.error(err);
                res.send(500);
              });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });

});


function performSlackAuth(code) {
    var authUrl = 'https://slack.com/api/oauth.access?';
    authUrl += 'client_id=' + SLACK_CLIENT_ID;
    authUrl += '&client_secret=' + SLACK_CLIENT_SECRET;
    authUrl += '&code=' + code;
    authUrl += `&redirect_uri=${API_URL}/slack/auth`;

    return new Promise((resolve, reject) => {
        request.get(authUrl, (error, response, body) => {
            if (error) {
                debug('Error requesting slack code', error);
                return reject(error);
            }

            const _body = JSON.parse(body);
            debug('Slack auth completed', _body);

            resolve(_body);
        });
    });
}

module.exports = router;
