"use strict";
// var OAuth2 = require('oauth').OAuth2;



var oauth2 = new OAuth2(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
  'https://github.com/',       // provider base url
  'login/oauth/authorize',      // provider's login path
  'login/oauth/access_token',   // provider's access_token path
  null                          // options
);

// step #1: set the authorization URL;
// $localStorage will persist after closing tabs, $sessionStorage does not persist after closing tabs;
angular.module('myApp')
  .controller('LoginController', ['$scope', '$localStorage', function($scope, $localStorage) {
    if ($localStorage.access_token) {
      return $location.path('/list').replace();
    }
    $scope.$storage = $localStorage;
    $scope.authURL = oauth2.getAuthorizeUrl({
      redirect_uri: 'http://localhost:3000/auth/github/callback',
      scope: ['gist'],
      state: 'Authorize' + Math.round(Math.random() * 9999999)
    });
  }]);

