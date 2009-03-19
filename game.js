function Game(turns, players, interval){ 
	//this.constructor.awesomeness++;

	// ************************************************************************ 
	// PRIVATE VARIABLES AND FUNCTIONS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	//create a global [within this scope] reference to this
	var self = this;

	//var myName=n?n:"John Doe";
	//function makeOlder(){ return alive = (++age <= maxAge) } 

	// ************************************************************************ 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 

	this.next_turn = function() {
        this.current_turn++;
    }

	this.total_players = function() {
	    return players.length;
    }
  
	this.active_players = function() {
	    var dead_players = 0;
	    players.each(function() {
		    if (glow.dom.get(this).hasClass("dead"))
		        dead_players++;
		});
	    return this.total_players() - dead_players;
    }

    this.has_ended = function() {
        if (this.current_turn <= this.total_turns) {
            return false;
        } else {
            return true;
        }        
    }

    this.do_turn = function() {
        if (this.has_ended()) {
            clearInterval(this.tick);
			this.end();
        } else {
            log("turn #" + this.current_turn);
	        this.next_turn();
		}
    }

    this.start = function() {
        log("game started!");
		this.tick = window.setInterval(function() { 
	        self.do_turn();
		}, this.turn_interval);
    }

    this.end = function() {
        log("game ended!");
	}
	
	//this.toString=this.getName=function(){ return myName } 

	//this.eat=function(){ 
	//} 

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 

   	this.turn_interval = interval ? interval : 500;
    this.total_turns = turns ? turns : 10;
   	this.current_turn = 1;
    this.players = players;
    this.tick = null;

	//this.attribute = "some-default";
};

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

//Thing.prototype.beAwesome = function(){ this.attribute = "AWESOME!" } 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 

//Thing.prototype.legs = 2;


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

//Thing.awesomeness = 0;