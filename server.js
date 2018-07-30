const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridfsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const fs = require("fs");

var mammoth = require("mammoth");


// var session = require("express-session");

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
//setup session
// app.use(session({
//   secret: "whateverwewant",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {secure: "auto", maxAge: 999999999}
// }));

// Init GFS
let gfs;
app.use(express.static("uploads"))

// Setup Gridfs-Stream
var conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/rift");

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("noteuploads");

})

// Create Storage engine
const storage = require('multer-gridfs-storage')({
  url: (process.env.MONGODB_URI || "mongodb://localhost/rift")
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

// Gridfs routes

//get 
app.get("/mammoth", (req, res) =>{
  console.log("inside mammoth");
  mammoth.convertToHtml({path: "uploads/resume.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        // console.log(html);
        var messages = result.messages; // Any messages, such as warnings during conversion
        res.send(html);
    })
    // .done();
})

app.post("/upload", upload.single("file"), (req, res) => {
  // res.json({file: req.file});
  res.redirect("/");
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
const routes = require("./routes/api.js");
app.use(routes);

//Send pdf file
app.get("/pdf", function(req, res){
  console.log("inside pdf get");
  var filepath = "/uploads/cisco.pdf";
  fs.readFile(__dirname + filepath, function(err, data){
    res.contentType("application/pdf");
    console.log(data);
    res.send(data);
  })
})

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rift");
mongoose.Promise = Promise;


app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
