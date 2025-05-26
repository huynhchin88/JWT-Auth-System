const mongo = require('mongoose');

const UserSchema = new mongo.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongo.model('User', UserSchema);