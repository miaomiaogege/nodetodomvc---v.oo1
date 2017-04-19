var express = require('express');
var app    = express();
var router = express.Router();
var rp = require('request-promise');

/*var rest = require('rest');
var client = rest.wrap(require('rest/interceptor/mime'), {
    mime: 'application/json'
}).wrap(require('rest/interceptor/timeout'), {
    timeout: 10e3
}).wrap(require('rest/interceptor/errorCode'));*/

var rootUrl= 'http://localhost:3000/';
var todos=[];
/*get方法封装*/
function geet(res) {
    rp.get('http://localhost:8501/todos')
        .then(function (resp) {
            var nodetodos= JSON.parse(resp);
            todos=nodetodos.result;
            if(!todos){
                res.send('数据库没有数据');}
            else{
                console.log(todos)
                res.send(todos)
            }

        })
        .catch(function (err) {
            console.log(err)
        });
}

/*get------end*/

/*rp方法封装*/
function somerp(options){
    rp(options)
        .then(function (body) {
            console.log(body)

            res.json({
                ok: {
                    code: 1,
                    message: 'ok'
                }
            })

        })
        .catch(function (err) {
            console.log(err)
            res.json({
                error: {
                    code: -1,
                    message: '你挂了！'
                }

            })
        });



}


/* GET users listing. */
router.post('/', function (req, res, next) {
    rp.get('http://localhost:8501/todos')
        .then(function (resp) {
            var nodetodos= JSON.parse(resp);
            todos=nodetodos.result;
            if(!todos){
                res.send('数据库没有数据');}
            else{
                console.log(todos)
                res.send(todos)
            }

        })
        .catch(function (err) {
             console.log(err)
        });
});
router.post('/add', function (req, res, next) {
    console.log(req.body);
    var options={
        method: 'POST',
        uri: 'http://localhost:8501/todos',
        body:{
            title:req.body.title,
            isComplete:req.body.isComplete
        },
        json: true
    };
    rp(options)
        .then(function (body) {
         console.log(body);
            res.json({
                ok: {
                    code: 1,
                    message: 'ok'
                }
            })

        })
        .catch(function (err) {
           console.log(err)
        });
});



router.post('/destroy', function (req, res, next) {
    console.log(req.body);
    var id = req.body.id;

    var options = {
        method: 'DELETE',
        uri: 'http://localhost:8501/todos/'+id,
        resolveWithFullResponse: true
    };
    rp(options)
        .then(function (body) {


            res.json({
                ok: {
                    code: 1,
                    message: 'ok'
                }
            })

        })
        .catch(function (err)  {

        });
});

router.post('/modify', function (req, res, next) {
console.log('modify!!!!!!!!!!!!!!!');
    var todo = req.body;
    var id =todo.id;
    var options={
        uri: 'http://localhost:8501/todos/',
        body:{
            id:id,
            isComplete:todo.isComplete,
            title:todo.title
        },
        json: true
    };
    rp.put(options)
        .then(function (body) {
            console.log('put回来的数据');
            res.json({
                ok: {
                    code: 1,
                    message: 'ok'
                }
            })

        })
        .catch(function (err) {
            console.log(err)
        });




   /* var oldTodo = todos.find(x => x.id == id);
    Object.assign(oldTodo, todo);

    res.send({error:1});*/
});

module.exports = router;
