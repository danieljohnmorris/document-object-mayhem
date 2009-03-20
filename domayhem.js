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

function usleep(microseconds) {
    // Delay for a given number of micro seconds  
    // 
    // version: 902.122
    // discuss at: http://phpjs.org/functions/usleep
    // // +   original by: Brett Zamir
    // %        note 1: For study purposes. Current implementation could lock up the user's browser.
    // %        note 1: Consider using setTimeout() instead.
    // %        note 2: Note that this function's argument, contrary to the PHP name, does not
    // %        note 2: start being significant until 1,000 microseconds (1 millisecond)
    // *     example 1: usleep(2000000); // delays for 2 seconds
    // *     returns 1: true
    var start = new Date().getTime();
    while (new Date() < (start + microseconds/1000));
    return true;
}
