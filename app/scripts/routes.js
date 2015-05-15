'use strict';

angular
  .module('getnearApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('');

    $stateProvider

    //login
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'views/tmpl/pages/login.html'
    })
    //signup
    .state('signup', {
      url: '/signup',
      controller: 'SignupCtrl',
      templateUrl: 'views/tmpl/pages/signup.html'
    })
    //forgotpass
    .state('forgotpass', {
      url: '/forgotpass',
      controller: 'ForgotPasswordCtrl',
      templateUrl: 'views/tmpl/pages/forgotpass.html'
    })
    //offline
    .state('page-offline', {
      url: '/page-offline',
      templateUrl: 'views/tmpl/pages/page-offline.html'
    })
    //404
    .state('page404', {
      url: '/page404',
      templateUrl: 'views/tmpl/pages/page404.html'
    })
    //500
    .state('page500', {
      url: '/page500',
      templateUrl: 'views/tmpl/pages/page500.html'
    })
    //profile
    .state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'views/tmpl/pages/profile.html'
    })
    //chat
    .state('chat', {
      url: '/chat',
      controller: 'ChatCtrl',
      templateUrl: 'views/tmpl/chat.html'
    })
    //grouplist
    .state('grouplist', {
      url: '',
      controller: 'GroupListCtrl',
      templateUrl: 'views/tmpl/group_list.html'
    })
    //group
    .state('group', {
      url: '/:group',
      controller: 'GroupCtrl',
      templateUrl: 'views/tmpl/group.html'
    })
    //channel
    .state('group.channel', {
      url: '/:channel',
      controller: 'ChannelCtrl',
      templateUrl: 'views/tmpl/channel.html'
    });

  }]);