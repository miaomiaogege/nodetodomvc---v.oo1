var express = require('express');
var router = express.Router();
var request= require('request');
var rest =  require('rest');


/* GET users listing. */
router.post('/', function (req, res, next) {
    client({
        path: rootUrl
    }).then(function (resp) {
        resp.entity.todos.reverse();
        res.send(resp.entity);
    }, function (resp) {
        res.send(resp.entity);
    });
});

router.post('/add', function (req, res, next) {
    var todo = req.body.todo;
    if (!todo.title) {
        res.status(500).send({
            code: 0,
            errorMsg: 'Cannot add empty todo.'
        });
        return;
    }
    client({
        path: rootUrl + 'add',
        entity: {
            todo: todo
        }
    }).then(function (resp) {
        res.send(resp.entity);
    }, function (resp) {
        res.send(resp.entity);
    });
});

router.post('/toggle', function (req, res, next) {
    var todo = req.body.todo;
    client({
        path: rootUrl + 'update',
        entity: {
            todo: todo
        }
    }).then(function (resp) {
        res.send(resp.entity);
    }, function (resp) {
        res.send(resp.entity);
    });
});

router.post('/destroy', function (req, res, next) {
    var todo = req.body.todo;
    if (!todo) {
        res.send({
            code: 0,
            errorMsg: 'Parameter `todo` cannot be null or undefined.'
        });
        return;
    }
    var id = todo.id;
    client({
        path: rootUrl + 'remove',
        entity: {
            id: id
        }
    }).then(function (resp) {
        res.send(resp.entity);
    }, function (resp) {
        res.send(resp.entity);
    })
});

router.post('/modify', function (req, res, next) {
    var todo = req.body.todo;
    client({
        path: rootUrl + 'update',
        entity: {
            todo: todo
        }
    }).then(function (resp) {
        res.send(resp.entity);
    }, function (resp) {
        res.send(resp.entity);
    });
});

module.exports = router;
