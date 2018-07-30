const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const multer = require("multer");
var upload = multer({ dest: 'uploads/' });
var db = require("./models");
var fs = require('fs');
var session = require("express-session");

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup session
app.use(session({
  secret: "whateverwewant",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto", maxAge: 999999999}
}));


app.post("/new/:unit/note", upload.single('file'), function(req, res){
    // console.log(req.IncomingMessage.client.ReadableState.buffer);
    console.log(req.file);
    // console.log(req.body);
    console.log("file uploaded");
    var noteData = fs.readFileSync(req.file.path);
          
    // Create an Image instance
    const note = new db.Note({
        title: req.file.originalname,
        file: noteData,
        flag_author_type: "student"
    });
  
    // Store the File to the MongoDB
    note.save().then(dbNote => {
        console.log("Saved an note to MongoDB.");
        // Find the stored image in MongoDB, then save it in '/static/assets/tmp' folder
        db.Unit.findOneAndUpdate({_id: req.params.unit}, { $push: { notes: dbNote._id } }, { new: true });

        db.Note.findById(dbNote, (err, findOutNote) => {
            if (err) throw err;
            try{
                fs.writeFileSync("uploads/" + req.file.originalname, findOutNote.data);
                console.log("Stored a file to uploads");
                console.log("Done!");
            }catch(e){
                console.log(e);
            }
        });
    }).catch(err => {
        console.log(err);
        throw err;
    });
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
const routes = require("./routes/api.js");
app.use(routes);

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
