/**
 * Created by Jahanzaib on 11/5/2014.
 */
var express = require('express');
var router = express.Router();
var Students = require('../student');


/* GET users listing. */
Students.allStudent;

Students.findStudent(function(s){
    Students.allStudent=s;
});

router.post('/login', function(req, res){
    var adminLogin=req.body;
    Students.login=true;
    if(adminLogin.userName == "admin" && adminLogin.password == "admin"){
        res.send(true);
    }else{
        res.send(false)
    }
});

router.post('/addStudent',function(req,res){
    var newStudent=req.body;
    if(Object.keys(newStudent).length >= 7){
        Students.saveStudent(newStudent,function(s){
            res.send(s);
        })

    }else{
        res.send(false);
    }
});

router.post('/dashboard',function(req,res){
    Students.findStudent(function(s){
        Students.allStudent=s;
        res.send(Students.allStudent);
    });
});

router.post('/editStudent',function(req,res){
    var editingStudent=Students.allStudent[req.body.index];
    res.send(editingStudent);
});

router.post('/saveEditStudent',function(req,res){
    Students.studentUpdate(req.body._id,req.body,function(){
        Students.findStudent(function(a){
            Students.allStudent=a;
            res.send(a);
        })
    });

});

router.post('/deleteEditStudent',function(req,res){
    var studentForDlet = Students.allStudent[req.body.index];
    Students.deleteStudent(studentForDlet._id,function(){
        Students.findStudent(function(a){
            Students.allStudent=a;
            res.send(a);
        })
    });
});

router.get('/logout',function(req,res){
    Students.allStudent='';
    Students.login=false;
    res.send('bye admin')
});

module.exports = router;
