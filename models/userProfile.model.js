/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* user Schema
*/
var UserProfileSchema = new Schema({

userId: {
    type: Schema.Types.ObjectId, ref: 'User', index: true
},
userName: {
    name: {
        type: String
    },
    isSystemGenerated: {
        type: Boolean,
        default: false
    }
},
preferences: {
    isPublicVisible: {
        type: Boolean,
        default: true
    },
},
stage: {
    type: String,
    default: ''
},
goals: [
    {
        name: {
            type: String,
            default: ''
        },
        targetYear: {
            type: Number,
            default: ''
        },
        rank: {
            type: Number,
            default: 0
        },
        courseId: {
            type: Schema.Types.ObjectId  //courseId
        }
    }
],
photoUrl: { type: String, default: null },
photoUrlThumb:{ type: String, default: null },

class: {
    classId: {   //classId
        type: Schema.Types.ObjectId,
        default: null
    },
    name: {
        type: String,
        default: ''
    },
    sessionYear: {
        type: Number,
        default: 0

    }
},
school: {
    name: {
        type: String,
        default: ''
    },
    id: {   //schoolId
        type: Schema.Types.ObjectId,
        default: null
    },
},

location: {
    latitute: {
        type: String,
        default: ''
    },
    longitute: {
        type: String,
        default: ''
    },
    address: {
        firstLine: {
            type: String,
            default: ''
        },
        secondLine: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        pin: {
            type: String,
            default: ''
        },
        //fill which fields are valid and avaiable
    }

}
,
partner: { //null if not partner
    name: String,
    partnerId: Schema.Types.ObjectId,
    data: {
        //Dynamic bbased on loginMechanism in partner objects
        enrolmentNo: String,
        studentId: String,
        password: String
    }


},

//enrollmentNumber:String,
webAccessCode: {
    type: String,
    default: ''
},
createdAt: {
    type: Date,
    default: Date.now
},
updatedAt: {
    type: Date,
    default: Date.now
}


});

module.exports = mongoose.model('UserProfile', UserProfileSchema);


