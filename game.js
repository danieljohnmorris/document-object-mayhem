function Game(turns, players){ 
	//this.constructor.current_turn++;

	// ************************************************************************ 
	// PRIVATE VARIABLES AND FUNCTIONS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	//create a global [within this scope] reference to this
	var self = this;
    
	//var alive=true, age=1;
	//var maxAge=70+Math.round(Math.random()*15)+Math.round(Math.random()*15);
	//var myName=n?n:"John Doe";
	//var weight=1;

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
		}, 1000);
    }

    this.end = function() {
        log("game ended!");
	}
	
	//this.toString=this.getName=function(){ return myName } 

	//this.eat=function(){ 
	//	if (makeOlder()){ 
	//		this.dirtFactor++;
	//		return weight*=3;
	//	} else alert(myName+" can't eat, he's dead!");
	//} 
	//this.exercise=function(){ 
	//	if (makeOlder()){ 
	//		this.dirtFactor++;
	//		return weight/=2;
	//	} else alert(myName+" can't exercise, he's dead!");
	//} 
	//this.weigh=function(){ return weight } 
	//this.getRace=function(){ return race } 
	//this.getAge=function(){ return age } 
	//this.muchTimePasses=function(){ age+=50; this.dirtFactor=10; } 


	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 

    this.total_turns = turns ? turns : 10;
    this.current_turn = 1;
    this.players = players;
    this.tick = null;

	//this.clothing="nothing/naked";
	//this.dirtFactor=0;
};


// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

//Person.prototype.beCool = function(){ this.clothing="khakis and black shirt" } 
//Person.prototype.shower = function(){ this.dirtFactor=2 } 
//Person.prototype.showLegs = function(){ alert(this+" has "+this.legs+" legs") } 
//Person.prototype.amputate = function(){ this.legs-- } 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 

//Person.prototype.legs=2;


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

//Game.current_turn = 0;
