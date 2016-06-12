var homeApp = angular.module("HomeApp", []);

var closedIcon = '/arrow_closed.png';
var openIcon = '/arrow_open.png';
var nodeIcon = '/node.png';

var heCtrl = homeApp.controller("heCtrl", function($scope) {
    $scope.heID = "1";
});

heCtrl.directive("treeTag", function () {
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

heCtrl.directive("nodeTag", function() {
    return {
        restrict: 'E',
        scope: {
            id: '@',
            name: '@',
            childrenCount: '@',
            isClosed: '='
        },
        templateUrl: 'Node',
        controller: function ($scope, $log, $window) {
            if ($scope.childrenCount > 0)
                $scope.nodeIcon = $window.closedIcon;
            else
                $scope.nodeIcon = $window.nodeIcon;

            $scope.toggleNode = function () {
                if ($scope.isClosed) {
                    $scope.isClosed = false;
                    $scope.expand();
                } else {
                    $scope.isClosed = true;
                    $scope.collapse();
                }
            };

            $scope.isParent = function() {
                return($scope.childrenCount > 0);
            };

            $scope.expand = function() {
                if ($scope.isParent()) {
                    $scope.nodeIcon = $window.openIcon;
                    $log.log($scope.$parent.$parent.$parent.heID);
                }
            };

            $scope.collapse = function() {
                if ($scope.isParent()) {
                    $scope.nodeIcon = $window.closedIcon;
                }
            };
        }
    }
});