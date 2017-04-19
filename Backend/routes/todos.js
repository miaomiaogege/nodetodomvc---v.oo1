var express = require('express');
var _ = require('underscore');

var router = express.Router();

var TODO_ID_PREFIX = 'todo_';
var todos = [
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'Finish 85ido library.',
		isComplete: false
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the 2th todo.',
		isComplete: false
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the thrid todo.',
		isComplete: true
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the 4th todo.',
		isComplete: false
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the 5th todo.',
		isComplete: false
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the 6th todo.',
		isComplete: false
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the 7th todo.',
		isComplete: false
	},
	{
		id: _.uniqueId(TODO_ID_PREFIX),
		title: 'This is the 8th todo.',
		isComplete: false
	}
];

/**
 * @apiDefine BaseResponse
 *
 * @apiSuccess {object} result 请求结果，包含请求数据。
 *
 * @apiError {object} error 请求错误信息。
 * @apiError {number} error.code 错误码。
 * @apiError {string} error.message 错误信息。
 */
/**
 * @apiDefine Todo
 *
 * @apiParam {number} id Todo的id，添加时无需提供。
 * @apiParam {string} title Todo的内容。
 * @apiParam {boolean} [isComplete=false] Todo的完成状态。
 * @apiParamExample {json} Request
 *  {
 *      "id": 3059,
 *      "title": "This is a todo.",
 *      "isComplete": false
 *  }
 */

/**
 * @api {get} /todos/ 获取全部Todo。
 * @apiName AllTodos
 * @apiGroup Todos
 *
 * @apiUse BaseResponse
 * @apiSuccess {object[]} result 所有Todos。
 * @apiVersion 1.0.0
 */
router.get('/', function(req, res) {
	res.json({
        result: todos
	});
});

/**
 * @api {get} /todos/{:id} 获取指定的Todo。
 * @apiName Todo
 * @apiGroup Todos
 *
 * @apiParam {string} id Todo Id。
 * @apiUse BaseResponse
 * @apiSuccess {object[]} result 所有Todos。
 * @apiVersion 1.0.0
 */
router.get('/:id', function(req, res) {
    var id = req.params.id;
    if (!id) {
        res.status(500)
            .json({
                error: {
                    code: -1,
                    message: 'Without require argument: id.'
                }
            });
        return;
    }
    var todo = todos.find(function(x) {      return x.id === id; });
    res.json({
        result: todo
    });
})

/**
 * @api {post} /todos/ 添加一个Todo，返回被添加Todo的id。
 * @apiName AddTodo
 * @apiGroup Todos
 *
 * @apiUse Todo
 * @apiParamExample {json} Request
 *  {
 *      "title": "This is a todo.",
 *      "isComplete": false
 *  }
 *
 * @apiUse BaseResponse
 * @apiSuccess {object} result 添加的Todo。
 * @apiSuccessExample {json} Response
 * HTTP/1.1 200 OK
 * {
 *      result: {
 *          "id": 2875,
 *          "title": "This is a todo.",
 *          "isComplete": false
 *      }
 * }
 *
 * @apiVersion 1.0.0
 */
router.post('/', function(req, res) {
	var todo = req.body;
	if (!todo) {
		res.status(500)
			.json({
                error: {
                    code: -1,
                    message: 'Todo is empty.'
                }
			});
		return;
	}
	todo.id = _.uniqueId(TODO_ID_PREFIX);
	todos.push(todo);
	res.json({
        result: todo
	});
});

/**
 * @api {delete} /todos/ 删除Todo，返回删除是否成功。
 * @apiName RemoveTodo
 * @apiGroup Todos
 *
 * @apiParam {number} id 要删除Todo的id。
 *
 * @apiUse BaseResponse
 * @apiSuccess {object} result.todo 被删除的Todo。
 *
 * @apiVersion 1.0.0
 */
router['delete']('/:id', function(req, res, next) {
	var id = req.params.id;
	if (!id) {
		res.status(500)
            .json({
                error: {
                    code: -1,
                    message: 'Without require argument: id.'
                }
            });
        return;
	}
    var todo = todos.find(function(x) { return x.id === id; });
    todos = todos.filter(function(x) { return x.id !== id; });
    if (todo != null) {
        res.json({
            result: todo
        });
        return;
    }

    res.status(500)
        .json({
            error: {
                code: -1,
                message: 'Have not a todo with id:' + id
            }
        });
});

/**
 * @api {put} /todos/ 修改Todo，返回修改后的Todo。
 * @apiName UpdateTodo
 * @apiGroup Todos
 *
 * @apiUse Todo
 *
 * @apiUse BaseResponse
 *
 * @apiVersion 1.0.0
 */
router.put('/', function(req, res, next) {
	var todo = req.body;
	console.log('我是put最后的'+todo.id)
	if (!todo) {
		res.status(500)
            .json({
                error: {
                    code: -1,
                    message: 'Without argument: todo.'
                }
            });
        return;
	}
	todos = todos.map(function(item) {
		if (item.id == todo.id) {
			todo = _.extend({}, item, todo);
            return todo;
		}
		return item;
	});
	res.send({

		result: todo
	});
});

module.exports = router;
