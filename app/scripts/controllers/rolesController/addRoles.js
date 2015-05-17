'use strict';

/**
 * @ngdoc function
 * @name pooIhmApp.controller:AddRolesCtrl
 * @description
 * # AddRolesCtrl
 * Controller of the pooIhmApp
 */
angular.module('pooIhmApp')
  .controller('AddRolesCtrl', ['$scope', '$http', 'Roles', 'Users', 'Projects', '$window', function ($scope, $http, Roles, Users, Projects, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var getAllUsersSuccess = function(data) {
      $scope.allUsersList = data;
    };
    var getAllUsersError = function(data) {
    };
    Users.getAll(getAllUsersSuccess,getAllUsersError);

    var getAllProjectsSuccess = function(data) {
      $scope.allProjetcsList = data;
    };
    var getAllProjectsError = function(data) {
    };
    Projects.getAll(getAllProjectsSuccess,getAllProjectsError);
    var userToAdd=null;
    var projectToAdd=null;




    $scope.clickedOnThisUser = function(user) {
      $scope.userToAdd = user;
      userToAdd = user;
    };




    $scope.clickedOnThisProject = function(project) {
      $scope.projectToAdd = project;
      projectToAdd = project;
    };




    //                                                 ADD ONE PROJECT
    var postSuccess = function(data) {
      // On avertit que le role a bien été ajouté
      $scope.x = "Le role nommé " + data.name + " a bien été ajouté.";
      $scope.loginAlertMessage=true;

      // on supprime les choses dans le formulaire (les ng-model)
      $scope.nameChosen="";
    };

    var postError = function(data) {
      // nothing
    };

    var functionPost = function(postData) {
      Roles.post(postData,postSuccess,postError);
    };



    $scope.validNewRole = function(nameChosen) {
      if (userToAdd == null) {
        $window.alert( "Attention, vous devez choisir un utilisateur à qui affecter ce rôle.")
      }
      if (projectToAdd == null) {
        $window.alert("Attention, vous devez choisir un projet à qui affecter ce rôle.");
      }
      if (userToAdd != null && projectToAdd != null) {
        var postObject = new Object();
        postObject.name = nameChosen;
        postObject.UserId = userToAdd.id;
        postObject.ProjectId = projectToAdd.id;
        var s = JSON.stringify(postObject);

        functionPost(s);
      }
    }
  }]);
