function Player(domObject, varience, totalLife, speechInterval){ 
    
	// ************************************************************************ 
	// PRIVATE VARIABLES AND FUNCTIONS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	
	//create a global [within this scope] reference to this
	var self = this;
	
	// ************************************************************************ 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 

	this.log = function(message) {
	    log(this.name + "> " + message);
    }
    
	this.init = function() {
	    update("player--name", this.name, this.toDom);
	    update("player--life-total", this.totalLife, this.toDom);
        this.say("I'm alive!");
	    this.updateDebug();
	    this.log("was born ^_^");
    }

	this.updateDebug = function() {
	    update("player--dead", this.isDead(), this.toDom);
	    update("player--life-left", this.lifeLeft, this.toDom);
	    update("player--life-percent", this.lifePercent(), this.toDom);
    }

	this.die = function() {
	    this.lifeLeft = 0;
	    
	    this.updateDebug();
	    this.log("died X_X");
        this.say("I die!");
    }
    
    this.hurt = function(damage) {
	    this.lifeLeft -= damage;

	    this.updateDebug();
	    this.log("got hurt (" + damage + "dmg) >_<");
	    if (this.isDead()) {
	        this.die();
	    } else {
            this.say("Ouch!");
	    }
    }
	
	this.attack = function(victim, damage) {
        this.sayBattleCry();
        victim.hurt(damage);
	    this.log("attacks '" + victim.name + "' (" + damage + "dmg) ^_^");
    }
	
	this.isDead = function() {
	    if (this.lifeLeft <= 0) {
	        return true;
	    } else {
	        return false;
	    }
    }

    this.sayBattleCry = function() {
        this.say(this.battleCry);
    }
    
    this.say = function(message) {
        clearInterval(this.speaking);
        update("player--say", message, this.toDom);
	    this.log("said \"" + message + "\" ^O^");
        
		this.speaking = window.setInterval(function() { 
	        self.clearSay();
		}, this.speechInterval);
    }

    this.clearSay = function() {
        update("player--say", "", this.toDom);
        clearInterval(this.speaking);
    }

    this.lifePercent = function() {
        return this.lifeLeft / this.totalLife * 100;
    }
	
	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 

   	this.name = domObject ? domObject.id : "Untitled";
   	this.battleCry = glow.dom.get("#" + this.name + " #player--battlecry").html();
   	this.toDom = domObject ? domObject : null;
   	this.totalLife = totalLife ? totalLife : 100
   	this.lifeLeft = totalLife ? totalLife : 100
   	this.varience = varience ? varience : 10;  //%
   	this.speechInterval = speechInterval ? speechInterval : 300
};

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE 
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

