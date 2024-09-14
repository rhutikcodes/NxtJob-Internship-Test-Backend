import UserModel from "./user.schema.js";

// Create a new user.
export const createNewUserRepo = async(user) => {
    return await new UserModel(user).save();
}

// Find something in db.
export const findUserRepo = async (factor, withPassword = false) => {
    if(withPassword) return await UserModel.findOne(factor).select("+password");
    else return await UserModel.findOne(factor);
}

// Get all data from DB.
export const findUserListRepo = async() => {
    return await UserModel.find();
}
