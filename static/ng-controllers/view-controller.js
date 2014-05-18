//controller for the new page
(function(){
    
    var viewController = function($scope,$log,$window,urlFactory,tagFactory,url_tagFactory){
        
        $scope.urls = [];
        $scope.tags = [];
        $scope.selectedTags = [];
        $scope.selectedTagsTags = [];
         $scope.filterTags = [];
        function init() {
             tagFactory.getTags()
                .success(function(data, status, headers, config) {
                    $scope.tags = data;
                    $log.log('tagFactorySuccess');                    
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
                                    }
                            if(url.Colors!=null&&url.Colors!=0){
                                url.Colors = url.Colors.join(',').split(',');
                                //$log.log(url.Colors);
                                        }
                                })
                        })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $log.log('urlFactoryError');
                });
        }
        
        init();
            $scope.getSelectedTags = function(inputTag){
            $log.log('getSelectedTagsList');
            if(inputTag.Selected){
                //add it
                 $log.log('add tag');
               
                $scope.filterTags.push(inputTag.Tag);
            }else{
                //remove it
                $log.log('try to remove tag');
                var index = $scope.filterTags.indexOf(inputTag.Tag);
                if ( index > -1) {
                     $scope.filterTags.splice(index, 1);
                    $log.log('remove tag');
                }
            }
        };
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