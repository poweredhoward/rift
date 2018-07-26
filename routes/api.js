const router = require("express").Router();
var db = require("../models");


router.post("/new/teacher", (req, res)=>{
    db.Teacher.create(req.body).then(function(result){
        res.json(result);
    });
})

router.post("/new/:teacher/classroom", (req, res)=>{
    db.Classroom.create(req.body).then(function(dbClassroom) {

        return db.Teacher.findOneAndUpdate({_id: req.params.teacher}, { $push: { classrooms: dbClassroom._id } }, { new: true });

    }).then(function(dbClassroom) {

        res.json(dbClassroom);

    }).catch(function(err) {

        res.json(err);
    });
});

router.post("/new/:classroom/student", (req, res)=>{
    db.Student.create(req.body).then(function(dbStudent) {

        return db.Classroom.findOneAndUpdate({_id: req.params.classroom}, { $push: { students: dbStudent._id } }, { new: true });

    }).then(function(dbClassroom) {

        res.json(dbClassroom);

    }).catch(function(err) {

        res.json(err);
    });
});

router.post("/new/:classroom/unit", (req, res) =>{
    db.Unit.create(req.body).then(function(dbUnit) {

        return db.Classroom.findOneAndUpdate({_id: req.params.classroom}, { $push: { units: dbUnit._id } }, { new: true });

    }).then(function(dbClassroom) {

        res.json(dbClassroom);

    }).catch(function(err) {

        res.json(err);
    });
});

router.post("/new/:unit/note", (req, res)=>{
    db.Note.create(req.body).then(function(dbNote) {

        return db.Unit.findOneAndUpdate({_id: req.params.unit}, { $push: { notes: dbNote._id } }, { new: true });

    }).then(function(dbUnit) {

        res.json(dbUnit);

    }).catch(function(err) {

        res.json(err);
    });
});

router.post("/new/:unit/post", (req, res) =>{
    db.Post.create(req.body).then(function(dbPost) {

        return db.Unit.findOneAndUpdate({_id: req.params.unit}, { $push: { posts: dbPost._id } }, { new: true });

    }).then(function(dbUnit) {

        res.json(dbUnit);

    }).catch(function(err) {

        res.json(err);
    });
});

router.post("/new/:post/response", (req, res)=>{
    db.Response.create(req.body).then(function(dbResponse) {

        return db.Post.findOneAndUpdate({_id: req.params.post}, { $push: { responses: dbResponse._id } }, { new: true });

    }).then(function(dbPost) {

        res.json(dbPost);

    }).catch(function(err) {

        res.json(err);
    });
});

module.exports = router;