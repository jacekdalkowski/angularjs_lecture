angular.module('viewsModule')
.directive('salary', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var moneyPattern = /^\d+(.\d{2})?$/;
            ctrl.$validators.salary = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                
                if (moneyPattern.test(viewValue)) {
                    return true;
                }
                
                return false;
            };
        }
    };
});