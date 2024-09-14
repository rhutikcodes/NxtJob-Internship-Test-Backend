import { encryptedPwd, passwordMatch } from "../../../middleware/encryptPwd.js";
import { decodeToken } from "../../../utils/decodeToken.js";
import { sendWelcomeEmail } from "../../../utils/email/welcomeMail.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { sendToken } from "../../../utils/sendToken.js";
import { createNewUserRepo, findUserListRepo, findUserRepo } from "../model/user.repository.js";

export const createNewUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        let user = {
            name, email,
            "password": await encryptedPwd(password)
        };

        // Save the new user.
        const newUser = await createNewUserRepo(user);
        console.log(newUser, "newUserr.r.....");
        await sendToken(newUser, res, 200);

        // Send welcome mail.
        await sendWelcomeEmail(newUser);
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            return next(new ErrorHandler(400, "Email is already registered."));
        }else {
            return next(new ErrorHandler(400, error));
        }
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // If no email and password.
        if(!email || !password) {
            return next(new ErrorHandler(400, "Please enter email and password."))
        }

        // If no user found.
        const user = await findUserRepo({email}, true);
        console.log(user, "user data...");

        if (!user) {
            return next(
                new ErrorHandler(401, "user not found! please register!!")
            );
        }

        // Check for password.
        const isPasswordMatch = await passwordMatch(password, user.password);
        console.log(isPasswordMatch, "password match...");

        if (!isPasswordMatch) {
            return next(new ErrorHandler(401, "Invalid passsword!"));
        }

        // After successful login, send token.
        await sendToken(user, res, 200);
    } catch (error) {
        return next(new ErrorHandler(400, error));
    }
}

export const getUserDetail = async (req, res, next) => {
    const token = req.headers.authorization;
    const getUserIdFromToken = decodeToken(token);

    const user = await findUserRepo({"_id": getUserIdFromToken.id});
    if (!user) {
        return next(
            new ErrorHandler(401, "user not found! please register!!")
        );
    }

    return res.status(200).json({
        success: true,
        userData: user
    });
}

export const getAllUser = async (req, res, next) => {
    try {
        const userData = await findUserListRepo();

        // Check for no user.
        if(!userData) {
            return next(
                new ErrorHandler(401, "No users available, expect you.")
            );
        }

        return res.status(200).json({
            success: true,
            userData: userData
        })
    } catch (error) {
        return next(new ErrorHandler(400, error));
    }
}

export const getUserById = async (req, res, next) => {
    const {userId} = req.params;
    
    // If no user found.    
    const user = await findUserRepo({_id: userId}, true);
    if (!user) {
        return next(
            new ErrorHandler(401, "user not found! please register!!")
        );
    }

    return res.status(200).json({
        success: true,
        userData: user
    });
}

export const logout = async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({ success: true, msg: "Logout Successful." });
}