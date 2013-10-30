
angular.module( 'crm.browse.history', [])

.directive('browsehistory', [ 'BrowserHistory', function(BrowserHistory) {
    return {
        replace: true,
        scope: {},
        templateUrl: 'browse/browse.history.tpl.html',
        link: function(scope, element, attrs) {
            scope.history = BrowserHistory;
        }
    };
}])

.factory('BrowserHistory', function() {
  records = [];
  return {
    records: records,
    add: function (title, path) {
        records.push({ title: title, path: path });
    },
    clear: function () {
        records.length = 0;
    }
  };

})

;