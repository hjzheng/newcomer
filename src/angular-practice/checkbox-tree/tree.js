/**
 * Created by hjzheng on 16/6/16.
 */
(function() {

	angular.module('ui-tree', ['ui-checkbox']);

	angular.module('ui-tree').directive('myTree', function() {
		return {
			restrict: 'E',
			templateUrl: './tree.html',
			scope: {
				data: '<',
				onSelected: '&',
				hasCheckbox: '<'
			},
			bindToController: true,
			controllerAs: 'vm',
			controller: function() {
				var vm = this;

				vm.scopes = [];

				function clearAll() {
					vm.scopes.forEach(function(scope) {
						scope.vm.selected = false;
					});
				}

				// 用事件代理
				vm.clickTreeItem = function($event) {
					var target = $event.target;
					var treeItemScope = angular.element(target).scope();
					if (target.classList.contains('treeLabel')) {
						if (!vm.hasCheckbox) {
							clearAll();
							treeItemScope.vm.selected = true;
							vm.onSelected && vm.onSelected({item: treeItemScope.vm.data});
						} else {
							handleTreeCheckbox(treeItemScope.$parent.$parent.vm.data);
							vm.onSelected && vm.onSelected({item: treeItemScope.$parent.$parent.vm.data});
						}
					}

					if (target.classList.contains('fa-check-square-o') ||
						target.classList.contains('fa-square-o')) {
						handleTreeCheckbox(treeItemScope.$parent.vm.data);
						vm.onSelected && vm.onSelected({item: treeItemScope.$parent.vm.data});
					}

					if (target.classList.contains('treeArrow') || target.classList.contains('treeIcon')) {
						treeItemScope.vm.showChildren = !treeItemScope.vm.showChildren;
					}
				};

				// 处理树上 checkbox 的状态
				function handleTreeCheckbox(treeItemData) {
					// 处理子
					var treeItemChecked = treeItemData.checked;
					checkChildItems(treeItemData, treeItemChecked);

					// 处理父
					checkParentItems(vm.data, treeItemData.parentId);
				}

				// 递归 check 子 item
				function checkChildItems(treeItemData, isChecked) {
					treeItemData.children && treeItemData.children.forEach(function(child) {
						child.checked = isChecked;
						child.partial = false;
						checkChildItems(child, isChecked);
					});
				}

				// 查找父节点并 check
				function checkParentItems(data, parentId) {
					data && data.forEach(function(treeItemData) {
						if (treeItemData.id === parentId) {
							treeItemData.checked = isAllChildrenChecked(treeItemData.children);
							if (!treeItemData.checked) {
								treeItemData.partial = isSomeChildrenChecked(treeItemData.children);
							} else {
								treeItemData.partial = false;
							}
							checkParentItems(vm.data, treeItemData.parentId);
						} else {
							checkParentItems(treeItemData.children, parentId);
						}
					});
				}

				function isAllChildrenChecked(children) {
					return children && children.every(function(child) {
						return child.checked;
					});
				}

				function isSomeChildrenChecked(children) {
					return children && children.some(function(child) {
						return child.checked || child.partial;
					});
				}
			}
		};
	});

	angular.module('ui-tree').directive('myTreeItem', function() {
		return {
			restrict: 'E',
			templateUrl: './treeItem.html',
			scope: {
				data: '<',
				parentId: '<'
			},
			bindToController: true,
			controllerAs: 'vm',
			replace: true,
			require: '^^myTree',
			controller: function() {

				var vm = this;

				vm.showChildren = true;
				vm.isEdit = false;

				vm.isLeaf = function(treeItem) {
					return !treeItem.children || treeItem.children.length === 0;
				};

				vm.data.partial = false;
				vm.data.checked = false;
				vm.data.parentId = vm.parentId;
			},
			link: function(scope, element, attrs, vm) {
				vm.scopes.push(scope);
				scope.vm.hasCheckbox = vm.hasCheckbox;
			}
		};
	});
}());
