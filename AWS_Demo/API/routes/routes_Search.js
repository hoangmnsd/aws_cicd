var express = require('express');
var router_search = express.Router();
var Student = require('../controller/Student');
router_search.get('/:table?/:searchBy?/:searchKey?', function (req, res, next) {
    Student.searchStudent(req.params.table, req.params.searchBy, req.params.searchKey, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router_search;