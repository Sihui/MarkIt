//not working due to cross-origin issue
//could be deleted
(function(){
    
    var url_tagFactory = function($http){
        //$http.defaults.headers.common['Authorization'] = 'api-key ';
        //$http.defaults.headers.common['Content-Type'] = 'application/json';
       
        var factory = {};
        
        factory.sendUrlTag = function(data){
             d = '{"document" : {"url_URL":"53738eef9256a31f4fdf6bf8","tag_Tag":"537375fc9256a31f4fdf6bf3"} }'
            //return $http.post('https://beta-api.mongohq.com/mongo/530ce7bd23ff0a6078000074/MarkIt/collections/url_tag/documents',d);
            return $http({
            url: 'https://beta-api.mongohq.com/mongo//MarkIt/collections/url_tag/documents',
            method: "POST",
            headers: [
                {'Content-Type': 'application/json'},
                    {'Authorization' : 'api-key BcnBRbwH9q3O9Yyut3e4Ee8iB06aYQ7DvngI02'}
                     ],
            data: d
            
        })
        }
        
        return factory;
    };
    
    url_tagFactory.$inject = ['$http'];
    
    angular.module('MarkIt').factory('url_tagFactory',url_tagFactory);

}());