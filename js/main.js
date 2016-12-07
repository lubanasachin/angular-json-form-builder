var fieldId = 0;
var jsonData = {};
(function(angular) {
  'use strict';

	angular.module('myProcessApp', [])
  	.controller('myProcessCtrl', ['$scope','$compile', '$rootScope',  function($scope,$compile, $rootScope) {
		$scope.addComponent = function(addMe) {
            var settDiv = document.getElementById('settingArea');
            var pelem = '';
            switch(addMe) {
                case 1:
                    pelem = angular.element(document.createElement('my-textfield'));
                    break;
                case 2:
                    pelem = angular.element(document.createElement('my-email'));
                    break;
                case 3:
                    pelem = angular.element(document.createElement('my-radio'));
                    break;
                case 4:
                    pelem = angular.element(document.createElement('my-checkbox'));
                    break;
                case 5:
                    pelem = angular.element(document.createElement('my-label'));
                    break;
                case 6:
                    pelem = angular.element(document.createElement('my-button'));
                    break;
            }
            settDiv.append($compile(pelem)($scope)[0]);
			fieldId++;
		}

		$scope.saveForm = function() {
			console.log('SAVE FORM CLICKED');
		}

		$scope.resetForm = function() {
            document.getElementById('settingArea').innerHTML = '';
		}

  	}])
	.directive('myTextfield', function() {
		return {
			restrict: 'E',
			transclude: true,
            scope: true,
            link: function($scope, element,attrs) {
				$scope.field = {
					fieldId: fieldId,
					fieldName: 'New field '+fieldId,
					defaultValue: '',
					isRequired: false
				};
				
                $scope.removeMe = function() {
					delete jsonData["field-"+$scope.field.fieldId];
					$scope.field = {};
                    element.remove();
					document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(jsonData,undefined,2)+'</pre>';
                }

				$scope.$watch('field', function(newVal,oldVal) {
					if($scope.field.fieldId === undefined) return;
					jsonData["field-"+newVal.fieldId] = {
						"field_title": newVal.fieldName,
						"field_type": 'text',
						"field_value": newVal.defaultValue,
						"field_required": newVal.isRequired
					}
					document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(jsonData,undefined,2)+'</pre>';
				},true);

            },
			templateUrl: 'views/directives-templates/my-textfield.html'
		}
	})
	.directive('myEmail', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            link: function($scope, element,attrs) {
                $scope.field = {
                    fieldId: fieldId,
                    fieldName: 'New field '+fieldId,
                    defaultValue: '',
                    isRequired: false
                };

                $scope.removeMe = function() {
					delete jsonData["field-"+$scope.field.fieldId];
                    $scope.field = {};
                    element.remove();
                    document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(jsonData,undefined,2)+'</pre>';
                }

                $scope.$watch('field', function(newVal,oldVal) {
                    if($scope.field.fieldId === undefined) return;
                    jsonData["field-"+newVal.fieldId] = {
                        "field_title": newVal.fieldName,
                        "field_type": 'email',
                        "field_value": newVal.defaultValue,
                        "field_required": newVal.isRequired
                    }
                    document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(jsonData,undefined,2)+'</pre>';
                },true);

            },
            templateUrl: 'views/directives-templates/my-email.html'
        }
    })
    .directive('myRadio', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            link: function($scope, element,attrs) {
                $scope.fieldName = 'New field '+fieldId;
                $scope.removeMe = function() {
                    element.remove();
                }
				$scope.addOptions = function() {
					var pElem = document.getElementById('optionsList');
					var box = document.createElement('div');
						box.className = "box";
					var txt = document.createElement('input');
						txt.className = "inputTxt";
					var close = document.createElement('label');
						close.className = "lbl";
						close.innerHTML = "&nbsp;X";
						close.addEventListener('click', function() {
							pElem.removeChild(box);
						});
					box.append(txt);
					box.append(close);
					pElem.append(box);
				}
            },
            templateUrl: 'views/directives-templates/my-radio.html'
        }
    })
    .directive('myCheckbox', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            link: function($scope, element,attrs) {
                $scope.fieldName = 'New field '+fieldId;
                $scope.removeMe = function() {
                    element.remove();
                }
            },
            templateUrl: 'views/directives-templates/my-checkbox.html'
        }
    })
    .directive('myLabel', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            link: function($scope, element,attrs) {
                $scope.fieldName = 'New field '+fieldId;
                $scope.removeMe = function() {
                    element.remove();
                }
            },
            templateUrl: 'views/directives-templates/my-label.html'
        }
    })
    .directive('myButton', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            link: function($scope, element,attrs) {
                $scope.fieldName = 'New field '+fieldId;
                $scope.removeMe = function() {
                    element.remove();
                }
            },
            templateUrl: 'views/directives-templates/my-button.html'
        }
    })
})(window.angular);
