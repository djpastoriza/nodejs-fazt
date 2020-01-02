const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema;

const commentSchema = new Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    comment:{
        type:String
    },
    timestamp:{
        type:String,
        default:Date.now
    },
    image_id:{
        type:ObjectId
    },
    gravatar:{
        type:String
    }
})


module.exports = mongoose.model('comment',commentSchema);