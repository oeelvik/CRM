/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.browse', [
  'ui.state',
  'itemlist',
  'breadcrumb'
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
    url: '/{id:[a-fA-F\\d]+}',
    controller: 'BrowseIDCtrl',
    templateUrl: 'browse/detail.tpl.html'
  });

  $stateProvider.state( 'browse.resource.new', {
    url: '/_new',
    controller: 'BrowseIDCtrl',
    templateUrl: 'browse/detail.tpl.html'
  });
})

.controller( 'BrowseCtrl', function BrowseController( $scope, $state, $stateParams, $location, Page, Data, Breadcrumb ) {
    $scope.model = Data.model[$stateParams.resource];

    Breadcrumb.clear();
    Breadcrumb.add($scope.model.title, '#' + $location.path());

    $scope.columns = [{ value: $scope.model.label, label: 'Name', primary: true }];
    
    Data.get($scope.model.name).then(function(records){
        $scope.records = records;

        $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:Data.getIdFromRecord($scope.records[0])});
    });

    Page.setTitle($scope.model.title);

    $scope.$watch('selected', function(newVal, oldVal){
        if(newVal != null) {
            $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:Data.getIdFromRecord(newVal)});
        }
    });

    $scope.add = function(){
        $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:'_new'});
    };
})

.controller( 'BrowseIDCtrl', function BrowseIDController( $scope, $state, $stateParams, $location, Page, Data, Breadcrumb, $log ) {

    if($stateParams.id) {
        Data.get($scope.model.name, $stateParams.id).then(function(record){
            $scope.record = record;

            if(angular.isFunction($scope.model.label)){
                $scope.label = $scope.model.label($scope.record);
            } else {
                $scope.label = $scope.record[$scope.model.label];
            }

            Breadcrumb.set(1,$scope.model.title + " - " + $scope.label, '#' + $location.path());

            Page.setTitle($scope.label + " | " + $scope.model.title);
            $log.info($scope.label);
        });
    } else {
        $scope.record = [];
    }

    $scope.isIDField = function(field){
      return field.name == '_id';
    };

    $scope.getIdFromRecord = function (record){
      return Data.getIdFromRecord(record);
    };

    $scope.save = function(){
        if(angular.isNumber(Data.getIdFromRecord($scope.record))){
            $scope.record.put().then($scope.updateSuccess, $scope.saveFailure);
        } else {
            $scope.records.post($scope.record).then($scope.createSuccess, $scope.saveFailure);
        }
    };

    $scope.del = function(){
        if(angular.isNumber(Data.getIdFromRecord($scope.record))){
            $scope.record.remove().then($scope.delSuccess, $scope.failure);
        }
    };

    $scope.delSuccess = function(record){
      var index = null;
      angular.forEach($scope.records, function(value, key){
        if(Data.getIdFromRecord($scope.record) == Data.getIdFromRecord(value)){
          index = key;
        }
      });
      $scope.records.splice(index, 1);
      $state.transitionTo('browse.resource.id', {resource: $stateParams.resource, id:Data.getIdFromRecord($scope.records[0])});
    };

    $scope.updateSuccess = function(record){
      var index = null;
      angular.forEach($scope.records, function(value, key){
        if(Data.getIdFromRecord($scope.record) == Data.getIdFromRecord(value)){
          index = key;
        }
      });

      $scope.records.splice(index, 1, record);
      $scope.record = record;
    };

    $scope.createSuccess = function(record){
      $scope.record = record;
      $scope.records.push(record);
    };

    $scope.failure = function(response){
      $log.error("Error with status code", response.status);
    };
})

;