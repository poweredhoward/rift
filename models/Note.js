const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: "File"
    },
    rating: {
        type: Number
    },
    flag_author_type: ["student", "teacher"]
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

