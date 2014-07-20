.directive('counter', function() {
    return {
        restrict: 'A',
        scope: { value: '=value', min: '=min', max: '=max', editable: '=editable' },
        template: ' <div class="input-group" style="width:12em;">\
                        <span class="input-group-btn" >\
                            <button class="btn btn-default" type="button">{{ prefix }}</button>\
                            <button class="btn btn-info {{ (value == min)?\'disabled\':\'\' }}" type="button" ng-click="minus()"><i class="glyphicon glyphicon-minus"></i></button>\
                        </span>\
                        <input style="min-width:3em;" type="text" class="form-control" ng-model="value" ng-change="changed()" ng-readonly="readonly">\
                        <span class="input-group-btn" ng-click="plus()">\
                            <button class="btn btn-info {{ (value == max)?\'disabled\':\'\' }}" type="button"><i class="glyphicon glyphicon-plus"></i></button>\
                        </span>\
                    </div>',
        link: function( scope , element , attributes ) {
            scope.prefix = attributes.prefix;
            if ( angular.isUndefined(scope.value) ) { throw "Missing the value attribute on the counter directive."; }
            if ( angular.isUndefined(scope.min) ) { throw "Missing the min attribute on the counter directive."; }
            if ( angular.isUndefined(scope.max) ) { throw "Missing the max attribute on the counter directive."; }
            
            if (angular.isUndefined(attributes.editable)) {
                scope.readonly = true;
            } else {
                scope.readonly = !scope.editable;
            };
            
            scope.minus = function() {
                if ( scope.min < scope.value ) {
                    scope.value = parseInt(scope.value) - 1;
                }
            };
            
            scope.plus = function() {
                if ( scope.max > scope.value ) {
                    scope.value = parseInt(scope.value) + 1;
                }
            };
            
            scope.changed = function() {
                if ( !scope.value ) {
                    scope.value = 0 
                };
                if (!( /[0-9]/.test(scope.value) )) {
                    scope.value = scope.min;
                };
                if (scope.min > scope.value) {
                    scope.value = scope.min
                };
                if (scope.max < scope.value) {
                    scope.value = scope.max
                };
            };
        }
    }
});
