const express = require('express');
const router = express.Router();

require('../db/conn');

const Student = require("../model/studentSchema");
const Admin = require("../model/adminSchema");
const Placement = require("../model/placementSchema");
const Company = require("../model/companySchema");
const authentication = require("../middleware/authentication");


router.post("/update",authentication,async (req,res)=>{
    console.log("inside Update function");
    console.log(req.rootUser.role);
    console.log(req.body);
    const member = req.rootUser.role;
    if(member=='student'){
        const {userName,name,email,phone,address,department,portfolio,links} = req.body;
        try{
            const studentUpdate = await Student.updateOne({userName},{$set:{name,email,phone,address,department,portfolio,links}});
            if(studentUpdate){
                return res.status(202).json({message: "Update Successful"});
            }else{
                return res.status(502).json({message: "Update InSuccessful"});
            }
        }catch(e){
            console.log(e);
        }
    }else if(member=='placement'){
        const {userName,name,email,phone,address,department} = req.body;
        try{
            const placementUpdate = await Placement.updateOne({userName},{$set:{name,email,phone,address,department}});
            if(placementUpdate){
                return res.status(202).json({message: "Update Successful"});
            }else{
                return res.status(502).json({message: "Update InSuccessful"});
            }
        }catch(e){
            console.log(e);
        }
    }else if(member=='admin'){
        const {userName,name,email,phone} = req.body;
        try{
            const placementUpdate = await Admin.updateOne({userName},{$set:{name,email,phone}});
            if(placementUpdate){
                return res.status(202).json({message: "Update Successful"});
            }else{
                return res.status(502).json({message: "Update InSuccessful"});
            }
        }catch(e){
            console.log(e);
        }
    }else if(member=='company'){
        const {userName,name,email,phone,address,companyLink} = req.body;
        try{
            const companyUpdate = await Company.updateOne({userName},{$set :{name,email,phone,address,companyLink}});
            if(companyUpdate){
                return res.status(202).json({message: "Update Successful"});
            }else{
                return res.status(502).json({message: "Update InSuccessful"});
            }
        }catch(e){
            console.log(e);
        }
    }
});



module.exports=router;