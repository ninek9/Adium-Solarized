var htmlID = document.getElementsByTagName("html")[0];
var headID = document.getElementsByTagName("head")[0];

var timeout = null;
var elemsArray = null;

function selectSender(e) {
    e = e || window.event;
    var node = e && (e.target || e.relatedTarget);
    if (!node || node.tagName.toLowerCase() == 'a') return;
    var senderName = null;
    while (!senderName && node) {
        var nodeClass = node.className;
        if (/(^|[\s])message/.test(nodeClass)) {
            var parts = nodeClass.split(" ");
            senderName = parts[parts.length - 1];
        }
        node = node.parentElement;
    }
    if (senderName) {
        deselectAll();
        elemsArray = [];
        var elms = document.getElementsByClassName(senderName);
        for (var i=0; i<elms.length; i++) {
            var elem = elms[i];
            if(elem.offsetTop + elem.offsetHeight >= window.pageYOffset) {
                if(elem.offsetTop > window.pageYOffset + window.innerHeight) {
                    break;
                }
                elemsArray.push(elem);
                elem.className += ' x-hover';
            }
        }
        timeout = setTimeout(deselectAll, 200);
    }
}

function deselectAll() {
    clearTimeout(timeout);
    if (elemsArray) {
        for(var i = 0; i < elemsArray.length; i++) {
            elem = elemsArray[i];
            elem.className = elem.className.replace(' x-hover', '');
        }
        elemsArray = null;
    }
}

function show_header () {
    document.getElementById('wrap').style.opacity = '1';
    document.getElementById('show').style.display = 'none';
    document.getElementById('hide').style.display = '';
}

function hide_header () {
    document.getElementById('wrap').style.opacity = '0';
    document.getElementById('hide').style.display = 'none';
    document.getElementById('show').style.display = '';
}

document.body.addEventListener("mousedown", selectSender, false);

document.documentElement.addEventListener("mouseout", function(e) {
    e = e || window.event;
    if (e && e.relatedTarget == htmlID) {
        deselectAll();
    }
}, false);
