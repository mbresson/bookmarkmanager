var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/Category.js');

/* GET /categories listing. */
router.get('/', function(req, res, next) {
    Category.find()
        .exec(function(err, categories) {
        if (err) return next(err);
        res.json(categories);
    });
});

/* POST /categories */
router.post('/', function(req, res, next) {
    Category.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /categories/:id */
router.put('/:id', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /categories/:id */
router.delete('/:id', function(req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
