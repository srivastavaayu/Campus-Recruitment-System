const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');

const companySchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    companyLink:{
        type: 'string',
        required: true
    },
    companyDescription:{
        type: 'string',
        required: true
    },
    address:{
        type: 'string',
    },
    criteria:{
        type:Number
    },
    role:{
        type: 'string',
        default: 'company'
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]
});

companySchema.methods.generateAuthToken = async function() {
    try{
        //console.log("hi from tokens");
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        //console.log(token);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const Company = mongoose.model('Company',companySchema);

module.exports = Company;