'use strict';

/**
 * @ngdoc function
 * @name getnearApp.controller:FormsWizardCtrl
 * @description
 * # FormsWizardCtrl
 * Controller of the getnearApp
 */
angular.module('getnearApp')
  .controller('FormWizardCtrl', function ($scope) {
    $scope.page = {
      title: 'Form Wizard',
      subtitle: 'Place subtitle here...'
    };
  });
