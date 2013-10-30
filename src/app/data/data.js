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

        },
        fields: [
          {
            name: 'id',
            label: 'ID'
          },
          {
            name: 'firstname',
            label: 'Firstname'
          },
          {
            name: 'lastname',
            label: 'Lastname'
          },
          {
            name: 'note',
            label: 'Note'
          }
        ]
      },
      group: {
        name: 'group',
        title: 'Group',
        iconClass: 'icon-group',
        label: 'name',
        fields: [
          {
            name: 'id',
            label: 'ID'
          },
          {
            name: 'name',
            label: 'Name'
          }
        ]
      },
      event: {
        name: 'event',
        title: 'Event',
        iconClass: 'icon-calendar',
        label: 'title',
        fields: [
          {
            name: 'id',
            label: 'ID'
          },
          {
            name: 'title',
            label: 'title'
          }
        ]
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