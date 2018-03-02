let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    publicKey: { type : String, default: '', unique: true },
    address: { type : String, default: ''}
});

UserSchema.pre('save', (next) => {
    next();
});

UserSchema.methods = {

}

module.exports = mongoose.model('User', UserSchema);
