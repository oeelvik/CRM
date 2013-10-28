/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.browse', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'browse', {
    url: '/browse',
    views: {
      "main": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/browse.tpl.html'
      }
    }
  });

  $stateProvider.state( 'browse.model', {
    url: '/{model:[a-z_-]{1,20}}',
    views: {
      "browser-history": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/history.tpl.html'
      },
      "browser-list": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/list.tpl.html'
      },
      "browser-detail": {
        controller: 'BrowseCtrl',
        templateUrl: 'browse/detail.tpl.html'
      }
    }
  });
})

.controller( 'BrowseCtrl', function BrowseController( $scope, $state, $stateParams, Page, Data ) {
    $scope.state = $stateParams;

    $scope.$watch('$stateParams.model', function(newModel, oldModel) {
        if(angular.isDefined(Data.model[$stateParams.model].title)) {
            $scope.model = Data.model[$stateParams.model];
            Page.setTitle(Data.model[$stateParams.model].title);
        }
    });

    console.log(Data);
    console.log($stateParams.model);

    Page.setTitle($scope.model);
})


;