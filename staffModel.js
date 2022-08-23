const mongoose = require("mongoose");

const staff = new mongoose.Schema({
    fullname : {
        type : String,
        required : [true, "Fullname is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"]
    },
    password : {
        type : String,
        required : [true, 'Password if required']
    }
});

module.exports = mongoose.model('Staff', staff);