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
        name: 'person',
        title: 'Person',
        iconClass: 'icon-user',
        label: function(item) {
          return item.firstname + " " + item.lastname;

        }
      },
      group: {
        name: 'group',
        title: 'Group',
        iconClass: 'icon-group',
        label: 'name'
      },
      event: {
        name: 'event',
        title: 'Event',
        iconClass: 'icon-calendar',
        label: 'title'
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