
var todo= angular.module('todo', ['ui.router']);
todo.controller('TodoListCtrl', ['$scope','$filter','$state',function($scope,$filter,$state){

    /*这是每次实例化一次状态，todo源数据要从取localstorage里面取，因为每种状态会重新刷新一次todos初值*/
    $scope.todos = angular.fromJson(localStorage.todos || '[]');

    /*每当实例化的时候，执行*/
    this.$onInit=function () {
        var a=$scope.acts.find(function (item) {
            console.log(item.name);
            return item.name===$state.current.name
        });
        a.opt();
        console.log(a)
    };
    /*监视每种状态下每次todos的改动*/
    $scope.$watch(function () {
        return $scope.todos
    },function (n,o) {
        console.log(n);
        if (n === o) {
            return;
        }
        $scope.todos = n;
        localStorage.todos=angular.toJson(n);

        var a=$scope.acts.find(function (item) {
            console.log(item.name);
            return item.name===$state.current.name
        });
        a.opt();
    },true);

    /*双击事件*/
    $scope.db=function (todo) {

        todo.edit = !todo.edit;

        $scope.one=todo.text};

    /*这里是选中时改变筛选按钮的样式*/
    $scope.slet=function (index) {
        $scope.acts.forEach(function (item, i) {
            item.ok = i === index;
        });
    };


    /*取消完成状态*/
    $scope.cancel=function () {
        $scope.todos.forEach(function (ele) {
            if(ele.done){
                ele.done=false
            }
        });

    };
    /*这里是acts部分*/
    $scope.acts=[
        {
            name:'all',
            opt:function () {
                $scope.todos_copy=$scope.todos;

            },
            count:function () {
            },
            path:'/'

        },

        {
            name:'active',
            opt:function () {
                $scope.remainingCount = $scope.todos.filter(function (p1) {  return !p1.done});
                $scope.todos_copy = $scope.remainingCount;
                console.log($scope.remainingCount);

            },
            count:function () {
                return $scope.todos.filter(function (p1) {
                    return !p1.done
                }).length
            },
            path:'/active'
        },

        {
            name:'completed',
            opt:function () {
                $scope.completedCount = $filter('filter')($scope.todos,{ done: true });
                $scope.todos_copy=$scope.completedCount;
                console.log('complated')
            },
            count:function () {
                return $scope.todos.filter(function (p1) {
                    if (p1.done){
                        return p1
                    }}).length;
            },
            path:'/completed'
        }

    ];

    /*这是按键功能*/
    $scope.up=function (e,index,todo) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            console.log(13);
            $scope.todos[index].edit=!$scope.todos[index].edit;
        }
        if(keycode==27){
            $scope.todos[index].edit=!$scope.todos[index].edit;
            $scope.todos[index].text=$scope.one;
            console.log($scope.one)
        }

    };
    /*按回车引用todo添加功能*/
    $scope.myKeyup = function(e){
        //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.addTodo();
        }
    };
    /*这里是数组添加 push可以添加一个对象作为数组的一个元素*/
    $scope.addTodo=function () {
        console.log($scope.inp_val);
        $scope.todos.push({
            text: $scope.inp_val,
            done:false
        });
        $scope.inp_val=''

    };
    /*这里是统计整个数组里面done=false的数量，这里的done跟input用ng-model双向绑定*/
    $scope.remain=function () {
        var i=0;
        $scope.todos.forEach(function (ele) {
            if(!ele.done){
                i++
            }
        });
        return i;
    };
    /*这是在数组中删掉当前todo，这里的todo实际是个索引*/
    $scope.delet=function (index,todo) {
        console.log(todo);
        console.log(1);
        //在todos数组中将当前todo删去
        $scope.todos.splice(index,1);
        console.log(index)
    }
}]);
