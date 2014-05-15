//controller for the new page
(function(){
    
    var newController = function($scope,$log,$window,urlFactory,tagFactory,url_tagFactory){
        $scope.message = "Here I'm. The js boss!";
        $scope.urls = [];
        $scope.tags = [];
        $scope.selectedTags = [];
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
        
        
        $scope.getSelectedTags = function(inputTag){
            $log.log('getSelectedTags');
            if(inputTag.Selected){
                //add it
                 $log.log('add tag');
                $scope.selectedTags.push(inputTag);
            }else{
                //remove it
                var index = $scope.selectedTags.indexOf(inputTag);
                if ( index > -1) {
                     $scope.selectedTags.splice(index, 1);
                    $log.log('remove tag');
                }
            }
        };
        
       // $scope.submitTag_urls = function(tags){
         //   url_tagFactory.sendUrlTag(tags)
           //     .success(function(data, status, headers, config) {
             //       $scope.urls = data;
               //     $log.log('url_tagFactorySuccess');
        //        })
          //      .error(function(data, status, headers, config) {
            //        $log.log(data.error + ' ' + status);
              //      $log.log('url_tagFactoryError: status= '+status+" headers="+headers+" config");
                //});
        //};
        $scope.clickSubmitBtn=function(){
            $log.log("btnf");
            angular.forEach($scope.selectedTags,function(tag, index){
                    $log.log(tag.Tag);
                //angular.element(document.getElementById("url_tag_URL")).scope().getSelectedTags(tag);
                    //function submitUrlTagForm(t,u){
  document.getElementById('url_tag_URL').value="www.baidu.com";
    document.getElementById('url_tag_Tag').value=tag.Tag;
    document.getElementById('url_tag_btn').click();
//}  
                });
        };
    };
    
    newController.$inject = ['$scope', '$log', '$window', 'urlFactory','tagFactory','url_tagFactory'];
    angular.module('MarkIt')
      .controller('newController', newController);

}());