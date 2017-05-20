const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slackAuthSchema = Schema({
  access_token: String,
  scope: String,
  user: Object,
  team: Object,
  date: Date,
  session_token: String
});

slackAuthSchema.methods.generateSessionToken = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      this.session_token = buffer.toString('hex');

      resolve();
    });
  });
};

slackAuthSchema.statics.newFromSlackResponse = function(slackRes) {
  const SlackAuth = this;

  return new SlackAuth({
    access_token: slackRes.access_token,
    scope: slackRes.scope,
    user: slackRes.user,
    team: slackRes.team,
    date: new Date()
  });
};

const SlackAuth = mongoose.model('SlackAuth', slackAuthSchema);

module.exports = SlackAuth;
