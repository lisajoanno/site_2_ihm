'use strict'

// Pour appeler ce service : Users.get(......)


angular.module('pooIhmApp').service('Users',['$http',function Users($http) {

  // GET ALL, sans paramètres donc
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

  // GET d'un id
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

  // DELETE d'un id
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

  // PUT d'un id
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

  // POST d'un id
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
