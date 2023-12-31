const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname : {
        type : String,
        required : true,
    },
    lname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const userModel = mongoose.model('user',userSchema);

module.exports = {userModel}
