window.onload = function () {
    var lis =  document.querySelectorAll(".tabs > ul > li");
    for(var i=0; i<lis.length; i++){
        lis[i].onclick = (function(li){
            return function(){
                clearSelected(lis);

                if(!(li.classList.contains('selected'))){
                    li.classList.add('selected');
                }
                //call Ajax to get JSON for data, update contents area
                //use innerHTML
                //TODO
            }
        })(lis[i]);
    }
}

function clearSelected(lis) {
    for(var i=0; i<lis.length; i++){
        lis[i].classList.remove('selected');
    }
}