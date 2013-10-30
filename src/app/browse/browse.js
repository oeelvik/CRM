/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.browse', [
  'ui.state',
  'itemlist'
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

.controller( 'BrowseCtrl', function BrowseController( $scope, $stateParams, $location, Page, Data ) {
    $scope.model = Data.model[$stateParams.model];


    $scope.history = [
        {
            title: $scope.model.title,
            url: '#' + $location.path()
        },
        {
            title: 'Group - Customer',
            url: '#/browse/person/10'
        },
        {
            title: 'Person - Ola Norman',
            url: '#/browse/person/10'
        },
        {
            title: 'Person - Kari Norman',
            url: '#/browse/person/10'
        }
    ];

    $scope.records = Data.get($stateParams.model);

    Page.setTitle($scope.model.title);
})

;