const express = require("express");
const router = express.Router();

require("../db/conn");

const Job = require("../model/jobSchema");
const authentication = require("../middleware/authentication");

router.post("/job", authentication, async (req, res) => {
  console.log("In job");
  const rootUser = req.rootUser;
  //console.log(rootUser.role);
  if (rootUser.role === "company") {
    const { jobId, title, ctc,description } = req.body;
    console.log(jobId, title, ctc,description);

    if (!jobId || !title || !description) {
      return res.status(422).json({ error: "Plz filled the details" });
    }
    try {
      const jobExist = await Job.findOne({ jobId });
      if (jobExist) {
        return res
          .status(422)
          .json({ error: "Already Job with this id registered" });
      }
      const creatorName = rootUser.name;
      let job;
      if (!ctc) {
        job = new Job({ jobId, title, creatorName,description });
      } else {
        job = new Job({ jobId, title, ctc, creatorName,description });
      }

      await job.save();

      return res.status(201).json({ message: "Job registered successfully" });
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  }
});

router.get("/jobopenings", async (req, res) => {
  console.log("Inside job open");
  try {
    const jobopen = await Job.find({archive:false});
    console.log(jobopen.length);
    res.send(jobopen);
  } catch (e) {
    console.log(e);
  }
});

router.get("/alljobopenings", async (req, res) => {
  console.log("Inside job open");
  try {
    const jobopen = await Job.find({});
    console.log(jobopen.length);
    res.send(jobopen);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
