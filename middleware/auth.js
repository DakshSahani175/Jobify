import jwt from "jsonwebtoken";
import { UNAUTHORIZED_USER } from "../errors/index.js";

const auth = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        throw new UNAUTHORIZED_USER("Invalid Authentication!")
    }


    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        const testUser = (payload.userId === "648d6d5858b823843fa914de");
        req.user = {userId: payload.userId, testUser};
        
        next();
    } 
    catch(err){
        throw new UNAUTHORIZED_USER("Invalid Authentication");
    }
}

export default auth;