const router = require("express").Router();
var db = require("./models");


router.post("/new/teacher", (req, res)=>{
    db.Teacher.create()
})

router.post("/new/classroom", (req, res)=>{

});

router.post("/new/student", (req, res)=>{

});

router.post("/new/unit", (req, res) =>{
    Unit
});

router.post("/new/note", (req, res)=>{

});

router.post("/new/post", (req, res) =>{

});

router.post("/new/comment", (req, res)=>{

});

module.exports = router;