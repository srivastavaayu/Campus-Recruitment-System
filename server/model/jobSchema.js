const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    jobId:{
        type :"String",
        required:true
    },
    title:{
        type:"String",
        required:true
    },
    ctc:{
        type:"String",
        default:"Not specify"
    },
    creatorName:{
        type:"String",
        required:true
    },

    createdAt:{
        type:"Date",
        default:Date.now()
    }

});

const Job = mongoose.model('Job',jobSchema);

module.exports = Job;