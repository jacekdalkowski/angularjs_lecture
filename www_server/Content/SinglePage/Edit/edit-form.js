angular.module('viewsModule')
.controller('editFormController', function($scope, employeesService){

	$scope.model = {
		employee: {},
		submitted: false
	};
	
	$scope.events = {
		onSave: function(event){
			var action;
			
			$scope.model.submitted = true;
			if($scope.employeeForm.$invalid){
				alert('Proszę wprowadzić poprawki!');
				return;
			}
			
			if($scope.model.employee.id){
				action = employeesService.updateEmployee;
			}else{
				action = employeesService.addEmployee;
			}
			
			action($scope.model.employee,
				function onSuccess(data){
					alert('Pomyślnie zapisano zmiany');
				},
				function onError(){
					alert('Wystąpił błąd');
				});
			}	
	};
	
	if($scope.$parent.employeeId){
		employeesService.getEmployee($scope.$parent.employeeId,
		function onSuccess(data){
			$scope.model.employee = data.data[0];
		},
		function onError(){
			alert('Wystąpił błąd');
		});
	}
});