angular.module('servicesModule')
.factory('employeesService', ['$http', 'apiUrl', function($http, apiUrl){
	
	return {
		
		getEmployeesList: function (onSuccess, onError){
			$http.get(apiUrl + '/api/employees')
			.then(onSuccess, onError);
		},
		
		getEmployee: function (employeeId, onSuccess, onError){
			$http.get(apiUrl + '/api/employees/' + employeeId)
			.then(onSuccess, onError);
		},
		
		addEmployee: function (employeeData, onSuccess, onError){
			$http.post(apiUrl + '/api/employees', employeeData)
			.then(onSuccess, onError);
		},
		
		updateEmployee: function (employeeData, onSuccess, onError){
			$http.put(apiUrl + '/api/employees', employeeData)
			.then(onSuccess, onError);
		},
		
		deleteEmployee: function (employeeId, onSuccess, onError){
			$http.delete(apiUrl + '/api/employees/' + employeeId)
			.then(onSuccess, onError);
		}
	};
}]);