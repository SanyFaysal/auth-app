const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        requried: true,
        trim: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        requried: true,
        trim: true
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} can't be a role",
        },
    },

}, {
    timestamps: true
});

const User = model('User', userSchema)

module.exports = User; 