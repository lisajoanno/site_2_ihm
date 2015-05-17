'use strict';

/**
 * @ngdoc function
 * @name pooIhmApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the pooIhmApp
 */
angular.module('pooIhmApp')
  .controller('ProjectsCtrl', ['$scope', '$http','Users', 'Projects', 'LinkUsersProjects', function ($scope, $http, Users, Projects, LinkUsersProjects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.buttonName = "Voir les participants";






    //                                                 GET ALL PROJECTS
    var getAllSuccess = function(data) {
      $scope.projects = data;
    };

    var getAllError = function(data) {
      // nothing
    };


    // GET normal
    /**
     * Permet de récupérer tous les projets au chargement du controller.
     */
    Projects.getAll(getAllSuccess,getAllError);













    //                                                 GET ONE PROJECT
    var getSuccess = function(data) {
      $scope.currentProject = data;
    };

    var getError = function(data) {
      // nothing
    };

    var functionGet = function(id) {
      Projects.get(id,getSuccess,getError);
    };

    $scope.clicked = function(id){
      functionGet(id);
    };

    /**
     * Cette méthode permet d'obtenir des informations supplémentaires sur un projet spécifique.
     * @param id : id du projet.
     */
    $scope.clicked = function(id){
      $scope.buttonName = "Voir les participants";
      $scope.showAllUsersOnThisProject = false;
      $scope.showSelectionOfUser = false;
      functionGet(id);
    };














    //                                                 DELETE ONE PROJECT
    var deleteSuccess = function(data) {
      // TODO ça marche mais est-ce beau?
      Projects.getAll(getAllSuccess,getAllError);
    };

    var deleteError = function(data) {
      // nothing
    };

    var functionDelete = function(id) {
      Projects.delete(id,deleteSuccess,deleteError);
    };

    /**
     * Cette méthode permet de supprimer un projet.
     *
     * @param id : id du projet qu'on souhaite supprimer.
     */
    $scope.deleteProject = function(id) {
      functionDelete(id);
    };





    //                                                 UPDATE ONE PROJECT
    var updateSuccess = function(data,id) {
      // TODO est-ce beau?
      Projects.getAll(getAllSuccess,getAllError);
      functionGet(id);
      showNormalBalise();
    };

    var updateError = function(data) {
      // nothing
    };

    var functionUpdate = function(id,updateData) {
      Projects.put(id,updateData,updateSuccess,updateError);
    };

    /**
     * Cette méthode permet la mise à jour d'un projet. Elle récolte
     * les infos (forcément correctes sinon l'utilisateur ne peut pas valider)
     * et elle modifie le projet en question.
     * @param id : id du projet qu'on modifie
     * @param newTitle : String du nouveau titre du projet
     * @param newDescription : String de la nouvelle description du projet
     * @param newYear : String de la nouvelle année du projet
     */
    $scope.modifProject = function(id, newTitle, newDescription, newYear) {
      var putObject = new Object();
      putObject.title = newTitle;
      putObject.description = newDescription;
      putObject.year = newYear;
      var s=JSON.stringify(putObject);
      functionUpdate(id,s);
    };


    //                                                                        AUTRES
    /**
     * Cette méthode sert à mettre à jour la vue pour montrer la vue de présentation à l'utilisateur.
     */
    var showNormalBalise = function() {
      $scope.showUpdate = false;
      $scope.newTitleValue="";
      $scope.newYearValue="";
      $scope.newDescriptionValue="";
    };

    /**
     * Cette méthode sert à mettre à jour la vue pour montrer la vue d'update d'un projet à l'utilisateur.
     */
    $scope.updateBalise = function(){
      $scope.showUpdate = true;
      $scope.newTitleValue=$scope.currentProject.title;
      $scope.newYearValue=$scope.currentProject.year;
      $scope.newDescriptionValue=$scope.currentProject.description;
    };

    $scope.normalBalise = function(){
      showNormalBalise();
    };










    //                                                     USER PAR PROJET
    var getUserByProjectSuccess = function(data) {
      $scope.usersOnThisProject = data;
    };

    var getUserByProjectError = function(data) {
      // Nothing
    };

    var functionGetUserByProject = function(id) {
      LinkUsersProjects.getUserFromProject(id,getUserByProjectSuccess,getUserByProjectError);
    };

    /**
     * Cette méthode permet de charger les participants d'un projet spécifique.
     * La vue se mettra à jour et les participants seront affichés en détail.
     * @param id : id du projet dont on cherche les participants
     */
    $scope.showUsersOnThisProject = function(id) {
      $scope.showAllUsersOnThisProject = !$scope.showAllUsersOnThisProject;
      changeButtonName();
      functionGetUserByProject(id);
    };

    /**
     * Cette méthode sert à changer le nom du bouton pour voir (ou cacher) les noms des participants.
     */
    var changeButtonName = function() {
      if ($scope.buttonName == "Voir les participants") $scope.buttonName = "Cacher les participants";
      else $scope.buttonName = "Voir les participants";
    };







    //
    var addUserToThisProjectSuccess = function(data) {
      $scope.showSelectionOfUser = false;
      $scope.showAllUsersOnThisProject = false;
    };

    var addUserToThisProjectError = function(data) {

    };

    var functionAddAUserToThisProject = function(userId,projectId) {
      var userData = {}; // pour le second paramètre du PUT
      LinkUsersProjects.putNewUserInProject(projectId,userId,userData,addUserToThisProjectSuccess,addUserToThisProjectError);
    };

    var loadAllUsersSuccess = function(data) {
      $scope.allUsers = data;
    };
    var loadAllUsersError = function(data) {
    };

    $scope.addAUserToThisProject = function() {
      $scope.showSelectionOfUser = !$scope.showSelectionOfUser;
      Users.getAll(loadAllUsersSuccess,loadAllUsersError);
    };


    $scope.addThisUserToThisProject = function(userId,projectId) {
      functionAddAUserToThisProject(userId,projectId);
    }

  }]);

