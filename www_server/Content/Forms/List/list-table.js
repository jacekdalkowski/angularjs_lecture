angular.module('viewsModule')
.directive('listTable', function(employeesService){
	
	function getEmployessListUpdater(scope){
		return function(){
			employeesService.getEmployeesList(
				scope.model.filters.surname,
				function onSuccess(data){
					scope.model.lastUpdate = new Date();
					scope.model.employees = data.data;
				},
				function onError(){
					
				}
			);
		};
	}
	
	return {
		restrict: 'E',
		templateUrl: '/Forms/List/list-table.html',
		scope: {},
		link: function(scope, element, attrs){
			
			scope.model = {
				lastUpdate: new Date(),
				employees: [],
				filters: {
					surname: ''
				}
			};
			
			scope.events = {
				onSurnameFilterChange: function(event){
					getEmployessListUpdater(scope)();
				},
				onEdit: function(event, employeeId){
					window.location = '/Forms/Edit/edit.html?employeeId=' + employeeId; 
				}
			};
			
			getEmployessListUpdater(scope)();
			
		}
	};
});