'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
    .controller('ChannelCtrl', function ($rootScope, $scope, $timeout, $stateParams, $modal, $log) {

    $rootScope.currentGroup = $rootScope.getGroup($stateParams.group);
    $rootScope.currentChannel = $rootScope.getChannel($stateParams.channel);
    $rootScope.chatWith = {};

    $rootScope.getPostBody = function(post){
        return post.body;
    }

    $("#new_post_input").keypress(function(e) {
      var key = e.which;
      if(key==13){
        $rootScope.submitPost();
      }
    });

    $rootScope.submitPost = function(){
        function getPostType(post){
            if(post.indexOf('q:') === 0) return 'q';
            if(post.indexOf('@') === 0) return '@';
            if(post.indexOf('e:') === 0) return 'e';
            if(post.indexOf('p:') === 0) return 'p';
            if(post.indexOf('s:') === 0) return 's';
        }

        function getPostBody(post){
            return post.substr(post.indexOf(':')+1).trim();
        }

        function getPostAuthor(post){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        function getPostTo(post){
            return post.substr(1,post.indexOf(':')-1).trim();
        }

        function reset(){
            $("#new_post_input").val('');
        }
        
        var post_input = $("#new_post_input").val().trim();
        var postType = getPostType(post_input);
        var postBody = postType?getPostBody(post_input):post_input;
        var postAuthor = getPostAuthor(post_input);
        var post = {
            type: postType,
            body: postBody,
            user: postAuthor,
            timeline: "Just Now"
        }

        switch(postType){
            case 'q':
                $rootScope.posts.push(post);
                break;
            case '@':
                post.to = getPostTo(post_input);
                $rootScope.posts.push(post);
                break;
            case 'e':
                $rootScope.newEvent();
                break;
            case 'p':
                $rootScope.newPoll();
                break;
            case 's':
                $rootScope.newSale();
                break;
            default:
                $rootScope.posts.push(post);
        }

        reset();
    }

    /*  Mentions     */

    $rootScope.showMention = function(mention){
        $rootScope.mention = mention;
        $rootScope.mentionsScope.mentionShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#mentions a")).triggerHandler("click");
        },0);
    }

    $rootScope.hideMention = function(mention){
        $rootScope.mentionsScope.mentionShowed = false;
    }

    /*  Question and Answer     */

    $rootScope.newQuestion = function(){
        $scope.newPost = 'q: ';
        jQuery('#new_post_input').focus();
    }

    $rootScope.showQuestion = function(question){
        $rootScope.question = question;
        $rootScope.questionsScope.questionShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#questions a")).triggerHandler("click");
        },0);
    }

    $rootScope.hideQuestion = function(question){
        $rootScope.questionsScope.questionShowed = false;
    }

    $rootScope.replyQuestion = function(question){
        $rootScope.showQuestion(question);
        $timeout(function(){
            var $target = $('#new_answer_input');
            $target.focus();
            $("#sidebar").animate({scrollTop: $target.offset().top}, "slow");
        },100);
    }

    $rootScope.submitAnswer = function(){
        function getPostBody(post){
            return jQuery('#new_answer_input').val().trim();
        }

        function getPostAuthor(){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        function reset(){
            jQuery('#new_answer_input').val('');
        }
        
        var postBody = getPostBody();
        var postAuthor = getPostAuthor();
        var answer = {
            body: postBody,
            user: postAuthor
        }

        if($rootScope.question.answers==undefined) $rootScope.question.answers = [];
        $rootScope.question.answers.push(answer);
        reset();
    }

    /*  Poll     */




    $rootScope.newPoll = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createPollModalContent.html',
        controller: 'CreatePollModalInstanceCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (result) {

        function getPostAuthor(){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        var poll = {
          type: "p",
          body: result.question,
          options: result.options,
          timeline: "Just now",
          user: getPostAuthor()
        }
        $rootScope.posts.push(poll);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showPoll = function(poll){
        $rootScope.poll = poll;
        $rootScope.pollsScope.pollTotalVotes = 0;
        $rootScope.pollsScope.selectedPollOption = null;
        $rootScope.pollsScope.pollShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#polls a")).triggerHandler("click");
        },0);
        angular.forEach(poll.options, function(option){
            if(option.votes == undefined) return;
            $rootScope.pollsScope.pollTotalVotes += option.votes;
        })
    }

    $rootScope.hidePoll = function(poll){
        $rootScope.pollsScope.pollShowed = false;
    }

    $rootScope.submitVote = function(poll){
        if($rootScope.pollsScope.selectedPollOption==undefined) return;
        poll.options[$rootScope.pollsScope.selectedPollOption].votes ++;
        $rootScope.pollsScope.pollTotalVotes ++;
        $rootScope.pollsScope.selectedPollOption = null;
    }

    /*  Events     */

    $rootScope.newEvent = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createEventModalContent.html',
        controller: 'CreateEventModalInstanceCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (result) {

        function getPostAuthor(){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        var event = {
          type: "e",
          body: result.title,
          info: nl2br(result.info),
          location: result.location,
          date: result.date,
          time: result.time,
          price: result.price,
          timeline: "Just now",
          user: getPostAuthor()
        }
        $rootScope.posts.push(event);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showEvent = function(event){
        $rootScope.event = event;
        $rootScope.eventsScope.eventShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#events a")).triggerHandler("click");
        },0);
    }

    $rootScope.hideEvent = function(event){
        $rootScope.eventsScope.eventShowed = false;
    }

    /*  Pinned Items     */

    $rootScope.showPinnedItem = function(pinnedItem){
        switch(pinnedItem.type){
            case '@':
                $rootScope.showMention(pinnedItem);
                break;
            case 'e':
                $rootScope.showEvent(pinnedItem);
                break;
            case 'p':
                $rootScope.showPoll(pinnedItem);
                break;
            case 'q':
                $rootScope.showQuestion(pinnedItem);
                break;
            case 's':
                $rootScope.showSale(pinnedItem);
                break;
        }
    }

    $rootScope.setPinned = function(pinnedItem){
        pinnedItem.pinned = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#pinned_items a")).triggerHandler("click");
        },0);
    }

    $rootScope.unsetPinned = function(pinnedItem){
        delete pinnedItem.pinned;
    }

    /*  Sales     */




    $rootScope.newSale = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createSaleModalContent.html',
        controller: 'CreateSaleModalInstanceCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function (result) {

        function getPostAuthor(){
            var author = {
                firstname: 'John',
                lastname: 'Douey',
                avatar: 'images/profile-photo.jpg'
            }
            return author;
        }

        var sale = {
          type: "s",
          body: result.title,
          photo: result.photo,
          price: result.price,
          timeline: "Just now",
          user: getPostAuthor()
        }
        $rootScope.posts.push(sale);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showSale = function(sale){
        $rootScope.sale = sale;
        $rootScope.salesScope.saleShowed = true;
        $timeout(function(){
            angular.element($("#rightbar .nav-tabs li#sales a")).triggerHandler("click");
        },0);
    }

    $rootScope.hideSale = function(poll){
        $rootScope.salesScope.saleShowed = false;
    }

  });


angular.module('getnearApp')
  .directive('autoComplete', function ($timeout) {
    return function(scope, iElement, iAttrs){
        var $input = $("#new_post_input");
        $input.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function(){
                $timeout(function(){
                    iElement.trigger('input');
                },0)
            }
        });
    };
});


angular.module('getnearApp')
  .controller('CreatePollModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.question = "";
    $scope.options = [{
        title: "",
        votes: 0
    },{
        title: "",
        votes: 0
    }];

    $scope.create = function () {
      $modalInstance.close({question: $scope.question, options: $scope.options});
    };

    $scope.addQuestion = function() {
        $scope.options.push({title: "", votes: 0});
    }
  })

  .controller('CreateEventModalInstanceCtrl', function ($scope, $modalInstance) {
    
    $scope.price = "$ ";
    $scope.free = true;
    $scope.dt = new Date();
    $scope.mytime = new Date();

    $scope.create = function () {
      var date = $scope.dt.toLocaleDateString();
      var time = $scope.mytime.toLocaleTimeString();
      $modalInstance.close({title: $scope.title, info: $scope.info, location: $scope.location, date: date, time: time, price: (($scope.free==true)?'free':$scope.price)});
    };
  })

  .controller('CreateSaleModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType='circle';
    $scope.price = "$ ";

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.init = function() {
        angular.element(document.querySelector('#salePhotoInput')).on('change',handleFileSelect);
    }

    $scope.create = function () {
      $modalInstance.close({title: $scope.title, price: $scope.price, photo: $scope.myCroppedImage});
    };
  })

  .controller('DatepickerCtrl', function ($scope) {

    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      'class': 'datepicker'
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  })
  .controller('TimepickerCtrl', function ($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  })
  .controller('ImageCropCtrl', function ($scope) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType='circle';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  });