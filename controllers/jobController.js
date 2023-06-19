import Job from "../models/Jobs.js";
import {StatusCodes} from "http-status-codes";
import { BAD_REQUEST, NOT_FOUND } from "../errors/index.js"
import checkPermision from "../utils/checkPermision.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res)=>{
    const {position, company} = req.body;
    console.log(req.body);
    if(!position || !company){
        throw new BAD_REQUEST("Please provide all values");
    }

    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({job});
}

const deleteJob = async (req, res)=>{
    const {id : jobId} = req.params;

    const job = await Job.findOne({_id: jobId});
    if(!job){
        throw new NOT_FOUND(`No job with id ${jobId} exisits`);
    }

    checkPermision(req.user, job.createdBy);

    await Job.deleteOne({_id: jobId});
    res.status(StatusCodes.OK).json({job});
}

const getAllJob = async(req, res)=>{
    const {search, status, jobType, sort} = req.query;

    
    const queryObj = {
        createdBy: req.user.userId,
    }
    // Add stuf to condition :
    if(status && status !== "all" && status !== "All"){
        queryObj.status = status;
    }
    if(jobType && jobType !== "all" && jobType !== "All"){
        queryObj.jobType = jobType;
    }
    if(search && search!==""){
        queryObj.position = {$regex: search, $options: "i"};
    }

    // No Await
    let result =  Job.find(queryObj);

    // Chain sort condition 

    switch(sort){
        case "latest":
            result = result.sort("-createdAt");
            break;
        case "oldest":
            result = result.sort("createdAt");
            break;
        case "a-z":
            result = result.sort("position");
            break;
        case "z-a":
            result = result.sort("-position");
            break;
        default:
            break;
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1)*limit;

    result = result
    .skip(skip)
    .limit(limit); 

    const jobs = await result;

    const totalJobs = await Job.countDocuments(queryObj);
    const numOfPages = Math.ceil(totalJobs/limit);

    res.status(StatusCodes.OK).json({jobs, totalJobs, numOfPages,})
}
const updateJob = async (req, res)=>{
    const {id: jobId} = req.params;
    const {company, position} = req.body;
    if(!company || !position){
        throw new BAD_REQUEST("Please provide all values");
    }

    const job = await Job.findOne({_id: jobId});
    
    if(!job){
        throw new NOT_FOUND(`No Job with id: ${jobId} exists`);
    }

    // check premision
    checkPermision(req.user , job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json(updatedJob);
}

const showStats = async (req, res)=>{
    let stats = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: "$status" , count: {$sum: 1}}}
    ]);

    stats = stats.reduce((final, curr)=>{
        const {_id: title, count} = curr;
        final[title] = count;
        return final;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }
    let monthlyApplication = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{
            _id: {
                year: {
                    $year: "$createdAt",
                },
                month:{
                    $month: "$createdAt",
                },
            },
            count: { $sum: 1},
        }},
        { $sort: {"_id.year": -1, "_id.month": -1}},
        { $limit: 6 },
    ]);

    monthlyApplication = monthlyApplication.map( (item, index) =>{
        const {_id: {year, month}, count} = item;
        const date = moment().month(month - 1).year(year - 1).format("MMM Y")
        return {date, count};
    })
    .reverse();
    
    res.status(StatusCodes.OK).json({stats: defaultStats, monthlyApplication,});
}

export {createJob , deleteJob, getAllJob, updateJob, showStats};