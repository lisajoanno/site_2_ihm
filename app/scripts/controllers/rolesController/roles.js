'use strict';

/**
 * @ngdoc function
 * @name pooIhmApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the pooIhmApp
 */
angular.module('pooIhmApp')
  .controller('RolesCtrl', ['$scope', '$http', 'Roles', 'Users', 'Projects','LinkUsersProjects', function ($scope, $http, Roles, Users, Projects, LinkUsersProjects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];




    //                                                 GET ALL ROLES
    var getAllSuccess = function(data) {
      $scope.roles = data;
    };

    var getAllError = function(data) {
      // nothing
    };


    // GET normal
    /**
     * Permet de récupérer tous les roles au chargement du controller.
     */
    Roles.getAll(getAllSuccess,getAllError);













    //                                                 GET ONE ROLE
    var getUserIdSuccess = function(data) {
      $scope.currentUserIdName = data.name + " " + data.surname;
    };

    var getUserIdError = function(data) {
      // TODO
    };

    var getProjectIdSuccess = function(data) {
      $scope.currentProjectIdTitle = data.title;
    };

    var getProjectIdError = function(data) {
      // TODO
    };

    var getSuccess = function(data) {
      $scope.showChangeUser = false;
      $scope.showChangeProject = false;
      $scope.currentRole = data;
      showNormalBalise();
      Users.get(data.UserId,getUserIdSuccess,getUserIdError);
      Projects.get(data.ProjectId,getProjectIdSuccess,getProjectIdError);
    };

    var getError = function(data) {
      // nothing
    };

    var functionGet = function(id) {
      Roles.get(id,getSuccess,getError);
    };

    $scope.clicked = function(id){
      functionGet(id);
    };

    /**
     * Cette méthode permet d'obtenir des informations supplémentaires sur un role.
     * @param id : id du role.
     */
    $scope.clicked = function(id){
      functionGet(id);
    };














    //                                                 DELETE ONE ROLE
    var deleteSuccess = function(data) {
      Roles.getAll(getAllSuccess,getAllError);
    };

    var deleteError = function(data) {
      // nothing
    };

    var functionDelete = function(id) {
      Roles.delete(id,deleteSuccess,deleteError);
    };

    /**
     * Cette méthode permet de supprimer un role.
     *
     * @param id : id du role qu'on souhaite supprimer.
     */
    $scope.deleteRole = function(id) {
      functionDelete(id);
    };





    //                                                 UPDATE ONE PROJECT
    var updateSuccess = function(data,id) {
      Roles.getAll(getAllSuccess,getAllError);
      functionGet(id);
      showNormalBalise();
    };

    var updateError = function(data) {
      // nothing
    };

    var functionUpdate = function(id,updateData) {
      Roles.put(id,updateData,updateSuccess,updateError);
    };

    /**
     * Cette méthode permet la mise à jour d'un role.
     * Elle change le nom du role.
     * @param id : id du role qu'on modifie
     * @param newName : String du nouveau nom du role
     */
    $scope.modifRole = function(id, newName) {
      var putObject = new Object();
      putObject.name = newName;
      var s=JSON.stringify(putObject);
      functionUpdate(id,s);
    };











    var getAllUsersSuccess = function(data) {
      $scope.listAllUsers = data;
    };

    var getAllUsersError = function(data) {

    };

    $scope.changeUser = function() {
      $scope.showChangeUser = true;
      $scope.showChangeProject = false;
      Users.getAll(getAllUsersSuccess,getAllUsersError);
    };



    var validChangeUserSuccess = function(data) {
    };

    var validChangeUserError = function(data) {
    };

    $scope.validChangeUser = function(role,user) {
      var postObject = new Object();
      postObject.name = role.name;
      postObject.UserId = user.id;
      postObject.ProjectId = role.ProjectId;
      var s=JSON.stringify(postObject);
      Roles.delete(role.id,deleteSuccess,deleteError);
      Roles.post(s,validChangeUserSuccess,validChangeUserError);
      Roles.getAll(getAllSuccess,getAllError);
      functionGet(role.id);
    };



    var getAllProjectsSuccess = function(data) {
      $scope.listAllProjects = data;
    };

    var getAllProjectsError = function(data) {

    };

    $scope.changeProject = function() {
      $scope.showChangeUser = false;
      $scope.showChangeProject = true;
      Projects.getAll(getAllProjectsSuccess,getAllProjectsError);
    };

    var validChangeProjectSuccess = function(data) {
    };

    var validChangeProjectError = function(data) {
    };

    $scope.validChangeProject = function(role,project) {
      var postObject = new Object();
      postObject.name = role.name;
      postObject.UserId = role.UserId;
      postObject.ProjectId = project.id;
      var s=JSON.stringify(postObject);
      Roles.delete(role.id,deleteSuccess,deleteError);
      Roles.post(s,validChangeProjectSuccess,validChangeProjectError);
      Roles.getAll(getAllSuccess,getAllError);
      functionGet(role.id);
    };








    //                                                                        AUTRES
    $scope.hoverIn = function(){
      this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
      this.hoverEdit = false;
    };

    /**
     * Cette méthode sert à mettre à jour la vue pour montrer la vue de présentation à l'utilisateur.
     */
    var showNormalBalise = function() {
      $scope.showUpdate = false;
      $scope.newNameValue="";
    };

    /**
     * Cette méthode sert à mettre à jour la vue pour montrer la vue d'update à l'utilisateur.
     */
    $scope.updateBalise = function(){
      $scope.showUpdate = true;
      $scope.newNameValue=$scope.currentRole.name;
    };

    $scope.normalBalise = function(){
      showNormalBalise();
    };

  }]);

