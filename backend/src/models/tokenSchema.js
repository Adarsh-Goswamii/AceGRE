const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  id: { type: String, required: true },
  token: { type: String, required: true }
});

module.exports = mongoose.model('Token', tokenSchema);