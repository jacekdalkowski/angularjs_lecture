angular.module('viewsModule')
.directive('child', function(){
	
	var template = 
	'<div class="child-class">' +
		'<div>' +
			'Child model:' +
			'<div>' +
				'scope.model: {{model | json}}' +
			'</div>' +
			'<div>' +
				'scope.grandParentModel: {{grandParentModel | json}}' +
			'</div>' +
			'<div>' +
				'<form>' +
					'grandParentModel.user.name: <input type="text" ng-model="grandParentModel.user.name" /><br />' +
					'grandParentModel.user.surname: <input type="text" ng-model="grandParentModel.user.surname" />' + 
				'</form>' +
			'</div>' +
		'</div>' +
	 	'<div>' +
			'Transcluded elements:' + 
			'<ng-transclude></ng-transclude>' +
		'</div>' +
	'</div>';
	
	return {
	  scope: {
		  grandParentModel: '=parentModel'
	  },
	  template: template,
      restrict: 'E',
      transclude: true,
	  link: function(scope, element, attr){
		  scope.model = {};
		  scope.events = {};
	  }
    };
	
});