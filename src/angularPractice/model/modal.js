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
		 * locals 本地参数
		 * */

		return function(config) {

			if (!(config.template || config.templateUrl)) {
				throw new Error('Expected modal to have exactly one of either `template` or `templateUrl`');
			}

			var controller = config.controller || function() {};
			var controllerAs = config.controllerAs || 'vm';
			var locals = config.locals || {};
			var root = angular.element($document[0].querySelector('html'));
			var modalHtml = $templateRequest('./modal.tpl.html');
			var element = null;
			var modalBodyHtml, scope;

			if (config.template) {
				modalBodyHtml = $q.when(config.template);
			} else {
				modalBodyHtml = $templateRequest(config.templateUrl);
			}

			function open() {
				var deferred = $q.defer();
				$q.all([modalHtml, modalBodyHtml]).then(function(htmls) {
					if (!element) {
						element = angular.element(htmls[0]);
						element[0].querySelector('.modal-body').appendChild(angular.element(htmls[1])[0]);
						var modalEle = compileModel(element, deferred);
						root.append(modalEle);
						modalEle.addClass('in');
					}
				});

				return deferred.promise;
			}

			function compileModel(element, deferred) {

				var modalEle = null;

				scope = $rootScope.$new();

				scope.close = function() {
					modalEle.removeClass('in');
					modalEle.remove();
					if (scope[controllerAs].close) {
						deferred.reject(scope[controllerAs].close());
					} else {
						deferred.reject();
					}
				};

				scope.ok = function() {
					modalEle.removeClass('in');
					modalEle.remove();
					if (scope[controllerAs].ok) {
						deferred.resolve(scope[controllerAs].ok());
					} else {
						deferred.resolve();
					}
				};

				scope.cancel = function() {
					modalEle.removeClass('in');
					modalEle.remove();
					if (scope[controllerAs].cancel) {
						deferred.reject(scope[controllerAs].cancel());
					} else {
						deferred.reject();
					}
				};

				for (var prop in locals) {
					scope[prop] = locals[prop];
				}

				var ctrl = $controller(controller, {
					$scope: scope
				});

				scope[controllerAs] = ctrl;

				modalEle = $compile(element)(scope);

				return modalEle;
			}

			return {
				open: open
			};
		};
	});
}());
