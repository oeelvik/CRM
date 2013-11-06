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

  $stateProvider.state( 'browse.resource.new', {
    url: '/_new',
    controller: 'BrowseIDCtrl',
    templateUrl: 'browse/detail.tpl.html'
  });
})

.controller( 'BrowseCtrl', function BrowseController( $scope, $state, $stateParams, $location, Page, Data, BrowserHistory ) {
    $scope.model = Data.model[$stateParams.resource];

    BrowserHistory.clear();
    BrowserHistory.add($scope.model.title, '#' + $location.path());

    $scope.columns = [{ value: $scope.model.label, label: 'Name', primary: true }];
    
    Data.get($scope.model.name).then(function(records){
        $scope.records = records;
    });

    Page.setTitle($scope.model.title);

    $scope.$watch('selected', function(newVal, oldVal){
        if(newVal != null) {
            $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:newVal});
        }
    });

    $scope.add = function(){
        $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:'_new'});
    };
})

.controller( 'BrowseIDCtrl', function BrowseIDController( $scope, $stateParams, $location, Page, Data, BrowserHistory ) {

    if($stateParams.id) {
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
    } else {
        $scope.record = [];
    }
    

    $scope.save = function(){
        if(angular.isNumber($scope.record[$scope.model.idField])){
            $scope.record.put().then($scope.updateSuccess, $scope.saveFailure);
        } else {
            console.log($scope.record);
            $scope.records.post($scope.record).then($scope.createSuccess, $scope.saveFailure);

        }
    };

    $scope.updateSuccess = function(record){

      var index = records.indexOf($scope.record);
      $scope.records.splice(index, 1, record);
      $scope.record = record;

    };

    $scope.createSuccess = function(record){
      $scope.record = record;
      $scope.records.push(record);
    };

    $scope.saveFailure = function(response){
      alert("Error with status code", response.status);
    };
})

;