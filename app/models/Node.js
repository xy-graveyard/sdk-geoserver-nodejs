let mongoose = require('mongoose');
var CheckIn = require('./CheckIn');

const NodeSchema = new mongoose.Schema({
    name: { type : String, default: '' },
    publicKey: { type : String, default: '', unique: true },
    latitude: Number,
    longitude: Number
});

NodeSchema.pre('save', (next) => {
    next();
});

NodeSchema.path('name').validate((name) => {
  if (name === '') return false;
  return true;
}, 'The name is not valid.');

NodeSchema.methods = {

}

module.exports = mongoose.model('Node', NodeSchema);
