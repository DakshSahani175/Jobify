import express from "express";
const router = express.Router();

import {
    createJob, 
    deleteJob,
    getAllJob,
    updateJob,
    showStats
} from "../controllers/jobController.js";

// middleware:
import testUser from "../middleware/testUser.js";

router.route("/").post(testUser, createJob).get(getAllJob);
router.route("/stats").get(showStats);
router.route("/:id").delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;