/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.dashboard', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      "main": {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/dashboard.tpl.html'
      }
    },
    data:{ pageTitle: 'Dashboard' }
  });
})

.controller( 'DashboardCtrl', function DashboardController( $scope ) {
})

;

