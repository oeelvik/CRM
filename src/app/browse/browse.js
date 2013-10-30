/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.browse', [
  'ui.state',
  'itemlist',
  'crm.browse.history'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'browse', {
    url: '/browse',
    views: {
      "main": {
        controller: function(){},
        templateUrl: 'browse/browse.tpl.html'
      }
    }
  });

  $stateProvider.state( 'browse.resource', {
    url: '/{resource:[a-z_-]{1,20}}',
    views: {
      "browser": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/browse.resource.tpl.html'
      }
    }
  });
})

.controller( 'BrowseCtrl', function BrowseController( $scope, $stateParams, $location, Page, Data, BrowserHistory ) {
    $scope.model = Data.model[$stateParams.resource];

    BrowserHistory.clear();
    BrowserHistory.add($scope.model.title, '#' + $location.path());

    $scope.columns = [{ value: $scope.model.label, label: 'Name', primary: true }];

    $scope.records = Data.get($stateParams.resource);

    Page.setTitle($scope.model.title);
})

;