'use strict'

/**
 * Service pour ajouter/récupérer/supprimer/mettre à jour des roles.
 */
angular.module('pooIhmApp').service('Roles',['$http',function Roles($http) {

  /**
   * GET all roles
   * @param onSuccess
   * @param onError
   */
  this.getAll = function(onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles')
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data);
        }
      });
  };

  /**
   * GET d'un role en particulier
   * @param roleId
   * @param onSuccess
   * @param onError
   */
  this.get = function(roleId,onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + roleId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };

  /**
   * DELETE d'un role
   * @param roleId
   * @param onSuccess
   * @param onError
   */
  this.delete = function(roleId,onSuccess,onError) {
    $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + roleId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };

  /**
   * PUT modification d'un role
   * @param roleId
   * @param updateData
   * @param onSuccess
   * @param onError
   */
  this.put = function(roleId,updateData,onSuccess,onError) {
    $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + roleId,updateData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data,roleId);
        } else {
          onError(data.data);
        }
      });
  };

  /**
   * POST ajout d'un role
   * @param addData
   * @param onSuccess
   * @param onError
   */
  this.post = function(addData,onSuccess,onError) {
    $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/',addData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };
}]);
