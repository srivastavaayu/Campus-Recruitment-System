const express = require("express");
const router = express.Router();

require("../db/conn");

const Job = require("../model/jobSchema");
const authentication = require("../middleware/authentication");
const Company = require("../model/companySchema");

router.post("/companyDescription",authentication,async (req, res) => {
    //console.log("Listeneing");
    //console.log(req.body);
    const name = req.body.creator;
    try{
        const data = await Company.findOne({name});
        //console.log(data);
        return res.status(202).send(data);
    }catch(err){
        console.log(err);
        return res.status(502).json({message:"DataBase Error"});
        
    }
});



module.exports = router;