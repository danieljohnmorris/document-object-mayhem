function Player(domObject, varience, totalLife){ 
    
	// ************************************************************************ 
	// PRIVATE VARIABLES AND FUNCTIONS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	
	this.init = function() {
	    updateSetting("player--name", this.name, this.toDom);
	    updateSetting("player--life-total", this.totalLife, this.toDom);
	    this.updateDebug();
    }

	this.updateDebug = function() {
	    updateSetting("player--dead", this.isDead(), this.toDom);
	    updateSetting("player--life-left", this.lifeLeft, this.toDom);
	    updateSetting("player--life-percent", this.lifePercent(), this.toDom);
    }

	this.kill = function() {
	    this.lifeLeft = 0;
	    this.updateDebug();
    }
    
	this.hurt = function(damage) {
	    this.lifeLeft -= damage;
	    this.updateDebug();
    }

	this.isDead = function() {
	    if (this.lifeLeft <= 0) {
	        return true;
	    } else {
	        return false;
	    }
    }

    this.roar = function() {
        alert("Roar!");
    }

    this.lifePercent = function() {
        return this.lifeLeft / this.totalLife * 100;
    }

	// ************************************************************************ 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 

	
	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 

   	this.name = domObject ? domObject.id : "Untitled";
   	this.toDom = domObject ? domObject : null;
   	this.totalLife = totalLife ? totalLife : 100
   	this.lifeLeft = totalLife ? totalLife : 100
   	this.varience = varience ? varience : 10;           //%
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

