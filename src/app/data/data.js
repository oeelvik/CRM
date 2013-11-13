/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.data', ['restangular'])
.constant(
  'settings', {
    baseUrl: 'http://localhost:8080/crm/rest/collection',
    idField: '_id.$oid'
  }
)
.config(function(RestangularProvider, settings){
  RestangularProvider.setBaseUrl(settings.baseUrl);
  RestangularProvider.setRestangularFields({
    id: settings.idField
  });

  RestangularProvider.setRequestInterceptor(
      function(elem, operation, what) {
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
  });
})

.factory('Data', function(Restangular, settings) {

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
            name: '_id',
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
            name: '_id',
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
            name: '_id',
            label: 'ID'
          },
          {
            name: 'title',
            label: 'Title'
          }
        ]
      }
  };

  data.getIdFromRecord = function(elem) {
    var properties = '_id.$oid'.split('.');
    var idValue = angular.copy(elem);
    var found = false;
    _.each(properties, function(prop) {
      if (idValue) {
        idValue = idValue[prop];
        found = true;
      }
    });
    return (found) ? idValue : undefined;
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