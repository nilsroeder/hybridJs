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
	var impact0 = function(force){
	};
	/**
	 * Stop falling blocks and change their type, so they can't be controlled as 'blocks' any longer
	 */
	var impact1 = function(force){
		sprite.setVelocity(0, 0);
		
		var group = resourceManager.getSpritesByType('block');
		if( sprite.getType() === 'block' ){
			
			var name = sprite.getName();
			var x    = 0;
			
			//if( force === 2 ){
			if( false ){
				if( name === 'block1' || name === 'block3' ){
					x = 21;
				}
				else if( name === 'block2' || name === 'block4' ){
					x = -21;
				}
				$.each(group, function(index, block){
					block.setPosition(block.getPosition()[0]+x, block.getPosition()[1]);
				});
			}
			else{
				$.each(group, function(index, block){
					block.setName('immovable');
				});
			
				sprite.setType('immovable');
				sprite.impact = impact0;
				sprite.move   = movement0;
				//sprite.setMode([1,0,0,2]);
			}
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