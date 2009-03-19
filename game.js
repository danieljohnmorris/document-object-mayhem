function Game(players, turns, turnInterval, actionInterval, speechInterval, varience, playerTotalLife){ 
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
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].isDead())
	            deadPlayers++;
        }
	    return this.totalPlayers() - deadPlayers;
    }

    this.otherPlayers = function(player) {
        return new Array();
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
            update("game--turn-number", this.currentTurn);
            log("turn #" + this.currentTurn + " <br/>");
            
            this.players[this.currentTurn-1].sayBattleCry();
            this.players[this.currentTurn-1].hurt(rand(0, 140));
            
    		update("game--active-players", this.activePlayers());
	        this.nextTurn();
		}
    }

    this.init = function() {
        for (var i = 0; i < this.playersDom.length; i++) {
            this.players[i] = new Player(this.playersDom[i], varience, playerTotalLife);
            this.players[i].init();
        }
    }
    
    this.start = function() {
		update("game--turn-delay", this.turnInterval);
		update("game--action-delay", this.actionInterval);
		update("game--varience-percent", this.varience);

        log("game started! (" + this.totalPlayers() + " players)");
		update("game--total-players", this.totalPlayers());
		update("game--active-players", this.activePlayers());

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
    this.playersDom = players;
    this.players = new Array();
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
