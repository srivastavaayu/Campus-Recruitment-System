const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

require('../db/conn');

const Student = require("../model/studentSchema");
const Admin = require("../model/adminSchema");
const Placement = require("../model/placementSchema");
const Company = require("../model/companySchema");
const authentication = require("../middleware/authentication");


router.post('/updatePassword',authentication, async (req,res)=>{

    console.log(req.body);

    const member = req.rootUser.role;
    
    if(member=='student'){
        const userName = req.rootUser.userName;
        const {cpassword,npassword,rpassword} = req.body;

        if(npassword !== rpassword){
            return res.status(402).json({message: "Both Password will be same"});
        }

        try{

            let password;

            const user = await Student.findOne({userName});

            const validPassword = await bcrypt.compare(cpassword, user.password);

            if(validPassword){
                // generate salt to hash password
                const salt = await bcrypt.genSalt(12);
                // now we set user password to hashed password
                password = await bcrypt.hash(npassword, salt);

                const studentPassword = await Student.updateOne({userName},{$set:{"password":password}});

                if(studentPassword){
                    return res.status(202).json({message: "Update Successful"});
                }else{
                    return res.status(502).json({message: "Update Failure"});
                }
            }else{
                return res.status(444).json({message: "Current Password must be correct"});
            }

            
        }catch(e){
            console.log(e);
        }
    }else if(member =='company'){
        const userName = req.rootUser.userName;
        const {cpassword,npassword,rpassword} = req.body;

        if(npassword !== rpassword){
            return res.status(402).json({message: "Both Password will be same"});
        }

        try{

            let password;

            const user = await Company.findOne({userName});

            const validPassword = await bcrypt.compare(cpassword, user.password);

            if(validPassword){
                // generate salt to hash password
                const salt = await bcrypt.genSalt(12);
                // now we set user password to hashed password
                password = await bcrypt.hash(npassword, salt);

                const comapnyPassword = await Company.updateOne({userName},{$set:{"password":password}});

                if(comapnyPassword){
                    return res.status(202).json({message: "Update Successful"});
                }else{
                    return res.status(502).json({message: "Update Failure"});
                }
            }else{
                return res.status(444).json({message: "Current Password must be correct"});
            }

            
        }catch(e){
            console.log(e);
        }

    }else if(member=='admin'){
        const userName = req.rootUser.userName;
        const {cpassword,npassword,rpassword} = req.body;

        if(npassword !== rpassword){
            return res.status(402).json({message: "Both Password will be same"});
        }

        try{

            let password;

            const user = await Admin.findOne({userName});

            const validPassword = await bcrypt.compare(cpassword, user.password);

            if(validPassword){
                // generate salt to hash password
                const salt = await bcrypt.genSalt(12);
                // now we set user password to hashed password
                password = await bcrypt.hash(npassword, salt);

                const adminPassword = await Admin.updateOne({userName},{$set:{"password":password}});

                if(adminPassword){
                    return res.status(202).json({message: "Update Successful"});
                }else{
                    return res.status(502).json({message: "Update Failure"});
                }
            }else{
                return res.status(444).json({message: "Current Password must be correct"});
            }

            
        }catch(e){
            console.log(e);
        }
    }else if(member =='placement'){
        const userName = req.rootUser.userName;
        const {cpassword,npassword,rpassword} = req.body;

        if(npassword !== rpassword){
            return res.status(402).json({message: "Both Password will be same"});
        }

        try{

            let password;

            const user = await Placement.findOne({userName});

            const validPassword = await bcrypt.compare(cpassword, user.password);

            if(validPassword){
                // generate salt to hash password
                const salt = await bcrypt.genSalt(12);
                // now we set user password to hashed password
                password = await bcrypt.hash(npassword, salt);

                const placementPassword = await Placement.updateOne({userName},{$set:{"password":password}});

                if(placementPassword){
                    return res.status(202).json({message: "Update Successful"});
                }else{
                    return res.status(502).json({message: "Update Failure"});
                }
            }else{
                return res.status(444).json({message: "Current Password must be correct"});
            }

            
        }catch(e){
            console.log(e);
        }
    }

});




module.exports = router;