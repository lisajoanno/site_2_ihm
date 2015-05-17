'use strict';

/**
 * @ngdoc function
 * @name pooIhmApp.controller:AddRolesCtrl
 * @description
 * # AddRolesCtrl
 * Controller of the pooIhmApp
 */
angular.module('pooIhmApp')
  .controller('AddRolesCtrl', ['$scope', '$http', 'Roles', function ($scope, $http, Roles) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



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
      var postObject = new Object();
      postObject.name = nameChosen;
      var s=JSON.stringify(postObject);

      functionPost(s);
    }
  }]);
