const router = require("express").Router();
var db = require("../models");


//Add new teacher
router.post("/new/teacher", (req, res)=>{
    db.Teacher.create(req.body).then(function(result){
        res.json(result);
    });
});

//Add new classroom for a teacher, given teacher ID
router.post("/new/:teacher/classroom", (req, res)=>{
    db.Classroom.create(req.body).then(function(dbClassroom) {

        return db.Teacher.findOneAndUpdate(
            {_id: req.params.teacher}, { $push: { classrooms: dbClassroom._id } }, { new: true }
        );

    }).then(function(dbClassroom) {

        res.json(dbClassroom);

    }).catch(function(err) {

        res.json(err);
    });
});

//Add new student to a classroom given classroom ID
router.post("/new/:classroom/student", (req, res)=>{
    db.Student.create(req.body).then(function(dbStudent) {

        return db.Classroom.findOneAndUpdate
        ({_id: req.params.classroom}, { $push: { students: dbStudent._id } }, { new: true }
        );

    }).then(function(dbClassroom) {

        res.json(dbClassroom);

    }).catch(function(err) {

        res.json(err);
    });
});

//Add new unit to a classroom given classroom ID
router.post("/new/:classroom/unit", (req, res) =>{
    db.Unit.create(req.body).then(function(dbUnit) {

        return db.Classroom.findOneAndUpdate(
            {_id: req.params.classroom}, { $push: { units: dbUnit._id } }, { new: true }
        );

    }).then(function(dbClassroom) {

        res.json(dbClassroom);

    }).catch(function(err) {

        res.json(err);
    });
});

//Add new note to a unit given unit ID
router.post("/new/:unit/note", (req, res)=>{
    db.Note.create(req.body).then(function(dbNote) {

        return db.Unit.findOneAndUpdate(
            {_id: req.params.unit}, { $push: { notes: dbNote._id } }, { new: true }
        );

    }).then(function(dbUnit) {

        res.json(dbUnit);

    }).catch(function(err) {

        res.json(err);
    });
});

//Add new post to a unit given unit ID
router.post("/new/:unit/post", (req, res) =>{
    db.Post.create(req.body).then(function(dbPost) {

        return db.Unit.findOneAndUpdate(
            {_id: req.params.unit}, { $push: { posts: dbPost._id } }, { new: true }
        );

    }).then(function(dbUnit) {

        res.json(dbUnit);

    }).catch(function(err) {

        res.json(err);
    });
});

//Add new response to a post given post ID
router.post("/new/:post/response", (req, res)=>{
    db.Response.create(req.body).then(function(dbResponse) {

        return db.Post.findOneAndUpdate(
            {_id: req.params.post}, { $push: { responses: dbResponse._id } }, { new: true }
        );

    }).then(function(dbPost) {

        res.json(dbPost);

    }).catch(function(err) {

        res.json(err);
    });
});


//get all students in a class given classroom id
router.get("/:classroom/students", (req, res) =>{
    db.Classroom.findOne({_id: req.params.classroom})
    .populate("students")
    .then(results =>{
        res.send(results.students);
    })
})


//get all units in a classroom given classroom id
router.get("/:classroom/units", (req, res) =>{
    db.Classroom.findOne({_id: req.params.classroom})
    .populate("units")
    .then(results =>{
        res.send(results.units);
    })
})


//get all notes in a unit given unit id
router.get("/:unit/notes", (req, res) =>{
    db.Unit.findOne({_id: req.params.unit})
    .populate("notes")
    .then(results =>{
        res.send(results.notes);
    })
})


//get all posts in a unit given unit id
router.get("/:unit/posts", (req, res) =>{
    db.Unit.findOne({_id: req.params.unit})
    .populate("posts")
    .then(results =>{
        res.send(results.posts);
    })
})

//get all the teacher's classrooms given a teacher id
router.get("/:teacher/classrooms", (req,res)=>{
    db.Teacher.findOne({_id: req.params.teacher})
    .populate("classrooms")
    .then(results=>{
        res.send(results.classrooms);
    });

})

//get all responses to a post given post id
router.get("/:post/responses", (req, res) =>{
    db.Post.findOne({_id: req.params.post})
    .populate("responses")
    .then(results =>{
        res.send(results.responses);
    })
});


/****
 * 
 * LOGIN ROUTES
 *      ||
 *///  \  /


 //route for creating a new teacher user
 router.post("/teacherlogin/create", (req,res)=>{
    console.log("Creating user");
    db.Teacher.find().then((results)=>{
      var users = results;    
       //determining whether the input is unique
       var newUser = true;
         for (var i = 0; i<users.length;i++){
           if(users[i].username === req.body.username){
             newUser = false;
           
           }
           else{
             newUser = true;
           }
         }
        if(newUser===true){
        //creation of token for cookies
        var userToken = "t" + Math.random();
        // var encryptedPassword = encrypt.encrypt(req.body.password);
        var newUser ={
            username: req.body.username,
            password: req.body.password,
            token: userToken
        }
        
        res.cookie("token", userToken);
            db.Teacher.create(newUser).then((results)=>{    
                    console.log("added");
                     //adding teacher info to session
                    req.session.userType= "teacher";
                    req.session.user = results;
                    res.send(req.session);
                });
        }else{
        console.log("User already exists");
           return res.status(401).end();
           res.end();
        
        }
 
    });
   

  
 }); // end of '/teacherlogin/create

router.post("/studentlogin/verify", (req, res)=>{
    db.Classroom.find({key:req.body.classroomkey}).populate("students").then(results=>{
        console.log(results);
        var students = results[0].students;
        console.log(students);
        var found = false;
        var currentStudent;
        for (var i = 0; i<students.length;i++){
            if(students[i].key===req.body.userkey){
                console.log("found");
                found = true;
                currentStudent = students[i];
            }else{
                console.log("not found");
                found = false;
            }
        }
        if(found ===true){
            console.log("all good");
            res.cookie("token", currentStudent.token );
            req.session.userType="student";
            req.session.classroom = results[0]._id;
            req.session.user= currentStudent;
            res.send(req.session);
        }
        else{
            return res.status(404).end();
        }
       
    }).catch(err=>{
        console.log("==================")
        console.log(err);
        return res.status(404).end();
        
    })

});


//route created to verify if teacher user already exists 
 router.post("/teacherlogin/verify", (req,res)=>{
     console.log("sent data"); 
     console.log(req.body);
    db.Teacher.find().then(results=>{
        console.log(results);
        var users = results;
        var loopCheck = false;
        //loop to verify correct username and password
        for (var i =0; i<users.length;i++){

                var collectionPassword = users[i].password;
                
                var collectionUsername = users[i].username;

                // var deCryptPw = encrypt.decrypt(""+collectionPassword);
                
                //verifying input with database
                if(collectionUsername ===req.body.username && collectionPassword===req.body.password){
                // var currentUser ={
                //     username: req.body.username,
                //     password: req.body.password,
                //     token: req.body.token
                // }
                var currentUser = users[i];
                console.log(currentUser);
                res.cookie("token", users[i].token);
                console.log("user found");
                loopCheck = true;
                res.cookie("token", currentUser.token);
                //adding teacher info to session
                req.session.userType= "teacher";
                req.session.user = currentUser;
                res.send(req.session);
                }
            }
        if(loopCheck ===false){
            console.log("Failed to authenticate, check username and password");
            return res.status(401).end();
            res.end();
                }

        });
    
 }); //end of /teacherlogin/verify

 //route used to verify if a user is logged in and to give front end miscellaneous info
 router.get("/getsession", (req, res)=>{
     res.send(req.session);
 });

 //adding classroomKey and className to session (FOR TEACHER'S SIDE ONLY--NO NEED FROM STUDENT SIDE)
 router.post("/session/addclassroom", (req,res)=>{
     console.log(req.body);
     req.session.classroomInfo = {className: req.body.className, classKey: req.body.classKey,_id:req.body._id }
     res.send(req.session);
 })


module.exports = router;