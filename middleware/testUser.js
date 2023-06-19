import { BAD_REQUEST } from "../errors/index.js";

const testUser = (req, res, next)=>{
    if(req.user.testUser){
        throw new BAD_REQUEST("Test user. Read Only!");
    }
    next();
}

export default testUser;