/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.data', ['restangular'])
.constant(
  'settings', {
    baseUrl: '/crm/rest/data',
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
    models: [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "title": "Person",
        "description": "",
        "iconClass": "icon-user",
        "properties": {
          "_id": {
            "type": "object",
            "title": "ID",
            "properties": {
              "$oid": {
                "type": "string",
                "title": "ObjectID"
              }
            }
          },
          "firstname": {
            "type": "string",
            "title": "Firstname"
          },
          "lastname": {
            "type": "string",
            "title": "Lastname"
          },
          "note": {
            "type": "string",
            "title": "Note"
          }
        },
        "required": ["_id", "firstname", "lastname"],
        "label": ["firstname", "lastname"]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "title": "Group",
        "description": "",
        "iconClass": "icon-group",
        "properties": {
          "_id": {
            "type": "object",
            "title": "ID",
            "properties": {
              "$oid": {
                "type": "string",
                "title": "ObjectID"
              }
            }
          },
          "name": {
            "type": "string",
            "title": "Name"
          }
        },
        "required": ["_id", "name"],
        "label": ["name"]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "title": "Event",
        "description": "",
        "iconClass": "icon-calendar",
        "properties": {
          "_id": {
            "type": "object",
            "title": "ID",
            "properties": {
              "$oid": {
                "type": "string",
                "title": "ObjectID"
              }
            }
          },
          "title": {
            "type": "string",
            "title": "Title"
          }
        },
        "required": ["_id", "title"],
        "label": ["title"]
      }
    ],
    get: function(modelname){
      var r = {};
      _.each(data.model.models, function(model) {
        if (model.title.toLowerCase() == modelname.toLowerCase()) {
          r = model;
        }
      });
      return r;
    }
  };

  data.getIdFromRecord = function(elem) {
    var properties = settings.idField.split('.');
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