import { UNAUTHORIZED_USER } from "../errors/index.js";

const checkPermision = (requestUser, resourceUserId)=>{
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new UNAUTHORIZED_USER("Not Authorized to access this route.")
} 

export default checkPermision;