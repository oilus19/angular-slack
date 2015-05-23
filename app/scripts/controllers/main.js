'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, $modal, $log) {

    $rootScope.main = {
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

    if ($(window).width() < 768) {
      $rootScope.main.settings.rightbarShow = false;
    }

    $rootScope.joinedGroup = [{
      title: "Android Developers",
      initial: "A"
    },{
      title: "Mongo Developers",
      initial: "M"
    },{
      title: "Python Developers",
      initial: "P"
    }];

    $rootScope.groupStatus = [{
        title: "Public",
        slug: "public"
    },{
        title: "Private",
        slug: "private"
    }];

    $rootScope.groupCategories = [{
        title: "Web Development",
        slug: "web_development"
    },{
        title: "Mobile Development",
        slug: "mobile_development"
    }];

    $rootScope.groups = [];

    for(var i=1; i<=12; i++){
        $rootScope.groups.push({
            title: "Python Developers"+i.toString(),
            slug: "python_developers"+i.toString(),
            category: "Web Development",
            initial: i.toString(),
            status: "Public",
            description: "",
            icon: "fa-users",
            membercount: 2012,
            channelcount: 12
        });
    }

    $rootScope.channels = [{
      title: "General",
      initial: "G",
      icon: "fa-adjust"
    },{
      title: "Nightlife",
      initial: "N",
      icon: "fa-anchor"
    },{
      title: "Grocery Shopping",
      initial: "G",
      icon: "fa-asterisk"
    },{
      title: "Shopping",
      initial: "S",
      icon: "fa-dollar"
    },{
      title: "JustGirls",
      initial: "J",
      icon: "fa-coffee"
    },{
      title: "JustGuys",
      initial: "J",
      icon: "fa-car"
    },{
      title: "Restaurants",
      initial: "R",
      icon: "fa-eye"
    },{
      title: "Deals",
      initial: "D",
      icon: "fa-glass"
    }];

    $rootScope.users = [{
      id: "benjamin",
      name: "Wood Walton"
    },{
      id: "bntzio",
      name: "Mike Stuart"
    },{
      id: "fullfathomv",
      name: "Robin Walls"
    },{
      id: "ianc",
      name: "Peter Kay"
    },{
      id: "joe",
      name: "George McCain"
    },{
      id: "kellycatalley",
      name: "Lucius Cashmere"
    },{
      id: "samhealy",
      name: "Imrich Kamarel"
    }];

    $rootScope.posts = [{
      type: "q",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      timeline: "Just Now",
      pinned: true,
      user: {
        firstname: 'Wood',
        lastname: 'Walton',
        avatar: 'images/random-avatar1.jpg'
      },
      answers: [{
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        user: {
          firstname: 'John',
          lastname: 'Douey',
          avatar: 'images/profile-photo.jpg'
        }
      },{
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        user: {
          firstname: 'John',
          lastname: 'Douey',
          avatar: 'images/profile-photo.jpg'
        }
      }]
    },{
      type: "p",
      body: "Which is the best responsive freamework to start web designing?",
      options: [{
        title: 'Bootstrap Framework',
        votes: 10
      },{
        title: 'Foundation',
        votes: 5
      },{
        title: 'Kune',
        votes: 3
      }],
        timeline: "39 minutes ago",
        user: {
            firstname: 'Mike',
            lastname: 'Stuart',
            avatar: 'images/random-avatar2.jpg'
        }
    },{
      type: "e",
      body: "Meetup next friday at 19:00",
      info: "Good news, everyone!<br/>Office hours has a new home at http://learn.nycphyhon.org/.<br/>We'll stop posting events to the main NYC phython page after next month.<br/>To RSVP for this event, please go here: http://getnear.co/k23124.",
      location: "34 W. 3rd Ave. 4th floor",
      date: "Friday 12 of May",
      time: "19:00",
      price: "free",
        timeline: "2 hours ago",
        user: {
            firstname: 'Robin',
            lastname: 'Wills',
            avatar: 'images/random-avatar3.jpg'
        }
    },{
      type: "s",
      body: "Black Mini Dress",
      photo: "http://arasar.hanathemes.com/wp-content/uploads/2013/12/982-400x560.jpg",
      price: "$99",
        timeline: "2 hours ago",
        user: {
            firstname: 'Robin',
            lastname: 'Wills',
            avatar: 'images/random-avatar3.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        timeline: "2 hours ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        timeline: "2 hours ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        timeline: "2 hours ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    }];

    $rootScope.messages = [{
      type: "in",
      body: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.",
      timeline: "2 hours ago",
      user: {
        firstname: 'Wood',
        lastname: 'Walton',
        avatar: 'images/random-avatar4.jpg'
      }
    },{
      type: "out",
      body: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.",
      timeline: "1 hour ago"
    },{
      type: "in",
      body: "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      timeline: "53 minutes ago",
      user: {
        firstname: 'Wood',
        lastname: 'Walton',
        avatar: 'images/random-avatar4.jpg'
      }
    },{
      type: "out",
      body: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.",
      timeline: "40 minutes ago"
    },{
      type: "in",
      body: "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      timeline: "20 minutes ago",
      user: {
        firstname: 'Wood',
        lastname: 'Walton',
        avatar: 'images/random-avatar4.jpg'
      }
    },{
      type: "out",
      body: "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.",
      timeline: "10 minutes ago"
    }];

    $rootScope.suggestions = ['@John Douey: '];
    $rootScope.questionsScope = {};
    $rootScope.pollsScope = {};
    $rootScope.eventsScope = {};
    $rootScope.mentionsScope = {};
    $rootScope.salesScope = {};
    $scope.Math = window.Math;

    $rootScope.getGroup = function(title){
      for(var i=0; i<$rootScope.joinedGroup.length; i++){
        if($rootScope.joinedGroup[i].title==title){
          return $rootScope.joinedGroup[i];
        }
      }
    }

    $rootScope.getChannel = function(title){
      for(var i=0; i<$rootScope.channels.length; i++){
        if($rootScope.channels[i].title==title){
          return $rootScope.channels[i];
        }
      }
    }

    $rootScope.getUser = function(id){
      for(var i=0; i<$rootScope.users.length; i++){
        if($rootScope.users[i].id==id){
          return $rootScope.users[i];
        }
      }
    }

    $rootScope.newGroup = function(){

      var modalInstance = $modal.open({
        templateUrl: 'createGroupModalContent.html',
        controller: 'CreateGroupModalInstanceCtrl',
        resolve: {
          items: function () {
            return {groupStatus: $rootScope.groupStatus, groupCategories: $rootScope.groupCategories};
          }
        }
      });

      modalInstance.result.then(function (result) {

        var group = {
            title: result.title,
            category: result.category,
            initial: result.title.charAt(0).toUpperCase(),
            status: result.status,
            description: result.about,
            icon: result.icon,
            membercount: 0,
            channelcount: 0
        };

        $rootScope.groups.push(group);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }


    /* Channel */

    $rootScope.submitChannel = function(title){
        var channel = {
            title: title,
            initial: title.charAt(0).toUpperCase(),
            icon: "fa-adjust"
        }
        $rootScope.channels.push(channel);
    }

    $scope.selectChannelIcon = function(channel) {

      var modalInstance = $modal.open({
        templateUrl: 'selectIconModalContent.html',
        controller: 'selectIconModalInstanceCtrl',
        size: "lg"
      });

      modalInstance.result.then(function (result) {

        channel.icon = result.icon;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
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
  })

  .controller('CreateGroupModalInstanceCtrl', function ($scope, $modalInstance, $modal, $log, items) {
    
    $scope.groupStatus = items.groupStatus;
    $scope.groupCategories = items.groupCategories;
    $scope.icon = "fa-users";
    $scope.selected = {};

    $scope.create = function () {
      $modalInstance.close({title: $scope.title, category: $scope.selected.category.title, status: $scope.selected.status.title, icon: $scope.icon, about: $scope.about});
    };

    $scope.selectIcon = function() {

      var modalInstance = $modal.open({
        templateUrl: 'selectIconModalContent.html',
        controller: 'selectIconModalInstanceCtrl',
        size: "lg"
      });

      modalInstance.result.then(function (result) {

        $scope.icon = result.icon;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('selectIconModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.icons = [
      "fa-adjust", "fa-anchor", "fa-archive", "fa-arrows", "fa-arrows-h", "fa-arrows-v",
      "fa-asterisk", "fa-automobile", "fa-ban", "fa-bank", "fa-bar-chart-o", "fa-barcode",
      "fa-bars", "fa-beer", "fa-bell", "fa-bell-o", "fa-bolt", "fa-bomb",
      "fa-book", "fa-bookmark", "fa-bookmark-o", "fa-briefcase", "fa-bug", "fa-building",
    ];

    $scope.select = function (icon) {
      $modalInstance.close({icon: icon});
    }

  });;

  

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}
