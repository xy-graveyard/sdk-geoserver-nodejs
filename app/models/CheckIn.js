// grab the mongoose module
let mongoose = require('mongoose');
var Node = require('./Node');

const CheckInSchema = new mongoose.Schema({
  userToken: String,
  timestamp: String,
  signature: Object,
  node: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }
});

CheckInSchema.methods = {

}

module.exports = mongoose.model('CheckIn', CheckInSchema);
