var fieldId = 0,
	formId = 1,
	formJson = {}
	resultJson = {};
(function(angular) {
  'use strict';

	angular.module('myProcessApp', [])
  	.controller('myProcessCtrl', ['$scope','$compile', '$rootScope',  function($scope,$compile, $rootScope) {

		$scope.jsonView = true;
		$scope.formView = false;
		$scope.previousBtn = false;

		$scope.addComponent = function(addMe) {
			var formDiv = document.getElementById('form-'+formId),
            	pelem = document.createElement('my-element');
			pelem.setAttribute('element-type',addMe);
			pelem = angular.element(pelem);
            formDiv.append($compile(pelem)($scope)[0]);
			fieldId++;
		}

		$scope.addForm = function() {
			if(formId > 1) {
				$scope.previousBtn = true;
				document.getElementById('form-'+(formId-1)).style.display = 'none';
			} else $scope.previousBtn = false;
	
			if(document.getElementById('form-'+formId) != undefined) {
				document.getElementById('form-'+formId).style.display = 'block';
				formJson = resultJson['form-'+formId] || {};
				fieldId = Object.keys(formJson).length;
			} else {
				var settDiv = document.getElementById('settingArea'),
					formDiv = document.createElement('div');
				formDiv.setAttribute('id','form-'+formId);
				settDiv.append(formDiv);	
				formJson = {};
				fieldId = 0;
			}
			document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(formJson,undefined,2)+'</pre>';
		}
		$scope.addForm();

		$scope.previousForm = function() {
			document.getElementById('form-'+formId).style.display = 'none';
			document.getElementById('form-'+(formId-1)).style.display = 'block';
			formId--;
			if(formId <= 1) $scope.previousBtn = false;
			formJson = resultJson['form-'+formId];
			fieldId = Object.keys(formJson).length;
			document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(formJson,undefined,2)+'</pre>';
		}

		$scope.saveMore = function() {
			if(Object.keys(formJson).length <= 0) return;
			resultJson['form-'+formId] = formJson;			
			formId++;
			$scope.addForm();
		}

		$scope.saveForm = function() {
			if(Object.keys(formJson).length <= 0) return;
			$scope.previousBtn = false;
			resultJson['form-'+formId] = formJson;			
			console.log(resultJson);
            document.getElementById('settingArea').innerHTML = '';
			resultJson = {};
			formJson = {};
			fieldId = 0;
			document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(formJson,undefined,2)+'</pre>';
		}

		$scope.viewForm = function() {
			$scope.jsonView = false;
			$scope.formView = true;
		}

		$scope.viewJson = function() {
			$scope.formView = false;
			$scope.jsonView = true;
		}

		$scope.resetForm = function() {
            document.getElementById('form-'+formId).innerHTML = '';
			formJson = {};
			fieldId = 0;
			document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(formJson,undefined,2)+'</pre>';
		}

  	}])
	.directive('myElement', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            link: function($scope, element,attrs) {

                $scope.field = {
                    fieldId: fieldId,
                    fieldName: 'New field '+fieldId,
					fieldType: attrs.elementType,
                    defaultValue: '',
                    isRequired: false
                };

				if(attrs.elementType === 'image' && $scope.field.defaultValue === '') {
					$scope.field.defaultValue = 'http://image.com/bg.png';
				}

                $scope.removeMe = function() {
                    delete formJson["field-"+$scope.field.fieldId];
                    $scope.field = {};
                    element.remove();
                    document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(formJson,undefined,2)+'</pre>';
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

                $scope.$watch('field', function(newVal,oldVal) {
                    if($scope.field.fieldId === undefined) return;
                    formJson["field-"+newVal.fieldId] = {
                        "field_title": newVal.fieldName,
                        "field_type": newVal.fieldType,
                        "field_value": newVal.defaultValue,
                        "field_required": newVal.isRequired
                    }
                    document.getElementById("jsonArea").innerHTML = '<pre>'+JSON.stringify(formJson,undefined,2)+'</pre>';
                },true);

            },
            templateUrl: function(element,attrs) {
				return 'views/directives-templates/my-'+attrs.elementType+'.html';
			}
        }
    })
})(window.angular);
