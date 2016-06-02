var data = [
    {href: "#", label: "家用电器"},
    {href: "#", label: "手机, 数码"},
    {href: "#", label: "家用电器"},
    {href: "#", label: "家用电器"},
    {href: "#", label: "家用电器"},
    {href: "#", label: "家用电器"},
    {href: "#", label: "家用电器"}
];


data.push({href:'#', label: "书籍"});
data.unshift({href: "#", label: "电影票"});

window.onload = function(){

    var menu = document.getElementById("menu");
    var content = document.getElementById("content");

    for(var i=0; i<data.length; i++) {
        var li  = document.createElement("li")
        var a = document.createElement("a");
        a.href = data[i].href;
        a.innerHTML = data[i].label;
        li.appendChild(a);
        content.appendChild(li);
    }

    menu.onclick = function() {
        content.style.display = content.style.display == 'none' ? 'block' : 'none';
    }
}