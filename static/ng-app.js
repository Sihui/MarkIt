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
                    $scope.new_selectedTags=[];
                    $scope.clickTag = function(tag){
                            tag.Selected=!tag.Selected;
                            //getSelectedTags
                        angular.element(document.getElementById("tags")).scope().getSelectedTags(tag);
                    };
                }
            };
        }); 
       app.directive('urlCard', function() {
            return {
                restrict: 'E',
                scope: { url: '='},
                template:'<div class="card">'+'<div class="card-heading simple">'+'<a href="//{{url.URL}}" target="_blank">{{url.Title}}</a></div>'+'<div class="card-body"><p>{{url.Note}}</p></div>'+'<div class="card-actions">'+'<tagSection ng-repeat="(i,tag) in url.Tags"  class="tag"  ng-style="set_color(url.Colors[i])">{{tag}}</tagSection>'+'</div></div>',
                link: function ( $scope, $element ) {
                     $scope.set_color = function (c) {
                            return { color: c}
                    }
                }
            };
        });
    app.directive('forcedirectedGraph',['$filter','$log',function($filter,$log){
            return {
                restrict: 'E',
                scope: { tags: '='},
                template:'<p>{{init()}}</p>',
                link: function ( $scope, $element,attr){
                            function createLink (s,t,v){
                                                    return {source: s,
                                                            target: t,
                                                             value:v};
                                                };
                            $scope.init = function(){
                                $log.log("INIT-DATA");
                                $log.log($scope.tags);
                                $log.log("END-INIT-DATA");
                                $scope.getLinks();
                                ForceDirectedGraph($scope.tags,$scope.links,$scope.tags);
                                return 1;
                            }
                            $scope.getLinks = function(){
                                        $scope.links = [];
                                        tags = $scope.tags;
                                        angular.forEach(tags, function(tag){
                                            if(tag.Friends!=0){
                                                //convert the json list into javascript array
                                                tag.Friends = tag.Friends.join(',').split(',');
                                                //$log.log(tag.Friends);
                                                var fList = tag.Friends.sort();
                                                //get a list of tag name
                                                var fNameList = [];
                                                angular.forEach(tags, function(tag){fNameList.push(tag.Tag)});
                                                //$log.log(tag.Friends);
                                                if(fList.length==1){
                                                    $scope.links.push(createLink(tags.indexOf(tag),tags.indexOf(fList[0]),1));
                                                }else{  
                                                    for(var i=0;i<fList.length-2;i++){
                                                        var value=1;
                                                        while(i+1<(fList.length-1)&&fList[i]==fList[i+1]){
                                                            value++;
                                                            i++;
                                                        }
                                                        //last element
                                                        if(i+1==(fList.length-1)){
                                                            //determine last element
                                                            if(fList[i]==fList[i+1]){
                                                            value++;
//                                                                $log.log("push 1");
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                            }else{
  //                                                              $log.log("push 2");
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i+1]),1)); 
                                                            }
                                                        }
                                                        //current element isn't the second last one
                                                        else{
                                                       //   $log.log("push 3");
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                            /* $log.log("START");
                                                             $log.log(tags);
                                                             $log.log(fList[i]);
                                                             $log.log(fNameList.indexOf(fList[i]));
                                                             $log.log("end");*/
                                                        }
                                                    }
                                                }                  
                                            }
                                        });
                                        //$scope.JSONLinks = angular.toJson($scope.links); 
                                        //$scope.JSONTags = angular.toJson(tags); 
                                 //$log.log(angular.toJson($scope.links));
                                         $log.log("END");
                                        //$log.log($scope.JSONTags);
                                //return $scope.JSONLinks                                                              
                            }
                           function ForceDirectedGraph(tags,JSONLinks,JSONTags){
                                //$log.log("FDG-DATA");
                                //$log.log(tags);
                                //$log.log(JSONLinks);
                                //$log.log(JSONTags);
                                //$log.log("END-FDG-DATA");
                                $scope.getLinks(tags);
                                $log.log("FDG-1");
                                var width = 960,
                                    height = 500;
                               $log.log("FDG-2");
                                var force = d3.layout.force()
                                    .charge(-120)
                                    .linkDistance(30)
                                    .size([width, height])
                                    .nodes(JSONTags)
                                    .links(JSONLinks)
                                    .start();

                                var svg = d3.select("k").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);
                               $log.log("FDG-3");
                              /* force.nodes(JSONTags)
                                      .links(JSONLinks)
                                        .start();*/
                               $log.log("FDG-5");
                               $log.log(JSONLinks);
                                $log.log(JSONTags);
                                var link = svg.selectAll(".link")
                                              .data(JSONLinks)
                                            .enter().append("line")
                                              .attr("class", "link")
                                              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
                                 $log.log("FDG-5"); 
                               var node = svg.selectAll(".node")
                                              .data(JSONTags)
                                            .enter().append("circle")
                                              .attr("class", "node")
                                              .attr("r", 20)
                                              .style("fill", function(d) { return d.Color; })
                                              .call(force.drag);
                                node.append("title")
                                    .text(function(d) { return d.Tag });
                                                            
                                force.on("tick", function() {
                                                    link.attr("x1", function(d) { return d.source.x; })
                                                        .attr("y1", function(d) { return d.source.y; })
                                                        .attr("x2", function(d) { return d.target.x; })
                                                        .attr("y2", function(d) { return d.target.y; });
                                    node.attr("cx", function(d) { return d.x; })
                                        .attr("cy", function(d) { return d.y; });
                                    });
                            $log.log("END-DFG"); 
                           }
                    
                    }
                }

        }]);
  
}());