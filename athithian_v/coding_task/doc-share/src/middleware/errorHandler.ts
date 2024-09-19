
export default class ApplicationError extends Error{
    code:number;
    constructor(code:number, message:string){
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ApplicationError.prototype);
        this.name = "ApplicationError";
    }
}