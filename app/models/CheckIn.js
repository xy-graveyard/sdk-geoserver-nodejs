// grab the mongoose module
let mongoose = require('mongoose');
var Node = require('./Node');

const CheckInSchema = new mongoose.Schema({
  userAddress: String,
  timestamp: Number,
  signature: Object,
  node: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }
});

CheckInSchema.methods = {

}

module.exports = mongoose.model('CheckIn', CheckInSchema);
