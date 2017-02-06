/**
 * @author [https://github.com/silence717]
 * @since  2016-09-01
 */
(function(angular){
    angular
        .module('app', ['components.voice'])
        .controller('AppController', AppController);

    AppController.$inject = ['$document', '$timeout', '$scope', '$sce'];
    function AppController($document, $timeout, $scope, $sce) {
        var vm = this;
        // 音频不支持直接ng-src，需要做转换
        vm.sce = $sce.trustAsResourceUrl;
        // 音频文件过大,自行上传
        vm.url1 = './music1.mp3';
        vm.url2 = './music2.mp3';
        /**
         * play audio
         * @param url
         */
        vm.audioPlayClick = function(url) {
            var audioDom = $document[0].querySelector('audio');
            vm.currentAudio = url;
            $timeout(function() {
                audioDom.play();
            }, 500);
            audioDom.onended = function() {
                vm.hasend = true;
                $scope.$digest();
            };
        };
        /**
         *  暂停播放
         */
        vm.audioStopClick = function() {
            var audioDom = $document[0].querySelector('audio');
            audioDom.pause();
        };
    }
})(window.angular);