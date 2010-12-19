/**
 * @namespace
 * Sprite Gameplay Behaviour
 */
function hybridSpriteGameplay(spr) {
	var sprite = spr;
	
	/**
	 * do nothing, needed
	 */
	var movement0 = function(){
	};
	/**
	 * Repetitive horizontal movement of the 'bar' 
	 */
	var movement1 = function(){
		sprite.setPosition(sprite.getPosition()[0]+sprite.getVelocity()[0], sprite.getPosition()[1]);
		if(sprite.getPosition()[0] > 354){
			sprite.setPosition(38, sprite.getPosition()[1]);
		}
	};
	/**
	 * Simple velocity movement for the blocks
	 */
	var movement2 = function(){
		sprite.setPosition(sprite.getPosition()[0]+sprite.getVelocity()[0], sprite.getPosition()[1]+sprite.getVelocity()[1]);
	};
	/**
	 * do nothing, needed
	 */
	var impact0 = function(other){
	};
	/**
	 * Stop falling blocks and change their type, so they can't be controlled as 'blocks' any longer
	 */
	var impact1 = function(other){
		var stop  = false;
		var group = resourceManager.getSpritesByType('block');
		
		if( other.getName() === 'floor' ){
			stop = true;
		}
		else {
			var ydiff = other.getPosition()[1] - sprite.getPosition()[1];
			// collision from the side, undo move don't stop
			if( ydiff < 19){
				var xdiff = 0;
				// left side
				if( sprite.getName() === 'block1' || sprite.getName() === 'block3'){
					xdiff = 21;
				}
				// right side
				else if( sprite.getName() === 'block2' || sprite.getName() === 'block4'){
					xdiff = -21;
				}
				// undo last move
				$.each(group, function(index, block){
					block.setPosition(block.getPosition()[0]+xdiff, block.getPosition()[1]);
				});
			}
			// landed on top of another block, stop
			else{
				stop = true;
			}
		}
		
		if( stop ){
			$.each(group, function(index, block){
				block.setName('immovable');
			});
		
			sprite.setVelocity(0, 0);
			sprite.setType('immovable');
			sprite.impact = impact0;
			sprite.move   = movement0;
		}
	};
	/** @scope hybridSpriteGameplay */
	return{
		/**
		 * Function called when sprite is created for the first time
		 */
		getCreated: function(val){},
		/**
		 * Function called when a sprite is destroyed, i.e removed from game
		 */
		getDestroyed: function(val){},
		/**
		 * Function called when a sprite is moved by the move step within the gameloop
		 */
		getMovement: function(val){
			switch(val){
				case 1: return movement1; break;
				case 2: return movement2; break;
			}
		},
		/**
		 * Function called when a sprite hits another sprite
		 */
		getImpact: function(val){
			switch(val){
				case 1: return impact1; break;
			}
		},
		/**
		 * Function called when a sprite receives damage
		 */
		getDamage: function(val){}
	};
};