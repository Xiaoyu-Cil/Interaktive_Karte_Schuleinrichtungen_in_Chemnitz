const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: false},
    ORT: {type: String, required: true},
    PLZ: {type: String, required: true},
    favorite: { type: String, required: false },
    isPoweruser: {type: Boolean, required: true},
    deleted: {type: Boolean, required: true}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports =  mongoose.model("userChemnitz", userSchema, "user");