const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  team_id: String,
  api_app_id: String,
  event_time: Number,
  channel: String,
  ts: String,
  username: String,
  text: String,
  meta: Object,
  attachments: [Object]
});

messageSchema.statics.newFromSlackRequest = function(slackReq) {
  const Message = this;

  return new Message({
      team_id: slackReq.team_id,
      api_app_id: slackReq.api_app_id,
      event_time: slackReq.event_time,
      channel: slackReq.event.channel || null,
      ts: slackReq.event.ts || null,
      username: slackReq.event.user || slackReq.event.username,
      text: slackReq.event.text,
      meta: {
        icons: slackReq.event.icons || {}
      },
      attachments: slackReq.event.attachments
    });
}

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;