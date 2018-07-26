const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
          function(input) {
            return input.length >= 6;
          },
          "Password should be longer."
        ]
    },
    classrooms: [{
        type: Schema.Types.ObjectId,
        ref: "Classroom"
    }]
});

const Teacher = mongoose.model("Student", teacherSchema);

module.exports = Teacher