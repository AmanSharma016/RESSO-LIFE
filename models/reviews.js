const mongoose = require("mongoose");//for including schema
const { type } = require("os");
const Schema = mongoose.Schema;//for including schema from moogose 


const reviewSchema = new Schema({
    comment:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    On:{
        type:Date,
        default:Date.now()
    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;