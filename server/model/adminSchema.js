const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    userName:{
        type: 'string',
        required:'true'
    },
    name: {
        type: 'string',
        required:'true',
        default: 'none'
    },
    password: {
        type: 'string',
        required:'true'
    },
    email: {
        type: 'string',
        required:'true',
        default: 'none'
    },
    phone:{
        type: 'string',
        required:'true',
        default: 'none'
    },
    role: {
        type: 'string',
        default: 'admin'
    },
    accept:{
        type:"Boolean",
        default:"false"
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


adminSchema.methods.generateAuthToken = async function() {
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

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;