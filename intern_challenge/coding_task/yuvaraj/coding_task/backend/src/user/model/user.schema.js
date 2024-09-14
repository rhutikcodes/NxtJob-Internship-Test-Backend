import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required."],
    },
    email: {
        type: String,
        required: [true, "User email is required."],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please Enter a password."],
        minLength: [2, "name should have atleast 2 charcters"],
        maxLength: [20, "user name can't exceed 30 characters"],
    }
})

const userModel = mongoose.model("NxtJob", userSchema);
export default userModel;