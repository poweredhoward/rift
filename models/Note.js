const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    file: {
        type: String
    },
    rating: {
        type: Number
    },
    flag_author_type: ["student", "teacher"]
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;