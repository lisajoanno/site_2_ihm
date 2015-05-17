'use strict'

angular.module('pooIhmApp').service('Projects',['$http',function Projects($http) {

  // GET ALL, sans paramètres donc
  this.getAll = function(onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data);
        }
      });
  };

  // GET d'un id
  this.get = function(projectId,onSuccess,onError) {
    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };

  // DELETE d'un id
  this.delete = function(projectId,onSuccess,onError) {
    $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };

  // PUT d'un id
  this.put = function(projectId,updateData,onSuccess,onError) {
    $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId,updateData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data,projectId); // on a besoin de l'id du projet pour remettre à jour le currentProject
        } else {
          onError(data.data);
        }
      });
  };

  // POST d'un id
  this.post = function(addData,onSuccess,onError) {
    $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/',addData)
      .success(function(data) {
        if (data.status == "success") {
          onSuccess(data.data);
        } else {
          onError(data.data);
        }
      });
  };






}]);
