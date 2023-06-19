import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next)=>{
    console.log(err);
    const defaultErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went Wrong. Please try again later"
    }
    if(err.name === "ValidationError"){
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        defaultErr.message = Object.values(err.errors).map((item)=>item.message).join(", ");
    }
    if(err.code && err.code === 11000){
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        defaultErr.message = Object.keys(err.keyValue).join(", ") + " has to be unique.";
    }
    console.log()
    res.status(defaultErr.statusCode).json({msg: defaultErr.message});
}

export default errorHandlerMiddleware;