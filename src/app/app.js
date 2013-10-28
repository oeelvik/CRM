/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm', [
  'templates-app',
  'templates-common',
  'ui.state',
  'ui.route',

  'crm.data',
  'crm.dashboard',
  'crm.browse'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.run( function run () {
})

.factory('Page', function() {
   var page = 'CRM';
   var title = 'default';
   return {
     getTitle: function() { return title + " | " + page; },
     setTitle: function(newTitle) { title = newTitle; }
   };
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, Data, Page ) {
  $scope.Page = Page;
  $scope.data = Data;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined(toState.data) && angular.isDefined( toState.data.pageTitle ) ) {
      Page.setTitle(toState.data.pageTitle);
    }
  });

})

;

