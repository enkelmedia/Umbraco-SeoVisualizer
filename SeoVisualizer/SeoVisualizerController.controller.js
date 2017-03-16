angular.module("umbraco")
    .controller("EnkelMedia.SeoVisualizerController",
    function ($scope) {
        
        $scope.title = $scope.model.value.title;
        $scope.description = $scope.model.value.description;

        if ($scope.model.value.title == undefined) {

            $scope.title = "";
        }
        if ($scope.model.value.description == undefined) {

            $scope.description = "";
        }
        $scope.model.value = { title: $scope.title, description: $scope.description };

        $scope.$watch("title", function () {
            $scope.UpdateModel();
        });

        $scope.$watch("description", function () {
            $scope.UpdateModel();
        });

        $scope.UpdateModel = function () {
            $scope.model.value = { title: $scope.title, description: $scope.description };
        };


        $scope.GetUrl = function() {
            var url = $scope.GetParentContent().urls[0];

            if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
                // if umbraco returns absolute urls we don't need to append the protocol and host
                return url;
            }

            return $scope.ProtocolAndHost() + url;
        };

        /* ****** utility funcitons ******* */

        // Returns the protocal and host for the current domain (ie. http://www.mainwebsite.com).
        $scope.ProtocolAndHost = function() {
            var http = location.protocol;
            var slashes = http.concat("//");
            return slashes.concat(window.location.hostname);
        };

        // Climbs the $scope.parent objects to find the parent that contains the "content"-property which
        // has the url-property the we need to figure out the url of the current document.
        $scope.GetParentContent = function() {
            var currentScope = $scope.$parent;
            
            for (var i = 0; i < 150; i++) {
                if (currentScope.content) {
                    return currentScope.content;
                }

                currentScope = currentScope.$parent;
            }

            return null;

        };

    });
