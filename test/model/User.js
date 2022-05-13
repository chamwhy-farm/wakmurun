const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    nick: {type: String},
    snsId: {type: String, required: true, unique: true},
});

const model = mongoose.model("User", UserSchema);
module.exports = model;