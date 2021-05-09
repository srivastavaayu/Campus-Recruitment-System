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

//all verify user data
router.post("/verifyUserData", authentication, async (req, res) => {
  const member = req.rootUser.role;
  try {
    if (member == "placement") {
      const user = req.body.user;
      console.log(user);
      let result;
      if (user == "Student") {
        result = await Student.find({ accept: true });
      } else if (user == "Company") {
        result = await Company.find({ accept: true });
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
        result = await Student.find({ accept: true });
      } else if (user == "Company") {
        result = await Company.find({ accept: true });
      } else if (user == "Placement Coordinator") {
        result = await Placement.find({ accept: true });
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

router.post("/verifyUser", authentication, async (req, res)=>{

  //backend code for verify user
  const member = req.rootUser.role;
  try {
    if (member == "placement") {
        const {user,userName,name} = req.body;
        console.log(user);
        let result;
        if (user == "Student") {
          result = await Student.updateOne({ userName},{$set :{accept: true}});
        } else if (user == "Company") {
          result = await Company.updateOne({ userName},{$set :{accept: true}});
        }

        if (result) {
          return res.status(202).json({message: "User Verified  Successful :)"});
        } else {
          return res.status(502).json({ message: "Due to Some DataBase Problem .. Update Failed :)"});
        }
    } else if (member == "admin") {
        const {user,userName,name} = req.body;
        let result;
        if (user == "Student") {
          result = await Student.updateOne({ userName},{$set :{accept: true}});
        } else if (user == "Company") {
          result = await Company.updateOne({ userName},{$set :{accept: true}});
        } else if (user == "Placement Coordinator") {
          result = await Placement.updateOne({ userName},{$set :{accept: true}});
        }

        if (result) {
          return res.status(202).json({message: "User Verified  Successful :)"});
        } else {
          return res.status(502).json({ message: "Due to Some DataBase Problem .. Update Failed :)"});
        }
    }
  } catch (err) {
    console.log(err);
  }

});


//backend code for delete Users
router.post("/deleteUsers",authentication, async (req, res)=>{

  const member = req.rootUser.role;
  try {
    if (member == "placement") {
        const {user,userName,name} = req.body;
        console.log(user);
        let result;
        if (user == "Student") {
          result = await Student.deleteOne({userName});
        } else if (user == "Company") {
          result = await Company.deleteOne({userName});
        }

        if (result) {
          return res.status(202).json({message: "User Deleted  Successful :)"});
        } else {
          return res.status(502).json({ message: "Due to Some DataBase Problem .. Deletion Failed :)"});
        }
    } else if (member == "admin") {
        const {user,userName,name} = req.body;
        let result;
        if (user == "Student") {
          result = await Student.deleteOne({userName});
        } else if (user == "Company") {
          result = await Company.deleteOne({userName});
        } else if (user == "Placement Coordinator") {
          result = await Placement.deleteOne({userName});
        }

        if (result) {
          return res.status(202).json({message: "User Deleted  Successful :)"});
        } else {
          return res.status(502).json({ message: "Due to Some DataBase Problem .. Deletion Failed :)"});
        }
    }
  } catch (err) {
    console.log(err);
  }

});

module.exports = router;
