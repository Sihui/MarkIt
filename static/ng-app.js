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
    app.directive('directedforcedGraph',['$filter','$log',function($filter,$log){
             /*function createLink (s,t,v){
                  return {source: s,
                        target: t,
                         value:v};
                };*/
        
            /*function getLinks(scope,element,filter){
                    scope.links = [];
                    angular.forEach(tags, function(tag){
                        if(tag.Friends!=0){
                            //convert the json list into javascript array
                            tag.Friends = tag.Friends.join(',').split(',');
                            var fList = $filter('orderBy')(tag.Friends, string);
                            if(fList.length==1){//
                                scope.links.push(createLink(tags.indexOf(tag),tags.indexOf(fList[0]),1));
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
                                        scope.links.push(createLink(tags.indexOf(tag),tags.indexOf(fList[i]),value));    
                                        }else{
                                        scope.links.push(createLink(tags.indexOf(tag),tags.indexOf(fList[i]),value));  
                                        scope.links.push(createLink(tags.indexOf(tag),tags.indexOf(fList[i+1]),1));
                                        }
                                    }
                                    //current element isn't the second last one
                                    else{
                                        scope.links.push(createLink(tags.indexOf(tag),tags,indexOf(fList[i]),value));        
                                    }
                                }
                            } //                        
                        }
                    });
                    return angular.toJson(scope.links);
                }*/
            return {
                restrict: 'E',
                scope: { tags: '='},
                template:'<p>{{getLinks(tags)}}</p>',
                link: function ( $scope, $element){
                            function createLink (s,t,v){
                                                    return {source: s,
                                                            target: t,
                                                             value:v};
                                                };
                            
                            $scope.getLinks = function(tags){
                                        $scope.links = [];
                                        angular.forEach(tags, function(tag){
                                            if(tag.Friends!=0){
                                                //convert the json list into javascript array
                                                tag.Friends = tag.Friends.join(',').split(',');
                                                //$log.log(tag.Friends);
                                                var fList = tag.Friends.sort();
                                                //get a list of tag name
                                                var fNameList = [];
                                                angular.forEach(tags, function(tag){fNameList.push(tag.Tag)});
                                                $log.log(tag.Friends);
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
                                                       //     $log.log("push 3");
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
                                $log.log(angular.toJson($scope.links));
                                        return angular.toJson($scope.links);                  
                            }
                    
                    }
                }

        }]);
    
    app.directive('donutChart', function(){
      function link(scope, el, attr){
        var color = d3.scale.category10();
        var data = scope.data;
        var width = 300;
        var height = 300;
        var min = Math.min(width, height);
        var svg = d3.select(el[0]).append('svg');
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);
    
        svg.attr({width: width, height: height});
        var g = svg.append('g')
          // center the donut chart
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        
        // add the <path>s for each arc slice
        g.selectAll('path').data(pie(data))
          .enter().append('path')
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('fill', function(d, i){ return color(i) });
      }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    });
    app.directive('zoomableBubble', function(){
      function link(scope, el, attr){
        //var data = scope.data;
        var margin = 20,
            diameter = 960;

        var color = d3.scale.linear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.layout.pack()
            .padding(2)
            .size([diameter - margin, diameter - margin])
            .value(function(d) { return d.size; })

        var svg = d3.select("k").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
          .append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        
          d3.json("/../MarkIt/static/flare.json", function(error, root) {
          if (error) return console.error(error);

          var focus = root,
              nodes = pack.nodes(root),
              view;

          var circle = svg.selectAll("circle")
              .data(nodes)
            .enter().append("circle")
              .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
              .style("fill", function(d) { return d.children ? color(d.depth) : null; })
              .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

          var text = svg.selectAll("text")
              .data(nodes)
            .enter().append("text")
              .attr("class", "label")
              .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
              .style("display", function(d) { return d.parent === root ? null : "none"; })
              .text(function(d) { return d.name; });

          var node = svg.selectAll("circle,text");

          d3.select("k")
              .style("background", color(-1))
              .on("click", function() { zoom(root); });

          zoomTo([root.x, root.y, root.r * 2 + margin]);

          function zoom(d) {
            var focus0 = focus; focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                  var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                  return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
              .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
          }

          function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });
          }
        });
        d3.select(self.frameElement).style("height", diameter + "px");       
      }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    });
   /* app.directive('d3Bubble',['d3Service',function(d3Service){
            return{
                restrict:'EA',
            }
            
    
        }]);
    app.directive('d3Bars', ['$window', '$timeout', 'd3Service', 
  function($window, $timeout, d3Service) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        d3Service.d3().then(function(d3) {

          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');

          $window.onresize = function() {
            scope.$apply();
          };
            scope.data = [
            {name: "Greg", score: 98},
            {name: "Ari", score: 96},
            {name: 'Q', score: 75},
            {name: "Loser", score: 48}
          ];

          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);

          scope.render = function(data) {
            svg.selectAll('*').remove();

            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);

            renderTimeout = $timeout(function() {
              var width = d3.select(ele[0]).node().offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding),
                  color = d3.scale.category20(),
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                      return d.score;
                    })])
                    .range([0, width]);

              svg.attr('height', height);

              svg.selectAll('rect')
                .data(data)
                .enter()
                  .append('rect')
                  .on('click', function(d,i) {
                    return scope.onClick({item: d});
                  })
                  .attr('height', barHeight)
                  .attr('width', 140)
                  .attr('x', Math.round(margin/2))
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d) {
                    return color(d.score);
                  })
                  .on('click', function(d, i) {
                    return scope.onClick({item: d});
                  })
                  .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.score);
                    });
              svg.selectAll('text')
                .data(data)
                .enter()
                  .append('text')
                  .attr('fill', '#fff')
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 15;
                  })
                  .attr('x', 15)
                  .text(function(d) {
                    return d.name + " (" + d.score + ")";
                  });
            }, 100);
          };
        });
      }}
}])*/
    
}());