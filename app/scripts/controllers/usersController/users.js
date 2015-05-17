'use strict';

/**
 * @ngdoc function
 * @name pooIhmApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the pooIhmApp
 */
angular.module('pooIhmApp')
  .controller('UsersCtrl', ['$scope', '$http', 'Users','LinkUsersProjects', function ($scope, $http, Users, LinkUsersProjects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.buttonName = "Voir ses projets";

    //                                                 GET ALL
    var getAllSuccess = function(data) {
      $scope.users = data;
    };

    var getAllError = function(data) {
      // nothing
    };

    // GET normal
    /**
     * Permet de récupérer tous les utilisateurs au chargement du controller.
     */
    Users.getAll(getAllSuccess,getAllError);






    //                                                 GET ONE USER
    var getSuccess = function(data) {
      $scope.currentUser = data;
      $scope.showUpdate=false;
    };

    var getError = function(data) {
      // nothing
    };

    var functionGet = function(id) {
      Users.get(id,getSuccess,getError);
    };

    /**
     * Cette méthode permet d'obtenir des informations supplémentaires sur un utilisateur spécifique.
     * @param id : id de l'utilisateur.
     */
    $scope.clicked = function(id){
      $scope.buttonName = "Voir ses projets";
      $scope.showAllProjectsOfThisUser = false;
      functionGet(id);
    };



    //                                                 DELETE ONE USER
    var deleteSuccess = function(data) {
      // TODO ça marche mais est-ce beau?
      Users.getAll(getAllSuccess,getAllError);
    };

    var deleteError = function(data) {
      // nothing
    };

    var functionDelete = function(id) {
      Users.delete(id,deleteSuccess,deleteError);
    };

    /**
     * Cette méthode permet de supprimer un utilisateur.
     *
     * @param id : id de l'utilisateur qu'on souhaite supprimer.
     */
    $scope.deleteUser = function(id) {
      functionDelete(id);
    };



    //                                                 UPDATE ONE USER
    var updateSuccess = function(data,id) {
      // TODO est-ce beau?
      Users.getAll(getAllSuccess,getAllError);
      functionGet(id);
      showNormalBalise();
    };

    var updateError = function(data) {
      // nothing
    };

    var functionUpdate = function(id,updateData) {
      Users.put(id,updateData,updateSuccess,updateError);
    };

    /**
     * Cette méthode permet la mise à jour d'un utilisateur. Elle récolte
     * les infos (forcément correctes sinon l'utilisateur ne peut pas valider)
     * et elle modifie l'utilisateur courant.
     * @param id : id du projet qu'on modifie
     * @param newName : String du nouveau nom de l'utilisateur
     * @param newSurname : String du nouveau prénom de l'utilisateur
     * @param newEmail : String du nouveau mail du l'utilisateur
     * @param newWebsite : String du nouveau site du l'utilisateur
     */
    $scope.modifUser = function(id, newName, newSurname, newEmail, newWebsite) {
      var putObject = new Object();
      putObject.name = newName;
      putObject.surname = newSurname;
      putObject.email = newEmail;
      putObject.website = newWebsite;
      var s=JSON.stringify(putObject);
      functionUpdate(id,s);
    };







    //                                                AUTRES FONCTIONS

    $scope.hoverIn = function(){
      this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
      this.hoverEdit = false;
    };



    var showNormalBalise = function() {
      $scope.showUpdate = false;
      $scope.newNameValue="";
      $scope.newSurnameValue="";
      $scope.newEmailValue="";
      $scope.newWebsiteValue="";
    };

    $scope.updateBalise = function(){
      $scope.showUpdate = true;
      $scope.newNameValue=$scope.currentUser.name;
      $scope.newSurnameValue=$scope.currentUser.surname;
      $scope.newEmailValue=$scope.currentUser.email;
      $scope.newWebsiteValue=$scope.currentUser.website;
    };

    $scope.normalBalise = function(){
      showNormalBalise();
    };












    //                                                    PROJET PAR USER
    var getProjectByUserSuccess = function(data) {
      $scope.projectsOfThisUser = data;
    };

    var getProjectByUserSuccessError = function(data) {
      // Nothing
    };

    var functionGetProjectByUser = function(id) {
      LinkUsersProjects.getProjectsOfUser(id,getProjectByUserSuccess,getProjectByUserSuccessError);
    };

    /**
     * Cette méthode permet de charger les participants d'un projet spécifique.
     * La vue se mettra à jour et les participants seront affichés en détail.
     * @param id : id du projet dont on cherche les participants
     */
    $scope.showProjectsOfThisUser = function(id) {
      $scope.showAllProjectsOfThisUser = !$scope.showAllProjectsOfThisUser;
      changeButtonName();
      functionGetProjectByUser(id);
    };

    /**
     * Cette méthode sert à changer le nom du bouton pour voir (ou cacher) les noms des participants.
     */
    var changeButtonName = function() {
      if ($scope.buttonName == "Voir ses projets") $scope.buttonName = "Cacher ses projets";
      else $scope.buttonName = "Voir ses projets";
    }




    //                                                    SUPPRESSION PROJET PAR USER
    var deleteProjectFromUserSuccess = function(data) {
      // Nothing
    };

    var deleteProjectFromUserError = function(data) {
      // Nothing
    };

    var functionDeleteProjectFromUser = function(userId,projectId) {
      LinkUsersProjects.deleteProjectsFromUser(userId,projectId,deleteProjectFromUserSuccess,deleteProjectFromUserError);
    };

    $scope.deleteThisProjectFromThisUser = function(currentUserId,projectOfUserId) {
      functionDeleteProjectFromUser(currentUserId,projectOfUserId);
    };

  }]);
