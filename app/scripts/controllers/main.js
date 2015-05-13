'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.main = {
      title: 'getnear',
      settings: {
        navbarHeaderColor: 'scheme-default',
        sidebarColor: 'scheme-default',
        brandingColor: 'scheme-default',
        activeColor: 'default-scheme-color',
        headerFixed: true,
        asideFixed: true,
        rightbarShow: true
      }
    };

    $scope.ajaxFaker = function(){
      $scope.data=[];
      var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=5&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data){
        $scope.data=data;
        console.log('cecky');
        angular.element('.tile.refreshing').removeClass('refreshing');
      });
    };
  });