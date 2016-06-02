var todoList = [
    {text: "learn angular", done: true},
    {text: "build an angular app", done: false}
];


window.onload = function () {
    var input = document.getElementById('in');
    var liList = document.getElementById('ul')
    var archive = document.getElementById('archive');
    var btn = document.getElementById('btn');
    var remainEl = document.getElementById('remain');

    init();

    btn.onclick = function () {
        if(input.value){
            var todo = {text: input.value, done: false};
            todoList.push(todo)
            appendTodo(todo);
            updateSummary();
        }
    };

    archive.onclick = function () {
        todoList = todoList.filter(function(todo){
            return todo.done === false;
        });
        init();
    }

    function init() {

        liList.innerHTML = '';

        todoList.forEach(function (todo) {
            appendTodo(todo);
        });
        updateSummary();
    }

    function appendTodo(todo) {
        var li = document.createElement('li');
        var input = document.createElement('input');
        input.type = "checkbox";
        input.checked = todo.done;

        input.onclick = function() {
            this.checked = this.checked ? true : false;
            todo.done = this.checked;
            this.nextElementSibling.className = todo.done ? 'done-true' : '';
            updateSummary();
        };

        var label = document.createElement('label');

        if(todo.done) {
            label.className = 'done-true';
        }
        var text = document.createTextNode(todo.text);

        label.appendChild(text);
        li.appendChild(input);
        li.appendChild(label);
        liList.appendChild(li);
    }

    function updateSummary() {
        remainEl.innerHTML = (remaining() + ' of ' + todoList.length);
    }

    function remaining() {
        var r = todoList.filter(function(todo){
            return todo.done === false;
        });
        return r.length;
    }

};