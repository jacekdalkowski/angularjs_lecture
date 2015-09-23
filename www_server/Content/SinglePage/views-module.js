angular.module('viewsModule', ['ngRoute', 'servicesModule'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		template : '<div id="main-view"></div>'
	})
	.when('/list', {
		templateUrl : '/SinglePage/List/list-table.html',
		controller  : 'listController'
	})
	.when('/edit', {
		templateUrl : '/SinglePage/Edit/edit-form.html',
		controller  : 'editFormController'
	})
	.when('/add', {
		templateUrl : '/SinglePage/Edit/edit-form.html',
		controller  : 'editFormController'
	});
});
