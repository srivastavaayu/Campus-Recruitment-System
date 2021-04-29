const jwt = require("jsonwebtoken");
const Student = require("../model/studentSchema");
const Admin = require("../model/adminSchema");
const Placement = require("../model/placementSchema");
const Company = require("../model/companySchema");


const Authenticate = async (req,res,next) =>{
    try{

        const token = req.cookies.jwtoken;
        const member = req.cookies.member;
        let rootUser;
        console.log(token);
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        if(member=="Student"){
            rootUser = await Student.findOne({_id:verifyToken._id, "tokens.token":token});
        }else if (member=="Placement Coordinator"){
            rootUser = await Placement.findOne({_id:verifyToken._id, "tokens.token":token});
        }else if(member=="Company"){
            rootUser = await Company.findOne({_id:verifyToken._id, "tokens.token":token});
        }else if(member=="Admin"){
            rootUser = await Admin.findOne({_id:verifyToken._id, "tokens.token":token});
        }


        if(!rootUser){
            throw new Error("User not Found");
        }

        req.token=token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(err){
        res.status(401).send("Unauthorized:No token provided");
        console.log(err);
    }
}

module.exports = Authenticate;