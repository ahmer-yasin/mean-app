var express = require('express');
var router = express.Router();
var Students = require('../student');

var curentStudentIndex;
var student;
Students.curentStudent;
Students.login=false;

/* GET users listing. */
router.post('/login',function(req,res){
      student=req.body;
    Students.findOneStudent(student,function(a){
        Students.login=true;
        Students.curentStudent=a;
        res.send(Students.curentStudent);
    });

});

router.post('/dashboard',function(req,res){
    if(Students.login){
        Students.findOneStudent(Students.curentStudent,function(a){
            Students.curentStudent=a;
            res.send(Students.curentStudent)
        });
    }else{
        res.send('you are not login')
    }

});

router.post('/addComent',function(req,res){
    var studentForUpdate= req.body;
    Students.studentUpdate(studentForUpdate._id,studentForUpdate,function(s){
        Students.curentStudent=s;
        res.send(Students.curentStudent);
    })
});

router.post('/logout',function(req,res){
    Students.curentStudent = '';
    student='';
    Students.login=false;
})

module.exports = router;
