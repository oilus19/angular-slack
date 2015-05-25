'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, $modal, $log, $resource) {

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

    $scope.options = {
      link             : true,      //convert links into anchor tags
      linkTarget       : '_self',   //_blank|_self|_parent|_top|framename
      pdf              : {
        embed: true                 //to show pdf viewer.
      },
      image            : {
        embed: true                //to allow showing image after the text gif|jpg|jpeg|tiff|png|svg|webp.
      },
      audio            : {
        embed: true                 //to allow embedding audio player if link to
      },
      basicVideo       : false,     //to allow embedding of mp4/ogg format videos
      gdevAuth         :'xxxxxxxx', // Google developer auth key for youtube data api
      video            : {
          embed           : false,    //to allow youtube/vimeo video embedding
          width           : null,     //width of embedded player
          height          : null,     //height of embedded player
          ytTheme         : 'dark',   //youtube player theme (light/dark)
          details         : false,    //to show video details (like title, description etc.)
      },
      tweetEmbed       : true,
      tweetOptions     : {
          //The maximum width of a rendered Tweet in whole pixels. Must be between 220 and 550 inclusive.
          maxWidth  : 550,
          //When set to true or 1 links in a Tweet are not expanded to photo, video, or link previews.
          hideMedia : false,
          //When set to true or 1 a collapsed version of the previous Tweet in a conversation thread
          //will not be displayed when the requested Tweet is in reply to another Tweet.
          hideThread: false,
          //Specifies whether the embedded Tweet should be floated left, right, or center in
          //the page relative to the parent element.Valid values are left, right, center, and none.
          //Defaults to none, meaning no alignment styles are specified for the Tweet.
          align     : 'none',
          //Request returned HTML and a rendered Tweet in the specified.
          //Supported Languages listed here (https://dev.twitter.com/web/overview/languages)
          lang      : 'en'
      },
      twitchtvEmbed    : true,
      dailymotionEmbed : true,
      tedEmbed         : true,
      dotsubEmbed      : true,
      liveleakEmbed    : true,
      soundCloudEmbed  : true,
      soundCloudOptions: {
          height      : 160, themeColor: 'f50000',   //Hex Code of the player theme color
          autoPlay    : false,
          hideRelated : false,
          showComments: true,
          showUser    : true,
          showReposts : false,
          visual      : false,         //Show/hide the big preview image
          download    : false          //Show/Hide download buttons
      },
      spotifyEmbed     : true,
      codepenEmbed     : true,        //set to true to embed codepen
      codepenHeight    : 300,
      jsfiddleEmbed    : true,        //set to true to embed jsfiddle
      jsfiddleHeight   : 300,
      jsbinEmbed       : true,        //set to true to embed jsbin
      jsbinHeight      : 300,
      plunkerEmbed     : true,        //set to true to embed plunker
      githubgistEmbed  : true,
      ideoneEmbed      : true,        //set to true to embed ideone
      ideoneHeight:300
    };

    if ($(window).width() < 768) {
      $rootScope.main.settings.rightbarShow = false;
    }

    $rootScope.icons = $resource('scripts/jsons/icons.json').query();

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
        slug: "web_development",
        subcategories: [{
          title: "Php Development",
          slug: "php_development"
        },{
          title: "HTML5 Development",
          slug: "html5_development"
        }]
    },{
        title: "Mobile Development",
        slug: "mobile_development",
        subcategories: [{
          title: "IPhone Development",
          slug: "iphone_development"
        },{
          title: "Android Development",
          slug: "android_development"
        }]
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
      firstname: "Wood",
      lastname: "Walton",
      avatar: "images/peter-avatar.jpg"
    },{
      id: "bntzio",
      firstname: "Mike",
      lastname: "Stuart",
      avatar: "images/arnold-avatar.jpg"
    },{
      id: "fullfathomv",
      firstname: "Robin",
      lastname: "Walls",
      avatar: "images/george-avatar.jpg"
    },{
      id: "ianc",
      firstname: "Peter",
      lastname: "Kay",
      avatar: "images/random-avatar1.jpg"
    },{
      id: "joe",
      firstname: "George",
      lastname: "McCain",
      avatar: "images/random-avatar2.jpg"
    },{
      id: "kellycatalley",
      firstname: "Lucius",
      lastname: "Cashmere",
      avatar: "images/random-avatar3.jpg"
    },{
      id: "samhealy",
      firstname: "Imrich",
      lastname: "Kamarel",
      avatar: "images/random-avatar4.jpg"
    }];

    $rootScope.posts = [{
      type: "q",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
      timeline: "2 hours ago",
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
        timeline: "1 hour ago",
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
      date: new Date(),
      time: new Date(),
      price: "free",
        timeline: "1 hour ago",
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
        timeline: "39 minutes ago",
        user: {
            firstname: 'Robin',
            lastname: 'Wills',
            avatar: 'images/random-avatar3.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Naviss credere!Orgia de :smile: germanus repressor, http://www.w3schools.com/html/mov_bbb.ogg gratia rumor!Nunquam pugna axona. http://media1.santabanta.com/full1/Hinduism/Lord%20Krishna/lor27h.jpg Cur orexis peregrinationes?Sunt abactores pugna gratis, germanus lamiaes.Cur lanista cantare?Est castus bromium, cesaris.Tabess velum, tanquam germanus musa.Cur lacta prarere? Assimilant aegre ducunt ad magnum advena.Emeritis, fidelis menss interdum examinare de varius, lotus detrius.",
        timeline: "30 minutes ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        }
    },{
      type: "@",
      to: 'John Douey',
      body: "Est fatalis habitio, cesaris.Sunt :) ususes manifestum audax, domesticus burguses.Ventuss prarere in tubinga!Sunt menses examinare alter, emeritis advenaes. https://ideone.com/n2GYdv Eheu, regius resistentia!Nunquam quaestio lactea.Ecce, placidus usus!",
        timeline: "29 minutes ago",
        user: {
            firstname: 'Imrich',
            lastname: 'Kamarel',
            avatar: 'images/random-avatar4.jpg'
        },
      replies: [{
        body: "These cases are perfectly simple and easy to distinguish.",
        timeline: "10 minutes ago",
        user: {
            firstname: 'Robin',
            lastname: 'Wills',
            avatar: 'images/random-avatar3.jpg'
        }
      }]
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

    $scope.ajaxFaker = function(){
      $scope.data=[];
      var url = 'http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=5&callback=JSON_CALLBACK';

      $http.jsonp(url).success(function(data){
        $scope.data=data;
        console.log('cecky');
        angular.element('.tile.refreshing').removeClass('refreshing');
      });
    };
  })

  .controller('CreateGroupModalInstanceCtrl', function ($scope, $modalInstance, $modal, $log, items) {
    
    $scope.groupStatus = items.groupStatus;
    $scope.groupCategories = items.groupCategories;
    $scope.icon = "fa-users";
    $scope.selected = {};
    $scope.modalInstance = $modalInstance;

    $scope.create = function () {
      $modalInstance.close({title: $scope.title, category: $scope.selected.category.title, subcategory: $scope.selected.subcategory.title, status: $scope.selected.status.title, icon: $scope.icon, about: $scope.about});
    };

    $scope.selectIcon = function() {

      var modalInstance = $modal.open({
        templateUrl: 'selectIconModalContent.html',
        controller: 'SelectIconModalInstanceCtrl',
        size: "lg",
        resolve: {
          items: function () {
            return {title: "Choose an icon for your group"};
          }
        }
      });

      modalInstance.result.then(function (result) {
        $scope.icon = result.icon;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $scope.$watch(function(scope){return scope.selected.category},
      function(){
        $scope.selected.subcategory = '';
      });

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

  .controller('SelectIconModalInstanceCtrl', function ($scope, $modalInstance, items) {
    
    $scope.modalInstance = $modalInstance;
    $scope.title = items.title;
    
    $scope.getIconName = function (icon) {
      return icon.substr(3);
    }

    $scope.select = function (icon) {
      $modalInstance.close({icon: icon});
    }

  });

  

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}
