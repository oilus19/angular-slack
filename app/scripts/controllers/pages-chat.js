'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:PagesChatCtrl
 * @description
 * # PagesChatCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('ChatCtrl', function ($rootScope, $scope, $resource, $stateParams) {
	 $rootScope.currentGroup = $rootScope.getGroup($stateParams.group);
    $rootScope.chatWith = $rootScope.getUser($stateParams.user);

    $scope.firstPostsLoad = true;

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
      if($scope.firstPostsLoad){
        $scope.firstPostsLoad=false;
        scrollTop();
      }
    })

  })

  .controller('SendMessageCtrl', function ($rootScope, $scope, $timeout) {

    $scope.post = false;
    $scope.image = '';
    $scope.imageAttached = false;

    $scope.sendMessage = function(){
        var body = $scope.messageinput;
        if($scope.imageAttached)
            body += "<br/>" + $scope.image;

        var message = {
            type: 'out',
            body: body,
            timeline: 'Just now'
        }
        $rootScope.messages.push(message);
        $scope.reset();
        scrollTop();
    }

    $scope.reset = function(){
      $scope.messageinput = '';
      $scope.image = '';
      $scope.imageAttached = false;
    }

    $scope.addImage = function() {
      var options = {
        success: function(files) {
          var image = files[0].link;
          $scope.image = image;
          $scope.imageAttached = true;
          $scope.$apply();
        },
        linkType: "direct", // or "direct"
        multiselect: false, // or true
        extensions: ['images'],
      };
      Dropbox.choose(options);
    }

    $scope.$watch(function(scope){return scope.post},
        function(newValue, oldValue){
            $timeout(positionSendMessageBox, 100);
        });

  });

