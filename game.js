function Game(turns, players, turnInterval, actionInterval, varience){ 
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

	this.nextTurn = function() {
        this.currentTurn++;
    }

	this.totalPlayers = function() {
	    return players.length;
    }
  
	this.activePlayers = function() {
	    var deadPlayers = 0;
	    this.players.each(function() {
		    //if (glow.dom.get(this.toDom).hasClass("dead"))
		    if (glow.dom.get(this).hasClass("dead"))
		        deadPlayers++;
		});
	    return this.totalPlayers() - deadPlayers;
    }

    this.hasEnded = function() {
        if (this.currentTurn <= this.totalTurns) {
            return false;
        } else {
            return true;
        }        
    }

    this.doTurn = function() {
        if (this.hasEnded()) {
            clearInterval(this.tick);
			this.end();
        } else {
            updateSetting("game--turn-number", this.currentTurn);
            log("turn #" + this.currentTurn);

    		updateSetting("game--active-players", this.activePlayers());
	        this.nextTurn();
		}
    }

    this.start = function() {
		updateSetting("game--turn-delay", this.turnInterval);
		updateSetting("game--action-delay", this.actionInterval);
		updateSetting("game--varience-percent", this.varience);

        log("game started! (" + this.totalPlayers() + " players)");
		updateSetting("game--total-players", this.totalPlayers());
		updateSetting("game--active-players", this.activePlayers());

		this.tick = window.setInterval(function() { 
	        self.doTurn();
		}, this.turnInterval);
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

   	this.actionInterval = actionInterval ? actionInterval : 100;
   	this.turnInterval = turnInterval ? turnInterval : 600;
    this.totalTurns = turns ? turns : 10;
   	this.currentTurn = 1;
    this.players_dom = players;
    this.players = players;
    this.varience = varience;

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
