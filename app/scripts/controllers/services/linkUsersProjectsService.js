'use strict'

/**
 * Service pour faire des liaisons entre les utilisateurs et les projets.
 */
angular.module('pooIhmApp').service('LinkUsersProjects',['$http',function LinkUsersProjects($http) {

  /**
   * GET pour avoir les projets d'une personne
   * @param userId
   * @param onSuccess
   * @param onError
   */
  this.getProjectsOfUser = function(userId,onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId + "/Projects/" )
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data);
        }
      });
  };

  /**
   * DELETE pour supprimer un projet d'une personne
   * @param userId
   * @param projectId
   * @param onSuccess
   * @param onError
   */
  this.deleteProjectsFromUser = function(userId,projectId,onSuccess,onError) {
    $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId + "/Users/" +userId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data);
        }
      });
  };

  /**
   * GET pour avoir les participants d'un projet
   * @param projectId
   * @param onSuccess
   * @param onError
   */
  this.getUserFromProject = function(projectId,onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId + "/Users/" )
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data);
        }
      });
  };

  /**
   * PUT d'un nouveau user à un projet
   * @param projectId
   * @param userId
   * @param userData
   * @param onSuccess
   * @param onError
   */
  this.putNewUserInProject = function(projectId,userId,userData,onSuccess,onError) {
    $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+ projectId +'/Users/'+userId,userData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data);
        } else {
          onError(data);
        }
      });
  };


  /**
   * Ne fonctionne pas.
   **/
  this.changeUserOnRole = function(roleId,userId,userData,onSuccess,onError) {
    $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/'+roleId+"/Users/"+userId,userData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data);
        } else {
          onError(data);
        }
      });
  };

}]);
