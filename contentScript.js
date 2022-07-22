setTimeout(function() {
    var input = document.getElementsByName('q')[0];
    if(input.value.indexOf(' ') == -1){
        input.value += ' ';
    }
    input.setSelectionRange(input.value.indexOf(' ') + 1, input.value.length);
    input.focus();
}, 50);