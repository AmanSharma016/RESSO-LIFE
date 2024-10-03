const express = require("express"); // for including express
const app = express(); // for naming express
const mongoose = require("mongoose"); // for including mongoose
const Listing = require("./models/listing.js"); // for getting listing file
const path = require("path"); // for working with various working directories and working files
const methodOverride = require("method-override"); // to use methods like put or delete
const ejsMate = require("ejs-mate");
const asyncHandler = require("./utils/async.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/re-live"; // for establishing db and setting its name

// Main function to establish db
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// For setting up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Root or landing page
app.get("/", (req, res) => {
  res.send("I am at my beginning era");
});

//error
const validation= (req, res, next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errMsg);
  }else{
  next();
  }
}

// Index Route
app.get("/listings", asyncHandler(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
}));

//Login
app.get("/listings/login",asyncHandler(async(req, res)=>{
  res.render("./listings/login.ejs");
}));

//Register
app.get("/listings/register",asyncHandler(async(req, res)=>{
  res.render("./listings/register");
}));

// New Route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// Read Route
app.get("/listings/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).send("Listing not found");
  }

  res.render("listings/read.ejs", { listing });
}));

//manipulating db
// Create Route
app.post("/listings", validation, asyncHandler(async (req, res) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(req)
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}}));

// Edit Route
app.get("/listings/:id/edit",asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).send("Listing not found");
  }

  res.render("listings/edit.ejs", { listing });
}));

// Update Route
app.put("/listings/:id",asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

  if (!updatedListing) {
    return res.status(404).send("Listing not found");
  }

  res.redirect(`/listings/${id}`);
}));

// Delete Route
app.delete("/listings/:id", validation, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    return res.status(404).send("Listing not found");
  }

  res.redirect("/listings");
}));

app.all("*",(req, res, next) =>{
  res.status(404).send("Page Not Found");
})

//error handelling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err; // Default to 500 if statusCode is undefined
  res.status(statusCode); // Set the status code
  res.render("error.ejs", { message });
});


app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
