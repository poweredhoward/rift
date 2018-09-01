const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
var readline = require('readline');
var stream = require('stream');
var session = require("express-session");
const fs = require("fs");
var mammoth = require("mammoth");
var db = require("./models");

// TODO
// Don't let page scroll go over max/min
// Make classroom ID obvious and easy to copy from inside dashboard


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

//Configuration for multer, where uploaded files go
var upload = multer({ dest: "uploads/" })


//Teacher can upload .txt file to add students to DB
//Given current classroom
//Each student must be on own line
//Format: <Student name (any length) space email
app.post("/studentsfile/:classroom", upload.single("file"), (req, res) =>{
    console.log("Inside students file");
    console.log(req.params.classroom);

    function makeToken(len){
        let pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let str = "";
        for (let i = 0; i < len; i++) {
          str += pool.charAt(Math.floor(Math.random() * pool.length));
        } 
        return str;
    }

    //logic to read file
    var instream = fs.createReadStream(req.file.path);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    
    var arr = [];
    
    rl.on('line', function(line) {
      // process line here
      arr.push(line);
    
    });
    
    //Once read, each line is a element in arr
    //Isolate the data and populate students in Mongo
    rl.on('close', function() {
      // do something on finish here
      var students = [];
      arr.forEach(function(s){
          var line = s.split(" ");
          var email = line[line.length - 1];
          var name = line.slice(0,line.length - 1).join(" ");
          var entry = {
              name: name,
              email: email,
              token: `t${Math.random()}`,
              key: makeToken(6)
          }
          students.push(entry);
        db.Student.create(entry).then(function(dbStudent) {
            setTimeout(function(){ var i }, 40);

        return db.Classroom.findOneAndUpdate
            ({_id: req.params.classroom}, { $push: { students: dbStudent._id } }, { new: true }
            );
    
        }).then(function(dbClassroom) {
    
            res.json(dbClassroom);
    
        }).catch(function(err) {
    
            // res.json(err);
        });
    
      })
      console.log('students', students);
    });
})


//Upload notes to backend
//Saves note in upload folder as generic file, then saves to mongo
app.post("/new/:unit/note", upload.single('file'), function(req, res){
    // console.log(req.IncomingMessage.client.ReadableState.buffer);
    console.log("inside note file post");
    // console.log(req.file);
    // console.log(req.body);
    console.log("files probably uploaded");
    var noteData = fs.readFileSync(req.file.path);


    const doc = new db.Doc({
        data: noteData
    })

    doc.save().then(dbDoc =>{
        const note = new db.Note({
            title: req.file.originalname,
            file: dbDoc._id,
            flag_author_type: "student",
            ratedBy: [],
            rating: 0
        });

         // Store the File to the MongoDB
        note.save().then(dbNote => {
            console.log("Saved a note to MongoDB.");
            // console.log(dbNote._id);
            // Find the stored file in MongoDB, then save it in /uploads folder
            db.Unit.findOneAndUpdate(
            {_id: req.params.unit}, { $push: { notes: dbNote._id } }, { new: true }, function(err, data) {
                db.Note.findById(dbNote, (err, findOutNote) => {
                if (err) throw err;
                try{
                    fs.writeFileSync("uploads/" + req.file.originalname, dbDoc.data);
                        
                        console.log("Stored a file to uploads!");
                        // console.log("Done!");
                        res.end();
                    // });
                    
                }catch(e){
                    console.log(e);
                }
            });
            });
            

        
        }).catch(err => {
            console.log(err);
            throw err;
        });

    })
   
});

// Instructions to use:
// axios call this function and save res.date into a state variable
//inside return <div dangerouslySetInnerHTML={{ __html: this.state.varable }}></div>
app.get("/:note/mammoth", (req, res) =>{
  console.log("inside mammoth");
  db.Note.findById({_id : req.params.note}, (err, foundNote)=> {
      db.Doc.findById({_id: foundNote.file}, (err, foundDoc) =>{
          if (err) throw err;
          try{
            fs.writeFileSync("uploads/" + foundNote.title, foundDoc.data);
            console.log("Stored a file to uploads");

            //Find document in db, save to directory and send mammoth html
            mammoth.convertToHtml({path: "uploads/" + foundNote.title})
            .then(function(result){
                var html = result.value; // The generated HTML
                // console.log(html);
                var messages = result.messages; // Any messages, such as warnings during conversion
                res.send(html);
            })
            // .done();
    
            
        }catch(e){
            console.log(e);
        }

      })
  })
  
});

//Send pdf file to front end
// TODO: Specific which file in request
app.get("/:note/pdf", function(req, res){
    console.log("inside pdf get");
    //MUST CHANGE TO DOCUMENT STORED ON THE SERVER
    // var filepath = "/uploads/cisco.pdf";
    db.Note.findById({_id: req.params.note}, (err, foundNote) => {
        console.log("Note found:")
    //   console.log(foundNote);
        db.Doc.findById({_id: foundNote.file}, (err, foundDoc) =>{
        if (err) throw err;
        try{
            fs.writeFileSync("uploads/" + foundNote.title, foundDoc.data);
            console.log("Stored a file to uploads");

            fs.readFile("uploads/" + foundNote.title, function(err, data){
                res.contentType("application/pdf");
            //   console.log(data);
                res.send(data);
            })
        }catch(e){
            console.log(e);
        }
        })

    });

  
})

app.use(express.static("uploads"));

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
