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

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $provide ) {
  $urlRouterProvider.otherwise( '/dashboard' );

  //Extended logging functionality:
  $provide.decorator( '$log', ["$delegate", "$filter", function ($delegate, $filter) {
    var errorFn = $delegate.error;

    $delegate.error = function() {
      var args = [].slice.call(arguments);
      var now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss Z');

      args[0] = now + " - " + args[0];

      if(angular.isFunction(errorFn)){
        errorFn.apply(null, args);
      }

      //TODO: send error and log sequece to server
    };

    return $delegate;
  }]);

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

