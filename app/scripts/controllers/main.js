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

    $scope.joinedGroup = [{
      title: "Android Developers",
      initial: "A"
    },{
      title: "Mongo Developers",
      initial: "M"
    },{
      title: "Python Developers",
      initial: "P"
    }];

    $scope.channels = [{
      title: "General",
      initial: "G"
    },{
      title: "Nightlife",
      initial: "N"
    },{
      title: "Grocery Shopping",
      initial: "G"
    },{
      title: "Shopping",
      initial: "S"
    },{
      title: "JustGirls",
      initial: "J"
    },{
      title: "JustGuys",
      initial: "J"
    },{
      title: "Restaurants",
      initial: "R"
    },{
      title: "Deals",
      initial: "D"
    }];

    $scope.users = [{
      id: "benjamin"
    },{
      id: "bntzio"
    },{
      id: "fullfathomv"
    },{
      id: "ianc"
    },{
      id: "joe"
    },{
      id: "kellycatalley"
    },{
      id: "samhealy"
    }]

    $scope.currentChannel = $scope.channels[0];

    $scope.getGroup = function(title){
      for(var i=0; i<$scope.joinedGroup.length; i++){
        if($scope.joinedGroup[i].title==title){
          return $scope.joinedGroup[i];
        }
      }
    }

    $scope.getChannel = function(title){
      for(var i=0; i<$scope.channels.length; i++){
        if($scope.channels[i].title==title){
          return $scope.channels[i];
        }
      }
    }

    $scope.ajaxFaker = function(){
      $scope.data=[];
      var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=5&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data){
        $scope.data=data;
        console.log('cecky');
        angular.element('.tile.refreshing').removeClass('refreshing');
      });
    };

    $scope.resize = function(){
      resize();
    }
  });


function resize(){
  var width = ($(window).width()-$('#sidebar').width())*0.4;
  $("#rightbar").width(width);
  $("#content").css('right',width.toString()+"px");
}

$(window).resize(function(){
  resize();
});