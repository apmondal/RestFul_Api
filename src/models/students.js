const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id is already present!"],
        validate(val) {
            if(!validator.isEmail(val)) {
                throw new Error("Invalid email!");
            }
        }
    },
    phoneno: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;