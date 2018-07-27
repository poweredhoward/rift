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


//get all responses to a post given post id
router.get("/:post/responses", (req, res) =>{
    db.Post.findOne({_id: req.params.post})
    .populate("responses")
    .then(results =>{
        res.send(results.responses);
    })
});



module.exports = router;