angular.module("umbraco")
    .controller("EnkelMedia.SeoVisualizerController",
    function ($scope, editorState) {

        var currentNode = editorState.getCurrent();

        if ($scope.model && $scope.model.value) {
            $scope.title = $scope.model.value.title;
            $scope.description = $scope.model.value.description;
        } else {
            
            $scope.title = "";
            $scope.description = "";
            
        }

        $scope.maxCharsTitle = 60;
        $scope.maxCharsDescription = 160;

        // use configuration if set
        if ($scope.model.config !== null) {
            if ($scope.model.config.maxCharsTitle !== '' && parseInt($scope.model.config.maxCharsTitle) > 0) {
                $scope.maxCharsTitle = parseInt($scope.model.config.maxCharsTitle);
            }
            if ($scope.model.config.maxCharsDescription !== '' && parseInt($scope.model.config.maxCharsDescription) > 0) {
                $scope.maxCharsDescription = parseInt($scope.model.config.maxCharsDescription);
            }
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

        $scope.getTitle = function() {

            var title = '';

            if ($scope.title && $scope.title !== '') {
                
                title = $scope.title;
            } else {

                if (currentNode && currentNode.variants) {
                    title = currentNode.variants[0].name;
                } else {
                    title = '';
                }

            }

            // Only append suffix if we have a value to render.
            if (title === '') {
                return title;
            }

            // Only append suffix if there is a value set
            if ($scope.model && $scope.model.config && $scope.model.config.titleSuffix && $scope.model.config.titleSuffix !== '') {
                return title + ' ' + $scope.model.config.titleSuffix;
            } else {
                return title;
            }

        };

        $scope.GetUrl = function () {

            
            // find out the url based on the current culture
            var allUrls = editorState.getCurrent().urls;

            var url = '';

            if (allUrls) {

                // If just one culture, lets use that
                if (allUrls.length === 1) {

                    url = allUrls[0].text;

                } else {
                    for (var i = 0; i < allUrls.length; i++) {
                        if (allUrls[i].culture === $scope.model.culture) {
                            url = allUrls[i].text;
                        }
                    }
                }

                if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
                    // if umbraco returns absolute urls we don't need to append the protocol and host
                    return url;
                }
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

    });
