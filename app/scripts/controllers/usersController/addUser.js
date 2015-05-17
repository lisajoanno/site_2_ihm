/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AddUserCtrl
 * @description
 * # AddUserCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmApp')
  .controller('AddUserCtrl', ['$scope', '$http','Users', function ($scope, $http, Users) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    //                                                 ADD ONE USER
    var postSuccess = function(data) {
      // On avertit que l'utilisateur a bien été ajouté
      $scope.x = "L'utilisateur "+ data.name+" "+ data.surname + " a bien été ajouté.";
      $scope.loginAlertMessage=true;

      // on supprime les choses dans le formulaire (les ng-model)
      $scope.nameChosen="";
      $scope.surnameChosen="";
      $scope.emailChosen="";
      $scope.websiteChosen="";
    };

    var postError = function(data) {
      // nothing
    };

    var functionPost = function(postData) {
      Users.post(postData,postSuccess,postError);
    };


    $scope.validNewUser = function(nameChosen, surnameChosen, emailChosen, websiteChosen) {
      var postObject = new Object();
      postObject.name = nameChosen;
      postObject.surname = surnameChosen;
      postObject.email = emailChosen;
      postObject.website = websiteChosen;
      var s=JSON.stringify(postObject);
      functionPost(s);
    };
  }]);


