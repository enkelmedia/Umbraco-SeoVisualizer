angular.module("umbraco")
    .controller("EnkelMedia.SeoVisualizerController",
    function ($scope) {
        
        // Hardcoding the label as hidden?
        $scope.model.hideLabel = false; //true;

        $scope.title = $scope.model.value.title;
        $scope.description = $scope.model.value.description;

        $scope.$watch("title", function () {
            $scope.UpdateModel();
        });

        $scope.$watch("description", function () {
            $scope.UpdateModel();
        });

        $scope.UpdateModel = function () {
            $scope.model.value = { title: $scope.title, description: $scope.description };
        };

        $scope.GetUrl = function () {

            return $scope.ProtocolAndHost() + $scope.GetParentContent().urls[0];

        }

        $scope.ProtocolAndHost = function () {

            var http = location.protocol;
            var slashes = http.concat("//");
            return slashes.concat(window.location.hostname);

        }

        $scope.GetParentContent = function () {
            currentScope = $scope.$parent;

            for (var i = 0; i < 150; i++) {
                if (currentScope.content) {
                    return currentScope.content
                }

                currentScope = currentScope.$parent;
            }
        }

    });