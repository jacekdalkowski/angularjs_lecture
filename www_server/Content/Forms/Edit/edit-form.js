angular.module('viewsModule')
.directive('menu', function(){
	
	return {
		restrict: 'E',
		templateUrl: '/Forms/Edit/edit-form.html',
		scope: {},
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