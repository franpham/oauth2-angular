"use strict";

// Step 2: create the callback route that's called after authorization; provider returns access code as as query string;
angular.module('myApp')
  .controller('LoginCallbackController', ['$scope', '$localStorage', function($scope, $localStorage) {
    var code = $location.search().code;     // get the query string;
    if (!code)
      return $location.path('/404').replace();    // redirect to 404;
    oauth2.getOAuthAccessToken(code,
      { redirect_uri: 'http://localhost:3000/auth/github' },
      function (err, access_token, refresh_token, results) {
        // access_token provided to callback when oauth2 is invoked;
        var error = err || results.error;
        if (error) {
          console.error(error);
          $location.search('err', error);
          $location.path('/401').replace();
        }
        else {  // store access_token in localStorage;
          $localStorage.access_token = access_token;
          console.log(access_token);
          $location.path('list').replace();
        }
      }
    );
  }]);