/**
 * Created by hjzheng
 */
(function() {
	angular.module('ui-modal', []);

	angular.module('ui-modal').factory('myModalService', function($document, $q, $templateRequest, $rootScope, $controller, $compile) {

		/**
		 * templateUrl or template
		 * controller 默认是 function(){}
		 * controllerAs 默认是 'vm'
		 * */

		return function(config) {

			if (!(config.template || config.templateUrl)) {
				throw new Error('Expected modal to have exactly one of either `template` or `templateUrl`');
			}

			var controller = config.controller || function() {};
			var controllerAs = config.controllerAs || 'vm';
			var root = angular.element($document[0].querySelector('html'));
			var element = null;
			var html, scope;

			if (config.template) {
				html = $q.when(config.template);
			} else {
				html = $templateRequest(config.templateUrl);
			}

			function open(locals) {
				var deferred = $q.defer();
				html.then(function(html) {
					if (!element) {
						var modalEle = compileModel(html, locals, deferred);
						root.append(modalEle);
					}
				});

				return deferred.promise;
			}

			function compileModel(html, locals, deferred) {

				var modalEle = null;

				element = angular.element(html);

				if (element.length === 0) {
					throw new Error('The template contains no elements; you need to wrap text nodes');
				}

				scope = $rootScope.$new();

				scope.close = function() {
					modalEle.remove();
					if (scope[controllerAs].close) {
						deferred.reject(scope[controllerAs].close());
					} else {
						deferred.reject();
					}
				};

				scope.ok = function() {
					modalEle.remove();
					if (scope[controllerAs].ok) {
						deferred.resolve(scope[controllerAs].ok());
					} else {
						deferred.resolve();
					}
				};

				scope.cancel = function() {
					modalEle.remove();
					if (scope[controllerAs].cancel) {
						deferred.reject(scope[controllerAs].cancel());
					} else {
						deferred.reject();
					}
				};

				if (controller) {
					if (!locals) {
						locals = {};
					}
					for (var prop in locals) {
						scope[prop] = locals[prop];
					}

					var ctrl = $controller(controller, {
						$scope: scope
					});

					if (controllerAs) {
						scope[controllerAs] = ctrl;
					}
				}

				modalEle = $compile(element)(scope);

				return modalEle;
			}

			return {
				open: open
			};
		};
	});
}());
