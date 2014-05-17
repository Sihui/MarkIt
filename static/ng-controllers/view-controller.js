//controller for the new page
(function(){
    
    var viewController = function($scope,$log,$window,urlFactory,tagFactory,url_tagFactory){
        
        $scope.urls = [];
        $scope.tags = [];
        $scope.selectedTags = [];
        $scope.selectedTagsTags = [];
        
        function init() {
             tagFactory.getTags()
                .success(function(data, status, headers, config) {
                    $scope.tags = data;
                    $log.log('tagFactorySuccess');
                    //$log.log('dfghjk');
                    
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $log.log('urlFactoryError');
                });
            urlFactory.getUrls()
            .success(function(data, status, headers, config) {
                    $scope.urls = data;
                    $log.log('urlFactorySuccess');
                    angular.forEach($scope.urls, function(url){
                        if(url.Tags!=0){
                            url.Tags = url.Tags.join(',').split(',');
                            //$log.log("Finished to Array");
                            /*angular.forEach(url.Tags, function(urlTag){
                                //$log.log("coloring");
                               // $log.log(typeof(urlTag));
                                urlTag.tagColor="#000000";
                                //$log.log(urlTag.tagColor);
                                $scope.tags.forEach(function(tag){
                                            if(tag.Tag==urlTag) 
                                                urlTag.tagColor=tag.Color;
                                                 $log.log("after");
                                                 $log.log(typeof(tag.Color));
                                            });
                                        })*/
                                    }
                            if(url.Colors!=null&&url.Colors!=0){
                                url.Colors = url.Colors.join(',').split(',');
                                $log.log(url.Colors);
                                        }
                                })
                        })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $log.log('urlFactoryError');
                });
        }
        
        init();
        $scope.tlist = function(input){ $window.alert('hello '); return input.join(',').split(',');};
        $scope.getTagsList = function(ulr){
            $log.log("c function");
            return;
        }

    };
    
    viewController.$inject = ['$scope', '$log', '$window', 'urlFactory','tagFactory','url_tagFactory'];
    angular.module('MarkIt')
      .controller('viewController', viewController);

}());