

export const createNewUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            return next()
        }
    }
}

export const userLogin = async (req, res, next) => {

}

export const getUserDetail = async (req, res, next) => {

}

export const getAllUser = async (req, res, next) => {

}

export const getUserById = async (req, res, next) => {

}

export const logout = async (req, res, next) => {

}