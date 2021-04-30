const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({

    students:{
        type: "Boolean",
        default: "false"
    },
    
    companies:{
    type: "Boolean",
    default: "false"
    },
    
    placementCoordinators:{
    
    type: "Boolean",
    default: "false"
    },
    
    title:{
     type:"String",
     required:true
    },
    
    message:{
     type:"String",
     required:true
    },
    
    creatorUserName:{
     type:"String",
    },

    creatorRole:{
        type:"String",
    },
    
    date:{
    type:"Date",
    default: Date.now
    }
});

const Notification = mongoose.model('Notification',notificationSchema);

module.exports = Notification;