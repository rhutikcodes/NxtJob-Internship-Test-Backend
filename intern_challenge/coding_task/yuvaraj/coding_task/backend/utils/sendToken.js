
// Send token to user and store them in cookie.
export const sendToken = async (user, res, statusCode) => {
    console.log(user, "userr...");
    const token = user.getJWTToken();

    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    const userDetails = {
        _id: user.id,
        name: user.name,
        email: user.email
    }

    return res.status(statusCode).cookie("token", token, cookieOption).json({success: true, userDetails, token});
}