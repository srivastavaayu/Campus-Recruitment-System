const express = require("express");
const router = express.Router();

require("../db/conn");

const Job = require("../model/jobSchema");
const authentication = require("../middleware/authentication");

router.post("/jobArchive", authentication, async (req, res)=>{
    console.log(req.body);
    const {jobId,title} = req.body;

    const updateJob = await Job.updateOne({jobId},{$set:{archive:true}});

    if(updateJob){
        return res.status(202).json({message:"Job archive successfully"});
    }else{
        return res.status(502).json({message:"Job archive unsuccessful"});
    }
});




module.exports = router;