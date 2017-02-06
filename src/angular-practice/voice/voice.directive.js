/**
 * @author [https://github.com/silence717]
 * @since  2016-09-01
 */
(function(angular) {
    angular
        .module('components.voice', [])
        .directive('voice', voice);

    function voice() {
        var directive = {
            restrict: 'E',
            scope: {
                hasend: '=',
                position: '@',
                voicePlayCallback: '&',
                voiceStopCallback: '&'
            },
            controller: VoiceController,
            controllerAs: 'vm',
            templateUrl: 'voice.tpl.html',
            bindToController: true
        };
        return directive;
    }

    VoiceController.$inject = ['$scope', '$document'];
    function VoiceController($scope, $document) {
        var vm = this;

        // 音频样式初始化
        var className = 'stop';
        var voiceContainer = null;
        var middleDom = null;
        var largeDom = null;

        // 获取当前活动的voicepanel
        var currentEvent = function(event) {
            // 使页面的voicepanel停止动画
            angular.element($document).find('a').children().addClass(className);
            if (event.target.tagName === 'A') {
                voiceContainer = angular.element(event.target);
            } else {
                voiceContainer = angular.element(event.target).parent();
            }
            middleDom = angular.element(voiceContainer.children()[1]);
            if (vm.position === 'left') {
                largeDom = angular.element(voiceContainer.children()[2]);
            } else {
                largeDom = angular.element(voiceContainer.children()[0]);
            }
        };
        // 点击播放
        vm.play = function(event) {
            currentEvent(event);
            vm.hasend = false;
            if (middleDom.hasClass(className)) {
                middleDom.removeClass(className);
                largeDom.removeClass(className);
                vm.voicePlayCallback();
            } else {
                middleDom.addClass(className);
                largeDom.addClass(className);
                vm.voiceStopCallback();
            }
            // 监听音频是否播放完成
            $scope.$watch('vm.hasend', function(newValue, oldValue) {
                if (newValue !== oldValue && newValue === true) {
                    middleDom.addClass(className);
                    largeDom.addClass(className);
                }
            });
        };
    }
})(window.angular);
