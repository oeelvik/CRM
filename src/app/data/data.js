/**
 * @author Oystein Schroder Elvik
 */
angular.module( 'crm.data', [])

.factory('Data', function() {
  var data = {};

  data.model = {
      person: {
        title: 'Person',
        iconClass: 'icon-user'
      },
      group: {
        title: 'Group',
        iconClass: 'icon-group'
      },
      event: {
        title: 'Event',
        iconClass: 'icon-calendar'
      }
  };

  return data;
})

;