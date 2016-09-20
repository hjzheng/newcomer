### 门面模式

Used to provide a simplified interface to a complicated system.

#### 关键点

- Facade hides the chaos from us
- Simplifies the interface

#### 实现方式

```js
function message($window, $location) {
    var origin = $location.search().parentUrl || 'http://localhost:8080';

    function sendMessage(data) {
        $window.parent.postMessage(data, origin);
    }
    return {
        closeMask: function() {
            sendMessage({showMask: false});
        },
        openMask: function() {
            sendMessage({showMask: true});
        },
        sendData: function(data) {
            sendMessage(data);
        }
    };
};
```
