const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    poems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Poem",
        },
    ],
});

module.exports = mongoose.model("User", UserSchema);