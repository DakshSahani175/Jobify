import  express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
    windowMs: 15*60*1000, // 15 mins
    max: 10, // Max 10 req from a single Ip address
    message: "Too many req from this IP address, please try again after 15 mins.",
})


import { register, login, updateUser, getCurrentUser, logoutUser } from "../controllers/authController.js";

// middleware :
import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/logout").get(logoutUser)
router.route("/updateUser").patch(authenticateUser , testUser, updateUser);
router.route("/get-current-user").get(authenticateUser, getCurrentUser);
// router.get("/register", async (req, res)=>{
//     res.send("This route exists prety well!");
// })

export default router;