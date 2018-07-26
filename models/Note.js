const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    file: {
        type: Blob
    },
    rating: {
        type: Number
    },
    flag_author_type: [student, teacher]
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;