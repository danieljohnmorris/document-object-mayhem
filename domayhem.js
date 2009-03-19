function updateSetting(key, value) {
	glow.dom.get("#" + key).html(value);
}

function log(message) {
    glow.dom.get("#log").prepend("<div>" + message + "</div>");
}