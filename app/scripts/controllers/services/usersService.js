'use strict'

/**
 * Service pour ajouter/récupérer/supprimer/mettre à jour des utilisateurs.
 */
angular.module('pooIhmApp').service('Users',['$http',function Users($http) {

  /**
   * GET ALL, sans paramètres donc, récupère tous les utilisateurs.
   * @param onSuccess
   * @param onError
   */
  this.getAll = function(onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data);
        }
      });
  };

  /**
   * GET d'un id, d'un utilisateur précis.
   * @param userId
   * @param onSuccess
   * @param onError
   */
  this.get = function(userId,onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };

  /**
   * DELETE d'un user précis.
   * @param userId
   * @param onSuccess
   * @param onError
   */
  this.delete = function(userId,onSuccess,onError) {
    $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };

  /**
   * PUT, modification d'un utilisateur.
   * @param userId
   * @param updateData
   * @param onSuccess
   * @param onError
   */
  this.put = function(userId,updateData,onSuccess,onError) {
    $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId,updateData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data,userId); // on a besoin de l'id du user pour remettre à jour le currentUser
        } else {
          onError(data.data);
        }
      });
  };

  /**
   * POST, ajout d'un nouvel utilisateur.
   * @param addData
   * @param onSuccess
   * @param onError
   */
  this.post = function(addData,onSuccess,onError) {
    $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/',addData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };




}]);
