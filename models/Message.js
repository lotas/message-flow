const debug = require('debug')('app:model:Message');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
  team_id: String,
  api_app_id: String,
  event_time: Number,
  channel: String,
  ts: String,
  username: String,
  text: String,
  meta: {
    icons: Object,
    event_id: String
  },
  attachments: Schema.Types.Mixed,
  // message was changed in slack and should be hidden
  // as there is a new one replacing this
  isChanged: {
    type: Boolean,
    default: false
  }
});

messageSchema.statics.newFromSlackRequest = function(slackReq) {
  const Message = this;
  const event = slackReq.event;

  return new Message({
    team_id: slackReq.team_id,
    api_app_id: slackReq.api_app_id,
    event_time: slackReq.event_time,
    channel: event.channel || null,
    ts: event.ts || null,
    username: event.message ? event.message.username : (event.user || event.username),
    text: event.message ? event.message.text : event.text,
    meta: {
      icons: event.icons || {},
      event_id: slackReq.event_id
    },
    attachments: event.message ? event.message.attachments : event.attachments
  });
};

messageSchema.statics.supressChangedMessage = function(slackReq) {
  const Message = this;
  const event = slackReq.event;

  Message.findOneAndUpdate({
    team_id: slackReq.team_id,
    api_app_id: slackReq.api_app_id,
    channel: event.channel || null,
    ts: event.ts
  }, {
    isChanged: true
  }, (err) => {
    if (err) {
      return debug(err);
    }
    debug(`Updated isChanged on ${event.ts}`);
  });
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
