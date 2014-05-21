(function(){
    
    var urlFactory = function($http){
        $http.defaults.headers.common['Authorization'] = 'api-key ';
        $http.defaults.headers.common['Content-Type'] = 'application/json';
        var factory = {};
        
        factory.getUrls = function(){
            return $http.get('https://beta-api.mongohq.com/mongo//MarkIt/collections/url/documents?limit=100');
        }
        
        return factory;
    };
    
    urlFactory.$inject = ['$http'];
    
    angular.module('MarkIt').factory('urlFactory',urlFactory);

}());