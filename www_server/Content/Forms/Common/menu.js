angular.module('viewsModule')
.directive('menu', function(){
	
	var template = 
		'<div class="employees-nav-menu">' +
			'<div class="employees-nav-menu-btn-wrapper">' +
				'<a ng-click="events.onAddClick($event)" href="#" type="button" class="btn btn-default btn-block">Dodaj</a>' +
			'</div>' +
			'<div class="employees-nav-menu-btn-wrapper">' +
				'<a ng-click="events.onListClick($event)" href="#" type="button" class="btn btn-default btn-block">Lista</a>' +
			'</div>' +
		'</div>';
	
	return {
		restrict: 'E',
		template: template,
		link: function(scope, element, attrs){
			scope.model = {};
			scope.events = {
				onAddClick: function(event){
					event.preventDefault();
					window.location = '/Forms/Edit/edit.html';
				},
				onListClick: function(event){
					event.preventDefault();
					window.location = '/Forms/List/list.html';
				}
			};
		}
	};
});