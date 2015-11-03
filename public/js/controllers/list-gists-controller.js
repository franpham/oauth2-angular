"use strict";

// step #3: call the server's API to get gists;
angular.module('myApp')
  .controller('ListGistsController', ['$scope', 'ListGists', function($scope, ListGists) {
    $scope.gists = null;
    ListGists.getGists().success(function(gists) {
      $scope.gists = gists;
    });
  }]);
