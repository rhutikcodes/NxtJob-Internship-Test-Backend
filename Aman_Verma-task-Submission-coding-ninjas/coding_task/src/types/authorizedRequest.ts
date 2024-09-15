import { Request } from "express"

interface User{
    userId : string,
    username: string,
    email: string,
}


export interface AuthorizedRequest extends Request{
    user?: User
}