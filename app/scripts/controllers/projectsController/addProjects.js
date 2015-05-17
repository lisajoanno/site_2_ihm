'use strict';

/**
 * @ngdoc function
 * @name pooIhmApp.controller:AddProjectsCtrl
 * @description
 * # AddProjectsCtrl
 * Controller of the pooIhmApp
 */
angular.module('pooIhmApp')
  .controller('AddProjectsCtrl', ['$scope', '$http', 'Projects', function ($scope, $http, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    //                                                 ADD ONE PROJECT
    var postSuccess = function(data) {
      // On avertit que le projet a bien été ajouté
      $scope.x = "Le projet nommé " + data.title + " a bien été ajouté.";
      $scope.loginAlertMessage=true;

      // on supprime les choses dans le formulaire (les ng-model)
      $scope.titleChosen="";
      $scope.descriptionChosen="";
      $scope.yearChosen="";

    };

    var postError = function(data) {
      // nothing
    };

    var functionPost = function(postData) {
      Projects.post(postData,postSuccess,postError);
    };

    $scope.validNewProject = function(titleChosen, descriptionChosen, yearChosen) {
      var postObject = new Object();
      postObject.title = titleChosen;
      postObject.description = descriptionChosen;
      postObject.year = yearChosen;
      var s=JSON.stringify(postObject);
      functionPost(s);
    }
  }]);
