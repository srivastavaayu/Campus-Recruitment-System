const express = require("express");
const router = express.Router();

require("../db/conn");

const Student = require("../model/studentSchema");
const Admin = require("../model/adminSchema");
const Placement = require("../model/placementSchema");
const Company = require("../model/companySchema");
const authentication = require("../middleware/authentication");

router.post("/newUserData", authentication, async (req, res) => {
  const member = req.rootUser.role;
  try {
    if (member == "placement") {
      const user = req.body.user;
      console.log(user);
      let result;
      if (user == "Student") {
        result = await Student.find({ accept: false });
      } else if (user == "Company") {
        result = await Company.find({ accept: false });
      }

      if (result) {
        res.send(result);
      } else {
        res.status(202).json({ message: "No pending Users" });
      }
    } else if (member == "admin") {
      const user = req.body.user;
      let result;
      if (user == "Student") {
        result = await Student.find({ accept: false });
      } else if (user == "Company") {
        result = await Company.find({ accept: false });
      } else if (user == "Placement Coordinator") {
        result = await Placement.find({ accept: false });
      }

      if (result) {
        res.send(result);
      } else {
        res.status(202).json({ message: "No pending Users" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
