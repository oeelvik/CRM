/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.data', ['restangular'])

.config(function(RestangularProvider){
  RestangularProvider.setBaseUrl('http://localhost:8081');
})

.factory('Data', function(Restangular) {

  var data = {};

  data.model = {
      person: {
        label: function(item) {
          return item.firstname + " " + item.lastname;
        },
        title: 'Person',
        iconClass: 'icon-user'
      },
      group: {
        label: 'name',
        title: 'Group',
        iconClass: 'icon-group'
      },
      event: {
        label: 'title',
        title: 'Event',
        iconClass: 'icon-calendar'
      }
  };

  data.get = function(model, id) {
    if(angular.isDefined(id)) {
      return Restangular.one(model, id).get();
    } else {
      return Restangular.all(model).getList();
    }
  };

  return data;
})

;