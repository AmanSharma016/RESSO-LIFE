const mongoose = require("mongoose");//for including schema
const Schema = mongoose.Schema;//for including schema from moogose 

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: 'defaultImage',
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          : v,
    },
  },
  price: {
    type: Number,
    min: 100,
    max: 10000,
  },
  location: String,
  country: String,
  reviews:[
  {
    type: Schema.Types.ObjectId,
    referece:"Review"
  }]
});

const Listing = mongoose.model("Listing", listingSchema);//for setting up schema
module.exports = Listing;//for exporting db schema
