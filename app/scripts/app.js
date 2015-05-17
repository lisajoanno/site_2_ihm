'use strict';

/**
 * @ngdoc overview
 * @name pooIhmApp
 * @description
 * # pooIhmApp
 *
 * Main module of the application.
 */
angular
  .module('pooIhmApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/users' , {
        templateUrl: '../views/Users/usersList.html',
        controller: 'UsersCtrl'
      })
      .when('/addUser' , {
        templateUrl: '../views/Users/addUser.html',
        controller: 'AddUserCtrl'
      })
      .when('/projects' , {
        templateUrl: '../views/Projects/projectsList.html',
        controller: 'ProjectsCtrl'
      })
      .when('/addProjects' , {
        templateUrl: '../views/Projects/addProjects.html',
        controller: 'AddProjectsCtrl'
      })
      .when('/roles' , {
        templateUrl: '../views/Roles/rolesList.html',
        controller: 'RolesCtrl'
      })
      .when('/addRoles' , {
        templateUrl: '../views/Roles/addRoles.html',
        controller: 'AddRolesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
