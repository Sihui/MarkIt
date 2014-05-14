//controller for the new page
(function(){
    
    var newController = function($scope,$log,$window,urlFactory,tagFactory){
        $scope.message = "Here I'm. The js boss!";
        $scope.urls = [];
        $scope.tags = [];
        
        function init() {
            urlFactory.getUrls()
                .success(function(data, status, headers, config) {
                    $scope.urls = data;
                    $log.log('urlFactorySuccess');
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $log.log('urlFactoryError');
                });
            tagFactory.getTags()
                .success(function(data, status, headers, config) {
                    $scope.tags = data;
                    $log.log('tagFactorySuccess');
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $log.log('urlFactoryError');
                });
        }
        
        init();
    };
    
    newController.$inject = ['$scope', '$log', '$window', 'urlFactory','tagFactory'];
    angular.module('MarkIt')
      .controller('newController', newController);
}());