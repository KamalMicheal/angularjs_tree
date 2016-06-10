var homeApp = angular.module("HomeApp", []);

homeApp.directive("treeTag", function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: "Tree",
            link: function(scope, element, attrs) {

            },
            controller: function($scope, $log) {
                $scope.data = [{
                        id: 1,
                        name: 'First Node',
                        childrenCount: 5
                    },
                    {
                        id: 2,
                        name: 'Second Node',
                        childrenCount: 0
                    },
                    {
                        id: 3,
                        name: 'Third Node',
                        childrenCount: 1
                    }];

                $scope.clicked = function() {
                    $log.log("Button Clicked!");
                }

                $scope.getNodes = function(onlyParents) {
                    var nodesArray = [];
                    for (var dataItem in $scope.data) {
                        if (($scope.data[dataItem].childrenCount > 0 && onlyParents) ||
                            ($scope.data[dataItem].childrenCount == 0 && !onlyParents)) {
                            nodesArray.push($scope.data[dataItem]);
                        }
                    }
                    return nodesArray;
                }

                $scope.getParents = function() {
                    return $scope.getNodes(true);
                }

                $scope.getLeaf = function() {
                    return $scope.getNodes(false);
                }
            }
        };
    });

homeApp.directive("nodeTag", function() {
       return {
           restrict: 'E',
           scope: {
               id: '@',
               name: '@',
               childrenCount: '@'
           },
           templateUrl: 'Node',
           controller: function($scope, $log) {
               $log.log($scope);
           }
       }
    });