var db = require('../mySQLConnection');
// Table Student
var Student = {
  // Get All Student
  getAllStudent: function (callback) {
    return db.query(`select user.UserId, user.Name, user.DateOfBird, user.Address,
                            score.Toan, score.Ly, score.Hoa, score.Avarage, score.Rank
                    from user, score where user.UserId = score.UserId`, callback);
  },
   // Get Student by UserId
  getStudentbyId: function (id,callback) {
    return db.query(`select user.UserId, user.Name, user.DateOfBird, user.Address,
                            score.Toan, score.Ly, score.Hoa, score.Avarage, score.Rank
                    from user, score where user.UserId = ? and score.UserId = ?`,[id,id], callback);
  },
  // Search Student
  searchStudent: function (table,searchBy,searchKey,callback) {
    return db.query(`select user.UserId, user.Name, user.DateOfBird, user.Address,score.Toan, score.Ly, score.Hoa, score.Avarage, score.Rank 
        from user, score where user.UserId = score.UserId and ` + table + '.' + searchBy + ` like ` + `'%` + searchKey + `%'`, callback);
  },
  // Add student : User
	addUser:function(student,callback){
    return db.query(`insert into user(Name,DateOfBird,Address) values(?,?,?)`
                ,[student.Name,student.DateOfBird,student.Address],callback);
  },
  // Add student : Score
	addScore:function(student,callback){
    return db.query(`insert into score(Toan,Ly,Hoa,Avarage,Rank) values(?,?,?,?,?)`
                ,[student.Toan,student.Ly,student.Hoa,student.Avarage,student.Rank],callback);
  },
  // Update student : User
	updateUser:function(id,student,callback){
    return db.query(`update user set Name=?,DateOfBird=?,Address=? where UserId=?`
                ,[student.Name,student.DateOfBird,student.Address,id],callback);
  },
  // Update student : Score
	updateScore:function(id,student,callback){
    return db.query(`update score set Toan=?,Ly=?,Hoa=?,Avarage=?,Rank=? where UserId=?`
                ,[student.Toan,student.Ly,student.Hoa,student.Avarage,student.Rank,id],callback);
  },
  // Delete student : User
	deleteUser:function(id,callback){ 
    return db.query(`delete from user where UserId=?`
                ,[id],callback);
  },
  // Delete student : Score
	deleteScore:function(id,callback){
    return db.query(`delete from score where UserId=?`
                ,[id],callback);
	}
};
module.exports = Student;