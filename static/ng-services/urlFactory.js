(function(){
    
    var urlFactory = function($http){
        $http.defaults.headers.common['Authorization'] = 'api-key BcnBRbwH9q3O9Yyut3e4Ee8iB06aYQ7DvngI02';
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        var factory = {};
        
        factory.getUrls = function(){
            return $http.get('https://beta-api.mongohq.com/mongo/530ce7bd23ff0a6078000074/MarkIt/collections/url/documents?limit=100');
        }
        
        return factory;
    };
    
    urlFactory.$inject = ['$http'];
    
    angular.module('MarkIt').factory('urlFactory',urlFactory);

}());