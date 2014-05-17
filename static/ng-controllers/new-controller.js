//controller for the new page
(function(){
    
    var newController = function($scope,$log,$window,urlFactory,tagFactory,url_tagFactory){
        
        $scope.urls = [];
        $scope.tags = [];
        $scope.selectedTags = [];
        $scope.selectedTagsTags = [];
        $scope.selectedColors = [];
        
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
                    //$log.log('dfghjk');
                    
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $log.log('urlFactoryError');
                });
        }
        
        init();
        
        
        $scope.getSelectedTags = function(inputTag){
            $log.log('getSelectedTags');
            if(inputTag.Selected){
                //add it
                 $log.log('add tag');
               
                $scope.selectedTagsTags.push(inputTag.Tag);
                 $scope.selectedColors.push(inputTag.Color);
                 $log.log(inputTag.Color);
                $scope.selectedTags.push(inputTag);
            }else{
                //remove it
                var index = $scope.selectedTags.indexOf(inputTag);
                if ( index > -1) {
                     $scope.selectedTags.splice(index, 1);
                     $scope.selectedColors.splice(index, 1);
                     $scope.selectedTagsTags.splice(index, 1);
                    $log.log('remove tag');
                }
            }
        };
 
        $scope.clickSubmitBtn=function(){
            $log.log("btnf");         
            document.getElementById('url_Tags').value=$scope.selectedTagsTags;    
            document.getElementById('url_Colors').value=$scope.selectedColors;    
            document.getElementById('urlSubmitBtn').click();
        };
    };
    
    newController.$inject = ['$scope', '$log', '$window', 'urlFactory','tagFactory','url_tagFactory'];
    angular.module('MarkIt')
      .controller('newController', newController);

}());