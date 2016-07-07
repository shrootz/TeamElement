'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []).controller('mainCtrl', function() {
  this.hero = {
    name: 'Spawn'
  };
});