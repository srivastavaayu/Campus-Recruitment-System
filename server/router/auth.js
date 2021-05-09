const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

require('../db/conn');

const Student = require('../model/studentSchema');
const Placement = require('../model/placementSchema');
const Company = require('../model/companySchema');
const Admin = require('../model/adminSchema');
const authentication = require("../middleware/authentication");

//signup
router.post("/registerUser",async (req,res)=>{
    console.log(req.body);
    const member = req.body.member;
    if(member=="Company"){
        console.log("Inside Company");
        const { userName,password,rpassword,name,email} = req.body;

        if(!userName ||  !password || !rpassword || !name || !email){
            return res.status(422).json({error : "Plz filled the details"});
        }

        try{
            const companyExist = await Company.findOne({userName});
            if(companyExist){
                return res.status(422).json({message : "Already Company with this Username registered"});
            }
            if(password !== rpassword){
                return res.status(422).json({message : "Both Password must be same"});
            }
            const company = new Company({userName,password,name,email});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            company.password = await bcrypt.hash(company.password, salt);
    
        
            await company.save();

            res.status(201).json({message : "Company registered successfully"});



        }catch(err){
            console.log(err);
        }

    }else if(member=="Student"){

        console.log("Inside Student");
        const { userName,password,rpassword,name,email} = req.body;

        if(!userName ||  !password || !rpassword || !name || !email){
            return res.status(422).json({error : "Plz filled the details"});
        }

        try{
            const studentExist = await Student.findOne({userName});
            if(studentExist){
                return res.status(422).json({message : "Already Student with this Username registered"});
            }
            if(password !== rpassword){
                return res.status(422).json({message : "Both Password must be same"});
            }
            const student = new Student({userName,password,name,email});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            student.password = await bcrypt.hash(student.password, salt);
    
        
            await student.save();

            res.status(201).json({message : "Student registered successfully"});



        }catch(err){
            console.log(err);
        }
    }else if(member=="Placement Coordinator"){

        console.log("Inside Placement Coordinator");
        const { userName,password,rpassword,name,email} = req.body;

        if(!userName ||  !password || !rpassword  || !name || !email){
            return res.status(422).json({error : "Plz filled the details"});
        }

        try{
            const placementExist = await Placement.findOne({userName});
            if(placementExist){
                return res.status(422).json({message : "Already Placement Coordinator with this Username registered"});
            }
            if(password !== rpassword){
                return res.status(422).json({message : "Both Password must be same"});
            }
            const placement = new Placement({userName,password,name,email});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            placement.password = await bcrypt.hash(placement.password, salt);
    
        
            await placement.save();

            res.status(201).json({message : "Placement Coordinator registered successfully"});



        }catch(err){
            console.log(err);
        }

    }
})

router.post('/register',async (req,res)=>{
    //console.log(req.body.role);
    const role = req.body.role;
    if (role == 'company'){
        console.log("Inside Company");
        const { userName,name,password,email,phone,companyLink,companyDescription,address,criteria} = req.body;

        if(!userName || !name || !password || !email || !phone || !companyLink || !companyDescription){
            return res.status(422).json({error : "Plz filled the details"});
        }

        try{
            const companyExist = await Company.findOne({userName});
            if(companyExist){
                return res.status(422).json({error : "Already Company registered"});
            }
            const company = new Company({userName,name,password,email,phone,companyLink,companyDescription,address,criteria});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            company.password = await bcrypt.hash(company.password, salt);
    
        
            await company.save();

            res.status(201).json({message : "Company registered successfully"});



        }catch(err){
            console.log(err);
        }
    }else if (role =='student'){
        console.log("Inside student");
        const { userName, password,name,email,phone,address,department,portfolio,links} = req.body;
        //console.log(userName, password, name, email,phone,address,department,portfolio,links);

        if ( !userName || !password || !name || !email || !phone || !department){
            return res.status(422).json({error : "Plz filled the details"});
        }
        try{
            const companyExist = await Student.findOne({userName});
            if(companyExist){
                return res.status(422).json({error : "Already userName registered"});
            }
            const student = new Student({userName, password, name, email, phone,address, department, portfolio, links});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            student.password = await bcrypt.hash(student.password, salt);
    
        
            await student.save();

            res.status(201).json({message : "student registered successfully"});
        }catch(err){
            console.log(err);
        }

    }else if(role=='placement'){
        console.log("Inside placement");
        const {userName,name,password,email,phone,department,address} = req.body;

        if(!userName || !name || !password || !email || !phone || !department){
            return res.status(422).json({error : "Plz filled the details"});
        }
        try{
            const placmentExist = await Placement.findOne({userName});
            if(placmentExist){
                return res.status(422).json({error : "Already UserName registered"});
            }
            const placement = new Placement({userName,name,password,email,phone,department,address});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            placement.password = await bcrypt.hash(placement.password, salt);
    
        
            await placement.save();

            res.status(201).json({message : "placement registered successfully"});



        }catch(err){
            console.log(err);
        }

    }else if(role=='admin'){
        console.log("Inside admin");
        const {userName,name,password,email,phone}=req.body;
        if(!userName || !name || !password || !email || !phone){
            return res.status(422).json({error : "Plz filled the details"});
        }
        try{
            const adminExist = await Admin.findOne({userName});
            if(adminExist){
                return res.status(422).json({error : "Already username registered"});
            }
            const admin = new Admin({userName,name,password,email,phone});

            // generate salt to hash password
            const salt = await bcrypt.genSalt(12);
            // now we set user password to hashed password
            admin.password = await bcrypt.hash(admin.password, salt);
    
        
            await admin.save();

            res.status(201).json({message : "Admin registered successfully"});



        }catch(err){
            console.log(err);
        }
        
    }
});

//Login 

router.post('/login',async (req,res)=>{
    const member = req.body.member;
    console.log(req.body);
    if(member=='Student'){
        console.log("Inside Student");
        const {userName,password} = req.body;
        console.log(userName,password);
        try{
            const studentLogin = await Student.findOne({userName});
            //console.log(!(studentLogin.accept));
            if(studentLogin){
                if(!(studentLogin.accept)){
                    return res.status(402).json({message : "Once a Placement Coordinator or Admin will Verify You :)"});
                }
                const validPassword = await bcrypt.compare(password, studentLogin.password);
                if(validPassword){

                    //tokenization
                    token = await studentLogin.generateAuthToken();
                    console.log(token);

                    res.cookie("jwtoken",token,{ 
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                    });

                    res.cookie("member",member,{ 
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                        });
                        
                    return res.status(202).json({message : studentLogin});
                }else{
                    return res.status(402).json({message : "Invalid Credantials"});
                }
            }else{
                return res.status(402).json({message : "UserName does not exist"});
            }
        }catch(err){
            console.log(err);
        }
    }else if(member == 'Placement Coordinator'){
        console.log("Inside placement");
        const {userName,password} = req.body;
        try{
            const placementLogin = await Placement.findOne({userName});
            
            if(placementLogin){
                if(!(placementLogin.accept)){
                    return res.status(402).json({message : "Once a Admin will Verify You :)"});
                }
                const validPassword = await bcrypt.compare(password, placementLogin.password);
                if(validPassword){

                    //tokenization
                    token = await placementLogin.generateAuthToken();
                    console.log(token);

                    res.cookie("jwtoken",token,{ 
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                    });

                    res.cookie("member",member,{ 
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                        });

                    return res.status(202).json({message : placementLogin});
                }else{
                    return res.status(402).json({message : "Invalid Credantials"});
                }
            }else{
                return res.status(402).json({message : "UserName does not exist"});
            }
        }catch(err){
            console.log(err);
        }
    }else if(member == 'Company'){
        console.log("Inside Company");
        const {userName,password} = req.body;
        try{
            const companyLogin = await Company.findOne({userName});
            
            if(companyLogin){
                if(!(companyLogin.accept)){
                    return res.status(402).json({message : "Once a Placement Coordinator or Admin will Verify You :)"});
                }
                const validPassword = await bcrypt.compare(password, companyLogin.password);
                if(validPassword){

                    token = await companyLogin.generateAuthToken();
                    console.log(token);

                    res.cookie("jwtoken",token,{ 
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                    });

                    res.cookie("member",member,{ 
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                        });

                    return res.status(202).json({message : companyLogin});
                }else{
                    return res.status(402).json({message : "Invalid Credantials"});
                }
            }else{
                return res.status(402).json({message : "UserName does not exist"});
            }
        }catch(err){
            console.log(err);
        }
    }else if(member == 'Admin'){
        console.log("Inside admin");
        const {userName,password} = req.body;
        try{
            const adminLogin = await Admin.findOne({userName});
            if(adminLogin){
                const validPassword = await bcrypt.compare(password, adminLogin.password);
                if(validPassword){

                    token = await adminLogin.generateAuthToken();
                    console.log(token);

                    res.cookie("jwtoken",token,{ 
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                    });

                    res.cookie("member",member,{ 
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                        });


                    return res.status(202).json({meassage : adminLogin});
                }else{
                    return res.status(402).json({meassage : "Invalid Credantials"});
                }
            }else{
                return res.status(402).json({meassage : "UserName does not exist"});
            }
        }catch(err){
            console.log(err);
        }
    }
});


router.get("/userData",authentication,(req,res)=>{
    console.log("Hello user data!");
    res.send(req.rootUser);
});


//manage Users

router.get("/pendingUser",authentication,async (req,res)=>{
    const role = req.rootUser.role;
    console.log(role);
    //res.send("listening");
    const user = req.body.user;
    console.log(user);
    let users;
    if (role =="placement"){
        
        if (user=="Student"){
            users= await Student.find({accept:false});
        }else if(user=="Company"){
            users= await Company.find({accept:false});
        }
        
    }else if(role=="admin"){
        if (user=="Student"){
            users= await Student.find({accept:false});
        }else if(user=="Company"){
            users= await Company.find({accept:false});
        }else if(user=="Placement Coordinator"){
            users = await Placement.find({accept:false});
        }
    }
    res.send(users);
});
module.exports = router;