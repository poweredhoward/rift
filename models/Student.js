const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    key: {
        type: String,
        required: true,
        unique: true,
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;