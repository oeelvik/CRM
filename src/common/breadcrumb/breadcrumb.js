angular.module( 'breadcrumb', [])

.directive('breadcrumb', [ 'Breadcrumb', function(Breadcrumb) {
    return {
        replace: true,
        scope: {},
        templateUrl: 'breadcrumb/breadcrumb.tpl.html',
        link: function(scope, element, attrs) {
            scope.path = Breadcrumb.records;
        }
    };
}])

.factory('Breadcrumb', function() {
  records = [];
  return {
    records: records,
    set: function (index, title, path) {
        records.length = index;
        records.push({ title: title, path: path });
    },
    add: function (title, path) {
        records.push({ title: title, path: path });
    },
    clear: function () {
        records.length = 0;
    }
  };

})

;