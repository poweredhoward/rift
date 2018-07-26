const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    units: [{
        type: Schema.Types.ObjectId,
        ref: "Unit"
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;