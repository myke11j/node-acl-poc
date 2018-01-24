
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * user Schema
 */
var UserSchema = new Schema({


    name: {
        firstName: {
            type: String
        },
        middleName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        }
    },
    mobile: {
        number: {
            type: Number,
            default: 0,
            index: true 
        },
        isVerified: {
            type: Boolean,
            default:false
        },
        otp: {
            type: Number,
            default: 0
        }
    },
    email: {
        id: {
            type: String,
            default: '',
            index: true 
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationHash: {
            type: String,
            default: ''
        },
        otp: {
            type: Number,
            default: 0
        }
    },
    social: [
        {
            type:{type:String,default:null},// google/facebook
            token:{type:String,default:null},
            emailId:{type:String,default:null},
            mobile:{type:String,default:null},
            details: {
                firstname:{type:String,default:null},
                lastname:{type:String,default:null},
                gender:{type:String,default:null},
                photoUrl:{type:String,default:null},
                locale:{type:String,default:null},
            },
            createdDate: {
                type: Date,
                default: Date.now
            }
        }
    ],

    
    token:{type:String,default:null},
    password: {
        type: String,
        default:'',
        index: true 
    },
    source : {type:String,default:null},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
       
        default: Date.now
    },
    isActive: {
        type:Boolean,
        default: true
    }
    

});

module.exports=mongoose.model('User', UserSchema);