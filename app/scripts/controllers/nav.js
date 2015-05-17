'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the getnearApp
 */

angular.module('getnearApp')
  .controller('NavCtrl', function ($rootScope, $scope) {
    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: true,
      isThirdOpen: true
    };      

    resize();

  })
  .controller('SuggestChannelCtrl', function($scope, $log){
    $scope.status = {
      isopen: false
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.navtoggle = function(open){
      if(open) 
        $("#sidebar").addClass('dropdown-open');
      else
        $("#sidebar").removeClass('dropdown-open');
    };

    $scope.submit = function($event) {
      $scope.toggleDropdown($event);
      $scope.submitChannel($scope.newChannel);
      $scope.newChannel = "";
    };
  });