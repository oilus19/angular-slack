'use strict';

angular
  .module('getnearApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);


    $urlRouterProvider.otherwise('/');

    $stateProvider

    //login
    .state('login', {
      url: '/',
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
    //app
    .state('app', {
      url: '',
      templateUrl: 'views/tmpl/app.html'
    })
    //profile
    .state('app.profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'views/tmpl/pages/profile.html'
    })
    //grouplist
    .state('app.grouplist', {
      url: '/groups',
      controller: 'GroupListCtrl',
      templateUrl: 'views/tmpl/group_list.html'
    })
    //group
    .state('app.group', {
      url: '/groups',
      controller: 'GroupCtrl',
      templateUrl: 'views/tmpl/group.html'
    })
    //channel
    .state('app.group.channel', {
      url: '/:group/:channel',
      controller: 'ChannelCtrl',
      templateUrl: 'views/tmpl/channel.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    })
    //chat
    .state('app.group.chat', {
      url: '/:group/chat/:user',
      controller: 'ChatCtrl',
      templateUrl: 'views/tmpl/chat.html'
    });

  }]);