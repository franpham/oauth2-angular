"use strict";

angular.module('myApp')
  .provider('ListGists', function() {
    var self = this;
    this.$get = ['$http', function($http) {
      return {
        getGists: function() {
          return $http.get('http://localhost:3000/api/gists');
        }
      };
    }];
  });