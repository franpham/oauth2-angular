"use strict";

angular.module('myApp', ['ngStorage', 'ngRoute']);

var myApp = angular.module('myApp');
myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'views/login.html', controller: 'LoginController' })
    .when('/github', { templateUrl: '/index.html', controller: 'LoginCallbackController'})
    .when('/list', { templateUrl: 'views/list-gists.html', controller: 'ListGistsControllers'})
    .when('/new', { templateUrl: 'views/new-gist.html', controller: 'NewGistController'})
    .when('/edit', { templateUrl: 'views/edit-gist.html', controller: 'EditGistController'})
    .when('/delete', { templateUrl: 'views/delete-gist.html', controller: 'DeleteGistController'})
    .otherwise({ templateUrl: 'views/404.html' });
})
.run();