const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;