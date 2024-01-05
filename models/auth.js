const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Password hashing middleware
userAuthSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userAuth = mongoose.model('User', userAuthSchema);

module.exports = {
    userAuth,
    userAuthSchema
}