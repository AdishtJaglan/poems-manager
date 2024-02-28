const mongoose = require("mongoose");
const { Schema } = mongoose;

const PoemSchema = new Schema({
    poem: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Poem", PoemSchema);