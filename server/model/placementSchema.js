const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');

const placementSchema = new mongoose.Schema({
    userName:{
        type: 'string',
        required:'true'
    },
    name:{
        type: 'string',
        
    },
    password:{
        type: 'string',
        required:'true'
    },
    email:{
        type: 'string',
    },
    phone:{
        type:Number,
    },
    department:{
        type: 'string',
    },
    address:{
        type: 'string',
    },
    role:{
        type: 'string',
        default:'placement'
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

placementSchema.methods.generateAuthToken = async function() {
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


const Placement = mongoose.model('Placement',placementSchema);

module.exports = Placement;