import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class UNAUTHORIZED_USER extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
};
export default UNAUTHORIZED_USER;