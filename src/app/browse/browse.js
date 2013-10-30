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

  $stateProvider.state( 'browse.resource.id', {
    url: '/{id:[\\d+]}',
    controller: 'BrowseIDCtrl',
    templateUrl: 'browse/detail.tpl.html'
  });
})

.controller( 'BrowseCtrl', function BrowseController( $scope, $state, $stateParams, $location, Page, Data, BrowserHistory ) {
    $scope.model = Data.model[$stateParams.resource];

    BrowserHistory.clear();
    BrowserHistory.add($scope.model.title, '#' + $location.path());

    $scope.columns = [{ value: $scope.model.label, label: 'Name', primary: true }];

    $scope.records = Data.get($scope.model.name);

    Page.setTitle($scope.model.title);

    $scope.$watch('selected', function(newVal, oldVal){
        if(newVal != null) {
            $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:newVal});
        }
    });
})

.controller( 'BrowseIDCtrl', function BrowseIDController( $scope, $stateParams, $location, Page, Data, BrowserHistory ) {

    Data.get($scope.model.name, $stateParams.id).then(function(record){
        $scope.record = record;

        if(angular.isFunction($scope.model.label)){
            $scope.label = $scope.model.label($scope.record);
        } else {
            $scope.label = $scope.record[$scope.model.label];
        }

        BrowserHistory.add($scope.model.title + " - " + $scope.label, '#' + $location.path());

        Page.setTitle($scope.label + " | " + $scope.model.title);
    });
})

;