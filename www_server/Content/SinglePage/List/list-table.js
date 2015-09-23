angular.module('viewsModule')
.controller('listController', function($scope, employeesService){
	
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

	$scope.model = {
		lastUpdate: new Date(),
		employees: [],
		filters: {
			surname: ''
		}
	};
	
	$scope.events = {
		onSurnameFilterChange: function(event){
			getEmployessListUpdater($scope)();
		},
		onEdit: function(event, employeeId){
			$scope.$parent.employeeId = employeeId;
			window.location.hash = '/edit';
		}
	};
	
	getEmployessListUpdater($scope)();
			
});