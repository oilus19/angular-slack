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

    $rootScope.editPost = function(post){
      switch(post.type){
        case "q":
          $rootScope.editQuestion(post);
          break;
        case "e":
          $rootScope.editEvent(post);
          break;
        case "p":
          $rootScope.editPoll(post);
          break;
        case "s":
          $rootScope.editSale(post);
          break;
        case "@":
          $rootScope.editMention(post);
          break;
      }
    }

    /*  Mentions     */

    $rootScope.showMention = function(mention){
        $rootScope.mention = mention;
        $rootScope.mentionsScope.mentionShowed = true;
        $timeout(function(){
          angular.element($("#rightbar .nav-tabs li#mentions a")).triggerHandler("click");
          $rootScope.main.settings.rightbarShow = true;
        },0);
    }

    $rootScope.editMention = function(mention){
      var modalInstance = $modal.open({
        templateUrl: 'editMentionModalContent.html',
        controller: 'EditMentionModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {body: mention.body};
          }
        }
      });

      modalInstance.result.then(function (result) {
        mention.body = result.body;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.hideMention = function(mention){
        $rootScope.mentionsScope.mentionShowed = false;
    }

    /*  Question and Answer     */

    $rootScope.newQuestion = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createQuestionModalContent.html',
        controller: 'CreateQuestionModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {};
          }
        }
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

        var question = {
          type: "q",
          body: result.question,
          timeline: "Just now",
          user: getPostAuthor()
        }
        $rootScope.posts.push(question);
        scrollTop();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.editQuestion = function(question){
      var modalInstance = $modal.open({
        templateUrl: 'createQuestionModalContent.html',
        controller: 'CreateQuestionModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {question: question.body, edit: true};
          }
        }
      });

      modalInstance.result.then(function (result) {
        question.body = result.question;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showQuestion = function(question){
        $rootScope.question = question;
        $rootScope.questionsScope.questionShowed = true;
        $timeout(function(){
          angular.element($("#rightbar .nav-tabs li#questions a")).triggerHandler("click");
          $rootScope.main.settings.rightbarShow = true;
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



    /*  Poll     */




    $rootScope.newPoll = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createPollModalContent.html',
        controller: 'CreatePollModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {};
          }
        }
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
        scrollTop();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.editPoll = function(poll){
      var modalInstance = $modal.open({
        templateUrl: 'createPollModalContent.html',
        controller: 'CreatePollModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {question: poll.body, options: angular.copy(poll.options), edit: true};
          }
        }
      });

      modalInstance.result.then(function (result) {
        poll.body = result.question;
        poll.options = result.options;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showPoll = function(poll){
        $rootScope.poll = poll;
        $rootScope.pollsScope.pollTotalVotes = 0;
        $rootScope.pollsScope.selectedPollOption = null;
        $rootScope.pollsScope.pollShowed = true;
        $rootScope.pollsScope.answerPoll = false;
        $rootScope.pollsScope.answeredPoll = false;
        $timeout(function(){
          angular.element($("#rightbar .nav-tabs li#polls a")).triggerHandler("click");
          $rootScope.main.settings.rightbarShow = true;
        },0);
        angular.forEach(poll.options, function(option){
            if(option.votes == undefined) return;
            $rootScope.pollsScope.pollTotalVotes += option.votes;
        })
    }

    $rootScope.answerPoll = function(poll){
        $rootScope.showPoll(poll);
        $rootScope.pollsScope.answerPoll = true;
        $rootScope.pollsScope.answeredPoll = false;
    }

    $rootScope.hidePoll = function(poll){
        $rootScope.pollsScope.pollShowed = false;
    }

    $rootScope.submitVote = function(poll){
        if($rootScope.pollsScope.selectedPollOption==undefined) return;
        poll.options[$rootScope.pollsScope.selectedPollOption].votes ++;
        $rootScope.pollsScope.pollTotalVotes ++;
        $rootScope.pollsScope.selectedPollOption = null;
        $rootScope.pollsScope.answeredPoll = true;
    }

    /*  Events     */

    $rootScope.newEvent = function(){
      var modalInstance = $modal.open({
        templateUrl: 'createEventModalContent.html',
        controller: 'CreateEventModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {};
          }
        }
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
        scrollTop();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.editEvent = function(event){
      var modalInstance = $modal.open({
        templateUrl: 'createEventModalContent.html',
        controller: 'CreateEventModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {title: event.body, info: event.info, location: event.location, date: event.date, time: event.time, price: event.price, edit: true};
          }
        }
      });

      modalInstance.result.then(function (result) {
        event.body = result.title;
        event.info = nl2br(result.info);
        event.location = result.location;
        event.date = result.date;
        event.time = result.time;
        event.price = result.price;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showEvent = function(event){
        $rootScope.event = event;
        $rootScope.eventsScope.eventShowed = true;
        $timeout(function(){
          angular.element($("#rightbar .nav-tabs li#events a")).triggerHandler("click");
          $rootScope.main.settings.rightbarShow = true;
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

        var index = jQuery.inArray(pinnedItem, $rootScope.posts)+1;

        var container = $(window),
          scrollTo = $("#post-"+index),
          scrollTop = scrollTo.offset().top - 120;
        container.scrollTop(scrollTop);
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
        size: 'lg',
        resolve: {
          items: function () {
            return {};
          }
        }
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
        scrollTop();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.editSale = function(sale){
      var modalInstance = $modal.open({
        templateUrl: 'createSaleModalContent.html',
        controller: 'CreateSaleModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return {title: sale.body, photo: sale.photo, price: sale.price, edit: true};
          }
        }
      });

      modalInstance.result.then(function (result) {
        sale.body = result.title;
        sale.photo = result.photo;
        sale.price = result.price;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    $rootScope.showSale = function(sale){
        $rootScope.sale = sale;
        $rootScope.salesScope.saleShowed = true;
        $timeout(function(){
          angular.element($("#rightbar .nav-tabs li#sales a")).triggerHandler("click");
          $rootScope.main.settings.rightbarShow = true;
        },0);
    }

    $rootScope.hideSale = function(poll){
        $rootScope.salesScope.saleShowed = false;
    }


    $scope.firstPostsLoad = true;

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
      if($scope.firstPostsLoad){
        $scope.firstPostsLoad=false;
        scrollTop();
      }
    })

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
  })
  .directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if(scope.$last===true){
          $timeout(function(){
            scope.$emit('ngRepeatFinished');
          })
        }
      }
    }
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    }
  });


angular.module('getnearApp')

  .controller('EditMentionModalInstanceCtrl', function ($scope, $modalInstance, items) {
    
    $scope.modalInstance = $modalInstance;
    $scope.body = items.body;

    $scope.create = function () {
      $modalInstance.close({body: $scope.body});
    };
  })

  .controller('CreateQuestionModalInstanceCtrl', function ($scope, $modalInstance, items) {
    
    $scope.modalInstance = $modalInstance;
    $scope.question = items.question;
    $scope.edit = items.edit;

    $scope.create = function () {
      $modalInstance.close({question: $scope.question});
    };
  })

  .controller('CreatePollModalInstanceCtrl', function ($scope, $modalInstance, items) {
    
    $scope.modalInstance = $modalInstance;
    $scope.question = items.question;
    $scope.options = [{
        title: "",
        votes: 0
    },{
        title: "",
        votes: 0
    }];
    if(items.edit==true) $scope.options = items.options;
    $scope.edit = items.edit;

    $scope.create = function () {
      $modalInstance.close({question: $scope.question, options: $scope.options});
    };

    $scope.addQuestion = function() {
        $scope.options.push({title: "", votes: 0});
    }
  })

  .controller('CreateEventModalInstanceCtrl', function ($scope, $modalInstance, items) {
    
    $scope.modalInstance = $modalInstance;
    $scope.edit = items.edit;
    $scope.title = items.title;
    $scope.info = items.info;
    $scope.location = items.location;
    $scope.price = (items.price=="free" || items.edit!=true)?"$ ":items.price;
    $scope.free = (items.price=="free" || items.edit!=true);
    $scope.dt = items.date;
    $scope.mytime = items.time;

    $scope.create = function () {
      $modalInstance.close({title: $scope.title, info: $scope.info, location: $scope.location, date: $scope.dt, time: $scope.mytime, price: (($scope.free==true)?'free':$scope.price)});
    };
  })

  .controller('CreateSaleModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.modalInstance = $modalInstance;
    $scope.edit = items.edit;
    $scope.title = items.title;
    $scope.myImage=items.photo;
    $scope.myCroppedImage=items.photo;
    $scope.cropType='circle';
    $scope.price = "$ ";
    if($scope.edit==true) $scope.price=items.price;

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
  })

  .controller('AddPostCtrl', function ($rootScope, $scope) {
    $scope.newPost='';
    $scope.selectedNewPostType='';
    $scope.newPostInput=$("#new_post_input");

    $scope.newPostInput.keypress(function(e) {
      var key = e.which;
      if(key==13){
        $scope.submitPost();
      }
    });

    $scope.reset = function(){
      $scope.newPost = '';
      $scope.selectedNewPostType = '';
    }

    $scope.submitPost = function(){
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
        
        var post_input = $scope.newPost;
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

        $scope.reset();
        scrollTop();
    }

    $scope.selectMention = function() {
      $scope.selectedNewPostType = '@';
      $scope.newPost = '@';
      $scope.newPostInput.focus();
    }

    $scope.selectEvent = function() {
      $rootScope.newEvent();
      $scope.reset();
    }

    $scope.selectPoll = function() {
      $rootScope.newPoll();
      $scope.reset();
    }

    $scope.selectQuestion = function() {
      $rootScope.newQuestion();
      $scope.reset();
    }

    $scope.selectSale = function() {
      $rootScope.newSale();
      $scope.reset();
    }

  });

