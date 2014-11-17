/**
 * Created by Jahanzaib on 11/6/2014.
 */
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://student:12345@ds051960.mongolab.com:51960/studentmangment');
var Schema = mongoose.Schema;
var db = mongoose.connection;


//if mongodb connection success
db.on('connected',function(){
    console.log("mongodb is connected.!");
});
//---

//if mongodb connection error
db.on('error',function(){
    console.log("connection error in mongodb.!");
});
//---

//if mongodb disconnected
db.on('disconnected',function(){
    console.log("mongodb connection disconnected.!");
});
//---

(function(){
  //  "use strict"
    function Students(){

        this.stud = new Schema(
            {firstName:String,
                lastName:String,
                email:String,
                password:String,
                class:Number,
                rating:Number,
                studentTask:{task:String,comments:[],taskDone:Boolean,taskRating:Number},
                subjects:[]
            }
        );
        this.StudentModel = mongoose.model('StudentModel',this.stud );

        this.saveStudent = function(student,callback){

           var studentn = new this.StudentModel(student);

            studentn.save(function (err, s) {
                if (err){
                    return console.error(err);
                }
               else {
                    callback(s)
                }
            });

        };

        this.findStudent = function(callback){
            this.StudentModel.find(function(err,s) {
                if(err){
                return false;
            }else{
                 this.allStudent=s;
                callback(s);
                }
            })
        };

        this.findOneStudent = function(stuData,callback){
            this.StudentModel.find({email:stuData.email , password:stuData.password},function(err,s) {
                if(err){
                     return false;
                }else{
                    callback(s[0]);
                }
            })
        };

        this.studentUpdate = function(id,updated,callback){
            this.StudentModel.findByIdAndUpdate(id,updated,function(err,s){
                if(err){
                    console.log("student not found for update");
                }else{
                    callback(s);
                }
            })
        };

        this.deleteStudent = function(id,callback){
            this.StudentModel.findByIdAndRemove(id,function(err,s){
                if(err){
                    console.log('student deleted')
                }else{
                    callback();
                }
            })
        };

        this.findStudent(function(a){
            this.allStudent=a;
        });

        this.curentStudent;
        this.login=false;
    }
    var object;
    if(!object)
    object = new Students();

    module.exports =object;

})()