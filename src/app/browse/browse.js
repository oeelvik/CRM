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

  $stateProvider.state( 'browse.model', {
    url: '/{model:[a-z_-]{1,20}}',
    views: {
      "browser": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/browse.model.tpl.html'
      }
    }
  });
})

.controller( 'BrowseCtrl', function BrowseController( $scope, $stateParams, $location, Page, Data, BrowserHistory ) {
    $scope.model = Data.model[$stateParams.model];

    BrowserHistory.clear();
    BrowserHistory.add($scope.model.title, '#' + $location.path());

    $scope.columns = [{ value: $scope.model.label, label: 'Name', primary: true }];

    $scope.records = Data.get($stateParams.model);

    Page.setTitle($scope.model.title);
})

;