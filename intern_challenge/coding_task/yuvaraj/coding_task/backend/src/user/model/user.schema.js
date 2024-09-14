import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

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
    }
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SCERET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

const UserModel = mongoose.model("NxtJob", userSchema);
export default UserModel;