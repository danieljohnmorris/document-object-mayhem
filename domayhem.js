function update(key, value, dom) {
    var parent = "";
    if (dom)
        parent = "#" + dom.id + " ";
	glow.dom.get(parent + "#" + key).html(value);
}

function log(message) {
    glow.dom.get("#log").prepend("<div>" + message + "</div>");
}

function rand( min, max ) {
    // Returns a random number 
    //
    // version: 810.1317
    // discuss at: http://phpjs.org/functions/rand
    // +   original by: Leslie Hoare
    // +   bugfixed by: Onno Marsman
    // *     example 1: rand(1, 1);
    // *     returns 1: 1
    var argc = arguments.length;
    if (argc == 0) {
        min = 0;
        max = 2147483647;
    } else if (argc == 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeElementFromArray(arr,i) {
    var tempArr = [];
    tempArr = tempArr.concat(arr);
    tempArr.splice(i, 1);
    return tempArr;
}

function debugPlayers(players) {
    var o = "";
    for (var i = 0; i < players.length; i++) {
        o += players[i].name + " ";
    }
    log("debug> " + o);
}

function pause(numMilliseconds) { 
    var now, goalTime; 
    now = new Date(); 
    goalTime = now.getTime() + numMilliseconds; 
    while (now.getTime() < goalTime) { 
        now = new Date(); 
    } 
} 