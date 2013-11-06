angular.module('itemlist', [])
    
.directive('itemlist', function() {
    return {
        restrict: "E",
        replace: true,
        scope: {
            selected: "=",
            items: "=",
            columns: "=",
            itemlabel: "@",
            searchable: "@",
            hideseccolsonselect: "@"
        },
        templateUrl: 'itemlist/itemlist.tpl.html',
        link: function(scope, element, attrs) {
            scope.onItemSelect = function(item) {
                if(scope.selected == item) {
                    scope.selected = null;
                } else {
                    scope.selected = item;
                }
            };
            
            scope.itemClass = function(item) {
                return item == scope.selected ? 'active' : undefined;
            };

            scope.getColumnValue = function(item, column) {
                if(angular.isFunction(column.value)){
                    return column.value(item);
                } else {
                    return item[column.value];
                }
            };
        }
    };
});

