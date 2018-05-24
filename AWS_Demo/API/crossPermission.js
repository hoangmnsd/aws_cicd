// fix the permission in your backend
function crossPermission() {
  this.permission = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Requested-With,Accept, Authorization');
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    next();
  }
}
module.exports = new crossPermission();