const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');


const studentSchema = new mongoose.Schema({
    userName:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
    },
    department:{
        type:String,
        required: true
    },
    portfolio:{
        type:'string'
    },
    links:{
        type:'string'
    },
    role:{
        type:'string',
        default:'student'
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]
})

studentSchema.methods.generateAuthToken = async function() {
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

const Student = mongoose.model('STUDENT',studentSchema);

module.exports = Student;