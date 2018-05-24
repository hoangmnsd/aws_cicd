var express = require('express');
var router_student = express.Router();
var Student = require('../controller/Student');
router_student.get('/:id?',function(req,res,next){
    if(req.params.id){
        Student.getStudentbyId(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }
    
        });
    } else {
        Student.getAllStudent(function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }
    
        });
    }
});
// Add
router_student.post('/:table',function(req,res,next){
    if(req.params.table === 'user'){
        Student.addUser(req.body,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        });
    }
    if(req.params.table === 'score') {
        Student.addScore(req.body,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        });
    }
});
// Edit
router_student.put('/:id/:table', function (req, res, next) {
    if(req.params.table === 'user'){
        Student.updateUser(req.params.id,req.body,function(err,rows){
            if(err){
                res.json(err);
            } else{
                res.json(req.rows);
            }
        });
    }
    if(req.params.table === 'score') {
        Student.updateScore(req.params.id,req.body,function(err,rows){
            if(err){
                res.json(err);
            } else{
                res.json(req.rows);
            }
        });
    }
});
// Delete
router_student.delete('/:id/:table',function(req,res,next){
    if(req.params.table === 'user'){
        Student.deleteUser(req.params.id,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(count);
            }
        });
    }
    if(req.params.table === 'score'){
        Student.deleteScore(req.params.id,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(count);
            }
        });
    }
});
module.exports=router_student;