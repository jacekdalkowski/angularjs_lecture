var theToken = 'aaa';

angular.module('viewsModule')
.factory('tokenInjector', function() {  
    return {
       'request': function (config) {
           config.headers = config.headers || {};
           if (theToken) {
               config.headers.Authorization = 'Bearer ' + theToken;
           }
           return config;
       }
   };
})
.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('tokenInjector');
}]);
