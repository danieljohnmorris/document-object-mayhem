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

    this.init = function() {
        for (var i = 0; i < this.playersDom.length; i++) {
            this.players[i] = new Player(this, this.playersDom[i], varience, playerTotalLife, speechInterval);
            this.players[i].init();
        }
    }
    
	this.nextTurn = function() {
        this.currentTurn++;
    }

	this.totalPlayers = function() {
	    return players.length;
    }
  
	this.alivePlayers = function() {
        var alivePlayers = [];
        for (var i = 0; i < this.players.length; i++) {
            if (!this.players[i].isDead())
                alivePlayers.push(this.players[i]);
        }
	    return alivePlayers;
    }    
	this.alivePlayerCount = function() {
        return this.alivePlayers().length;
    }

    this.otherPlayers = function(player) {
        for (var i = 0; i < this.alivePlayers().length; i++) {
            if (this.alivePlayers()[i].name == player.name)
	            return removeElementFromArray(this.alivePlayers(), i);
        }
    }
    
    this.hasEnded = function() {
        if ((this.currentTurn <= this.totalTurns) && (this.alivePlayerCount() > 1)) {
            return false;
        } else {
            return true;
        }        
    }

    this.doPlayerTurn = function(pl) {
        var player = this.players[pl];
        player.powerUp();
        player.attackRandom(this.otherPlayers(player));
        player.standBy();
    }

    this.clearSpeech = function() {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].clearSay();
        }
    }

    this.doTurn = function() {
        if (this.hasEnded()) {
            clearInterval(this.tick);
			this.end();
        } else {
            update("game--turn-number", this.currentTurn);
            log("*** turn #" + this.currentTurn);
            
            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i];
                if ((player.isDead()) || (this.otherPlayers(player).length == 0))
                    continue;

                this.doPlayerTurn(i);
            }
                		
    		update("game--active-players", this.alivePlayerCount());
	        this.nextTurn();
		}
    }
    
    this.start = function() {
		update("game--turn-delay", this.turnInterval);
		update("game--action-delay", this.actionInterval);
		update("game--speech-delay", speechInterval);
		update("game--varience-percent", this.varience);

        log("*** game started! (" + this.totalPlayers() + " players)");
		update("game--total-players", this.totalPlayers());
		update("game--active-players", this.alivePlayerCount());

		this.tick = window.setInterval(function() { 
	        self.doTurn();
		}, this.turnInterval);
    }

    this.end = function() {
        log("*** game ended!");
        stillAlive = this.alivePlayers();

        if (stillAlive.length < 1) {
            log("*** No one won, everybody died.");
        } else if (stillAlive.length < 2) {
            log("*** Congrats '" + stillAlive[0].name + "', the sole survivor.");
            stillAlive[0].say("I won!");
        } else {
            //find highest life left
            var highScoreIndex = 0;
            for (var i = 1; i < stillAlive.length; i++) {
                if (stillAlive[i].score() > stillAlive[highScoreIndex].score()) {
                    highScoreIndex = i;
                }
            }
            
            log("*** multiple survivors - Congrats '" + stillAlive[highScoreIndex].name + "'.");
            stillAlive[highScoreIndex].say("I won!");
        }
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
    this.players = [];
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
