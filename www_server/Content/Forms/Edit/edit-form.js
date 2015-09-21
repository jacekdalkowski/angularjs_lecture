angular.module('viewsModule')
.directive('editForm', function(employeesService){
	
	return {
		restrict: 'E',
		templateUrl: '/Forms/Edit/edit-form.html',
		scope: {},
		link: function(scope, element, attrs){
			var employeeId = getQueryParam('employeeId');
			
			scope.model = {
				employee: {}
			};
			
			scope.events = {
				onSave: function(event){
					var action;
					if(scope.model.employee.id){
						action = employeesService.updateEmployee;
					}else{
						action = employeesService.addEmployee;
					}
					
					action(scope.model.employee,
					function onSuccess(data){
						alert('Pomyślnie zapisano zmiany');
					},
					function onError(){
						alert('Wystąpił błąd');
					});
				}	
			};
			
			if(employeeId){
				employeesService.getEmployee(employeeId,
				function onSuccess(data){
					scope.model.employee = data.data[0];
				},
				function onError(){
					alert('Wystąpił błąd');
				});
			}
			
		}
	};
});