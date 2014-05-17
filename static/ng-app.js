(function(){
    var app = angular.module('MarkIt',[]);
    app.filter('selected', function() {
            return function (input) {
                if(input.Selected)
                return input;
                else return null;
            };
          });
    app.directive('tagManager', ['$log',function($log) {
            return {
                restrict: 'E',
                scope: { tags: '=' },
                template:'<div class="tags">' +
        '<span ng-repeat="(idx, tag) in tags " class="tag" ng-click="clickTag(tag)" ng-style="set_color(tag)">{{tag.Tag}}</span>' +'</div>' ,
                link: function ( $scope, $element ) {           
                    $log.log("tagM");
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
        }]); 
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
                template:'<div>{{fdg()}}<div>',
                link: function ( $scope, $element,attr){
                            function createLink (s,t,v){
                                                    return {source: s,
                                                            target: t,
                                                            value:v};
                                                };
                            $scope.fdg = function(){
                                //$log.log("INIT-DATA");
                                //$log.log(tags);
                                //$log.log("END-INIT-DATA");
                                $log.log("in function");
                                $scope.getLinks();
                                ForceDirectedGraph($scope.tags,$scope.links,$scope.tags);
                                //return 1;
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
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                            }else{
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i+1]),1)); 
                                                            }
                                                        }
                                                        //current element isn't the second last one
                                                        else{
                                                            $scope.links.push(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                        }
                                                    }
                                                }                  
                                            }
                                        });
                                        //$scope.JSONLinks = angular.toJson($scope.links); 
                                        //$scope.JSONTags = angular.toJson(tags); 
                                                                                                  
                            }
                           function ForceDirectedGraph(tags,links){
                                $scope.getLinks(tags);
                                //$log.log("FDG-1");
                                var width = 900,
                                    height = 400;
                               //$log.log("FDG-2");
                                var force = d3.layout.force()
                                    .charge(-120)
                                    .linkDistance(30)
                                    .size([width, height])
                                    .nodes(tags)
                                    .links(links)
                                    .start();
                               //for some reasone this directive load multipule times 
                               //(twice for urlFactory, twice for tagFactory, and twice for the page/driective itself)
                               //so I have to remove previouse svg before appending a new one
                               d3.select("svg") .remove();
                                var svg = d3.select($element[0]).append("svg")
                               //  .attr("viewBox", "0 0 " + width+ " " + height );
          //  .attr("preserveAspectRatio", "xMidYMid meet");
                                            .attr("width", width)
                                            .attr("height", height);
                              // var vis = d3.select("$element[0]")//.append("svg:svg")
                               //.attr("viewBox", "0 0 " + width+ " " + height )
                               //.attr("preserveAspectRatio", "xMinYMin")
                                var link = svg.selectAll(".link")
                                              .data(links)
                                            .enter().append("line")
                                              .attr("class", "link")
                                              .style("stroke-width", function(d) { return Math.sqrt(d.value); });
                               var node = svg.selectAll(".node")
                                              .data(tags)
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
                           // $log.log("END-DFG"); 
                           }
                    
                    }
                }

        }]);
  
}());