const mongoose = require('mongoose');

const incomingSchema = mongoose.Schema({
  rawRequest: Object
});

const Incoming = mongoose.model('Incoming', incomingSchema);

module.exports = Incoming;