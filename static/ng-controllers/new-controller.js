//controller for the new page
(function(){
    
    var newController = function($scope,$log,$window,urlFactory){
        $scope.message = "Here I'm. The js boss!";
        $scope.urls = [];
        
        function init() {
            urlFactory.getUrls()
                .success(function(data) {
                    $scope.urls = data;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        }
        
        init();
    };
    
    newController.$inject = ['$scope', '$log', '$window', 'urlFactory'];
    angular.module('MarkIt')
      .controller('newController', newController);
}());