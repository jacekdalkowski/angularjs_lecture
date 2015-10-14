angular.module('viewsModule')
.directive('grandParent', function(){
	
	var template = 
	'<div class="grand-parent-class">' +
		'<div>' +
			'Grand parent model:' +
			'<div>' +
				'scope.model: {{model | json}}' +
			'</div>' +
			'<div>' +
				'<form>' +
					'model.user.name: <input type="text" ng-model="model.user.name" /><br />' +
					'model.user.surname: <input type="text" ng-model="model.user.surname" />' + 
				'</form>' +
			'</div>' +
		'</div>' +
	 	'<div>' +
			'Transcluded elements:' + 
			'<ng-transclude></ng-transclude>' +
		'</div>' +
	'</div>';
	
	return {
	  //scope: {},
	  template: template,
      restrict: 'A',
      transclude: true,
	  link: function(scope, element, attr){
		  scope.model = {
			  clients: [{id: 1, name: 'Client #1'}, {id: 2, name: 'Client #2'}],
			  user: { name: 'Jacek', surname: 'Dalkowski' }
		  };
		  scope.events = {};
	  }
    };
	
});