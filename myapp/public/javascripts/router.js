
var todo= angular.module('todo', ['ui.router']);
/*ui-router*/
todo.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    var allState = {
        name: 'all',
        url: '/',
        templateUrl: 'acts.tpl',
        controller:'TodoListCtrl'
    };
    var activeState = {
        name: 'active',
        url: '/active',
        templateUrl: 'acts.tpl',
        controller:'TodoListCtrl'
    };
    var completedState = {
        name: 'completed',
        url: '/completed',
        templateUrl: 'acts.tpl',
        controller:'TodoListCtrl'
    };

    $stateProvider.state(allState);
    $stateProvider.state(activeState);
    $stateProvider.state(completedState);
});