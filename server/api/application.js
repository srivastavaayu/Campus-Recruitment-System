const express = require("express");
const router = express.Router();

require("../db/conn");

const authentication = require("../middleware/authentication");
const Application = require("../model/applicationSchema");

router.post("/applyJob",authentication, async (req, res)=>{
    console.log(req.body);
    const {jobId,creator,title,description,userName,name,email,phone,department}=req.body;
    const jobDescription = description;
    const creatorName = creator;

    try{

        const applied = await Application.findOne({userName,jobId});

        if (applied){
            return res.status(404).json({message:"You Already applied to this job"});

        }

        const application = new Application({jobId,creatorName,title,jobDescription,userName,name,email,phone,department});

        await application.save();

        return res.status(200).json({message:"Application successfully applied"});

    }catch(err){
        console.log(err);
    }

})

module.exports = router;