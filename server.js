import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import morgan from "morgan";
import {dirname} from "path";
import { fileURLToPath } from "url";
import path from "path";


import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// db and authentication
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";


if(process.env.NODE_ENV !== "production"){
    app.use(morgan("combined"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./clientbuild")));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res)=>{
    res.send(path.resolve(__dirname, "./client/build", "index.html"));
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(err){
        console.log(err);
    }
};

start();