(function(){
    
    var tagFactory = function($http){
        $http.defaults.headers.common['Authorization'] = 'api-key BcnBRbwH9q3O9Yyut3e4Ee8iB06aYQ7DvngI02';
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        var factory = {};
        
        factory.getTags = function(){
            return $http.get('https://beta-api.mongohq.com/mongo/530ce7bd23ff0a6078000074/MarkIt/collections/tag/documents');
        }
        
        return factory;
    };
    
    tagFactory.$inject = ['$http'];
    
    angular.module('MarkIt').factory('tagFactory',tagFactory);

}());
//
//