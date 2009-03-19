function updateSetting(key, value, dom) {
    var parent = "";
    if (dom)
        parent = "#" + dom.id + " ";
	glow.dom.get(parent + "#" + key).html(value);
}

function log(message) {
    glow.dom.get("#log").prepend("<div>" + message + "</div>");
}