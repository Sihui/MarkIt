(function(){
    
    var tagFactory = function($http){
        $http.defaults.headers.common['Authorization'] = 'api-key ';
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        var factory = {};
        
        factory.getTags = function(){
            return $http.get('https://beta-api.mongohq.com/mongo//MarkIt/collections/tag/documents?limit=100');
        }
        
        return factory;
    };
    
    tagFactory.$inject = ['$http'];
    
    angular.module('MarkIt').factory('tagFactory',tagFactory);

}());
