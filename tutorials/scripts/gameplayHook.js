/**
 * @namespace
 * Sprite Gameplay Behaviour
 */
function hybridSpriteGameplay(spr) {
	var sprite = spr;
	
	var created0 = function(){
	};
	var destroyed0 = function(){
	};
	var movement0 = function(){
	};
	var impact0 = function(force){
	};
	var damage0 = function(force){
	};
	/** @scope hybridSpriteGameplay */
	return{
		/**
		 * Function called when sprite is created for the first time
		 */
		getCreated: function(val){
			switch(val){
				case 0: return created0; break;
				default: return created0;
			}
		},
		/**
		 * Function called when a sprite is destroyed, i.e removed from game
		 */
		getDestroyed: function(val){
			switch(val){
				case 0: return destroyed0; break;
				default: return destroyed0;
			}
		},
		/**
		 * Function called when a sprite is moved by the move step within the gameloop
		 */
		getMovement: function(val){
			switch(val){
				case 0: return movement0; break;
				default: return movement0;
			}
		},
		/**
		 * Function called when a sprite hits another sprite
		 */
		getImpact: function(val){
			switch(val){
				case 0: return impact0; break;
				default: return impact0;
			}
		},
		/**
		 * Function called when a sprite receives damage
		 */
		getDamage: function(val){
			switch(val){
				case 0: return damage0; break;
				default: return damage0;
			}
		}
	};
};
