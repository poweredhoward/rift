const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;