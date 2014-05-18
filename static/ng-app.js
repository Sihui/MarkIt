(function(){
    var app = angular.module('MarkIt',[]);
    app.filter('selectedTagList', function() {
                return function( urls, filterTags ) {
                  console.log('selectedTagList',filterTags);
                  if(filterTags.length==0) {console.log('filtered',urls);  return urls;}
                  var filtered = [];
                  angular.forEach(urls, function(url) {
                      console.log('selectedTagList - url: ',url);
                        angular.forEach(url.Tags, function(tag){
                            console.log("Ctag",tag,"Tlist",filterTags); 
                            console.log(filterTags.indexOf(tag)); 
                            if(filterTags.indexOf(tag)!=-1){
                            //this url has at least one of the filterTags
                                if(filtered.indexOf(url)==-1){
                                        
                                    filtered.push(url);
                                    console.log("pushed"); 
                                }
                            }
                        });
                  });
                  console.log('filtered',filtered);                    
                  return filtered;
                };
            });
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
                        $log.log("click");
                       // $log.log(angular.element(document.getElementById("tags")).scope());
                        angular.element(document.getElementById("tags")).scope().getSelectedTags(tag);
                        $log.log("clickEND");
                    };
                }
            };
        }]); 
       app.directive('urlCard', ['$log',function($log) {
            return {
                restrict: 'E',
                scope: { url: '='},
                template:'<div class="card">'+'<div class="card-heading simple">'+'<a href="//{{url.URL}}" target="_blank">{{url.Title}}</a></div>'+'<div class="card-body"><p>{{url.Note}}</p></div>'+'<div class="card-actions">'+'<tagSection ng-repeat="(i,tag) in url.Tags"  class="tag"  ng-style="set_color(url.Colors[i])"><span>{{tag}}</span></tagSection>'+'</div></div>'+'<p>{{}}</p>',
                link: function ( $scope, $element ) {
                    console.log("urlCard");
                     $scope.set_color = function (c) {
                            return { color: c}
                    }
                }
            };
        }]);
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
                                $log.log("fdg 1");
                                $scope.getLinks();
                                $log.log("fdg 2");
                                ForceDirectedGraph($scope.tags,$scope.links);
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
                                                   var c=createLink(tags.indexOf(tag),fNameList.indexOf(fList[0]),1);  
                                                    if(c.source>-1&&c.target>-1)
                                                            $scope.links.push(createLink(c.source,c.target,c.value)); 
                                                    $log.log("------1------");
                                                    $log.log(c);
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
                                                            var c=createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value);  
                                                            if(c.source>-1&&c.target>-1)
                                                            $scope.links.push(createLink(c.source,c.target,c.value)); 
                                                                $log.log("------2------");
                                                    $log.log(c);
                                                            }else{
                                                                $log.log("push"); 
                                                                $log.log(createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value)); 
                                                                var c=createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value);  
                                                           if(c.source>-1&&c.target>-1)
                                                            $scope.links.push(createLink(c.source,c.target,c.value)); 
                                                                $log.log("------3------");
                                                    $log.log(c);
                                                                var c=createLink(tags.indexOf(tag),fNameList.indexOf(fList[i+1]),1);  
                                                            if(c.source>-1&&c.target>-1)
                                                            $scope.links.push(createLink(c.source,c.target,c.value)); 
                                                                $log.log("------4------");
                                                    $log.log(c);
                                                            }
                                                        }
                                                        //current element isn't the second last one
                                                        else{
                                                            $log.log("push");                                                      
                                                            var c=null;
                                                            c=createLink(tags.indexOf(tag),fNameList.indexOf(fList[i]),value);  
                                                            if(c.source>-1&&c.target>-1)
                                                            $scope.links.push(createLink(c.source,c.target,c.value)); 
                                                            $log.log("------5-----");
                                                            $log.log(c);
                                                            $log.log(c.source);
                                                            $log.log(c.target);
                                                            $log.log(typeof(c.source));
                                                            $log.log(typeof(c.target));
                                                        }
                                                    }
                                                }                  
                                            }
                                        });
                                        //$scope.JSONLinks = angular.toJson($scope.links); 
                                        //$scope.JSONTags = angular.toJson(tags); 
                                $log.log("end clink");   
                                $log.log($scope.links);   
                                $log.log($scope.tags);   
                                                                                                  
                            }
                           function ForceDirectedGraph(tags,links){
                               $log.log("fdg 3");
                                d3.select("svg").remove();
                                var svg = d3.select($element[0]).append("svg");
                                var force = d3.layout.force();
                               $log.log("fdg 4");
                               $log.log(tags);
                               $log.log(links);
                               var link = svg.selectAll(".link")
                                              .data(links)
                                            .enter().append("line")
                                              .attr("class", "link")
                                          .style("stroke-width", function(d) { return Math.sqrt(d.value); });
                              var node = svg.selectAll(".node")
                                                .data(tags)
                                              .enter().append("g")
                                                .attr("class", "node")
                                                .call(force.drag);

                                            node.append("circle")
                                            .style("fill", function(d) { return d.Color; })
                                                .attr("r", 10);

                                            node.append("text")
                                                .attr("x", 12)
                                                .attr("dy", ".35em")
                                                .text(function(d) { return d.Tag; });
                                $log.log("fdg 5");
                                          force
                                          .nodes(tags)
                                          .links(links)
                                          .linkDistance(60)
                                          .charge(-120)
                                          .on("tick", tick)
                                          .start();
                              
                             $log.log("fdg 6");
                                          


                                          resize();
                                          d3.select(window).on("resize", resize);

                                          function tick() {
                                            link.attr("x1", function(d) { return d.source.x; })
                                                .attr("y1", function(d) { return d.source.y; })
                                                .attr("x2", function(d) { return d.target.x; })
                                                .attr("y2", function(d) { return d.target.y; });

                                            node.attr("cx", function(d) { return d.x; })
                                              .attr("cy", function(d) { return d.y; });
                                              node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                                              
                                          }

                                          function resize() {
                                            width = window.innerWidth, height = window.innerHeight;
                                            svg.attr("width", width).attr("height", height/2.5);
                                            force.size([width, height/2.5]).resume();
                                          }
                                }                
                            }
                        }

        }]);
  
}());