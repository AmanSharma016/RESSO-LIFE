const mongoose = require("mongoose");//for including schema
const Schema = mongoose.Schema;//for including schema from moogose 

const userDetailSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const userDetail = mongoose.model("userDetail",userDetail);
module.exports = userDetail;