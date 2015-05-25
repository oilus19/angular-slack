'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the getnearApp
 */

angular.module('getnearApp')
  .controller('NavCtrl', function ($rootScope, $scope, $modal, $log) {
    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: true,
      isThirdOpen: true
    };

    $scope.editChannel = function(channel) {

      var modalInstance = $modal.open({
        templateUrl: 'editChannelModalContent.html',
        controller: 'editChannelModalInstanceCtrl',
        resolve: {
          items: function () {
            return {channel: channel};
          }
        }
      });
    }

    $scope.selectChannelIcon = function(channel) {

      var modalInstance = $modal.open({
        templateUrl: 'selectIconModalContent.html',
        controller: 'SelectIconModalInstanceCtrl',
        size: "lg"
      });

      modalInstance.result.then(function (result) {

        channel.icon = result.icon;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.openDirectMessageModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'selectDirectMessageModalContent.html',
        controller: 'SelectDirectMessageModalInstanceCtrl',
        size: "sm"
      });

      modalInstance.result.then(function (result) {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
  })

  .controller('editChannelModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, $modal, $log, items) {
    
    $scope.modalInstance = $modalInstance;
    $scope.icon = items.channel.icon;
    $scope.title = items.channel.title;

    $scope.update = function () {
      items.channel.icon = $scope.icon;
      items.channel.title = $scope.title;
      $modalInstance.close();
    };

    $scope.selectIcon = function() {

      var modalInstance = $modal.open({
        templateUrl: 'selectIconModalContent.html',
        controller: 'SelectIconModalInstanceCtrl',
        size: "lg",
        resolve: {
          items: function () {
            return {title: "Choose an icon for your channel"};
          }
        }
      });

      modalInstance.result.then(function (result) {
        $scope.icon = result.icon;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.delete = function () {
      $rootScope.channels = $rootScope.channels.filter(function(el){
        return el.title !== items.channel.title;
      });
      $modalInstance.close();
    };
  })


  .controller('SuggestChannelCtrl', function($scope, $rootScope, $log){
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

    $scope.submitChannel = function(title){
        var channel = {
            title: title,
            initial: title.charAt(0).toUpperCase(),
            icon: "fa-adjust"
        }
        $rootScope.channels.push(channel);
    }

    $scope.submit = function($event) {
      $scope.toggleDropdown($event);
      $scope.submitChannel($scope.newChannel);
      $scope.newChannel = "";
    };
  })

  .controller('SelectDirectMessageModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, $state) {
    
    $scope.modalInstance = $modalInstance;

    $scope.chatWith = function(user) {
      $state.go("app.group.chat",{group: $rootScope.currentGroup.title, user: user.id});
      $modalInstance.close();
    }
  });