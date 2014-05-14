(function(){
    var app = angular.module('MarkIt',[]);
    app.filter('selected', function() {
            return function (input) {
                if(input.Selected)
                return input;
                else return null;
            };
          });
    app.directive('tagManager', function() {
            return {
                restrict: 'E',
                scope: { tags: '=' },
                template:'<div class="tags">' +
        '<span ng-repeat="(idx, tag) in tags " class="tag" ng-click="clickTag(tag)" ng-style="set_color(tag)">{{tag.Tag}}</span>' +'</div>' ,
                link: function ( $scope, $element ) {           

                    $scope.set_color = function (tag) { 
                        if(tag.Selected)
                        return {  background:tag.Color }
                        else
                            return { color: tag.Color}
                    }
            
                    $scope.clickTag = function(tag){
                        if(tag.Selected)
                            tag.Selected=false;
                        else
                            tag.Selected=true;
                    };
        }
    };
});

}());