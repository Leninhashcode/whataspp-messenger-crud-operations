const mongoose = require('mongoose')
const { type } = require('os')
let userschema = new mongoose.Schema({
    from : {
        type:String,
        required:true
    },
    to: {
           type:String,
           required:true
    },
    message: {
       type:String,
       maxlength :50
    },
    time : {
       type:Date,
       default:Date.now
    }
})
module.exports= mongoose.model("chat",userschema)






