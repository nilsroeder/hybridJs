/**
 * @namespace
 * 
 * This module handles the viewport and sprite movement and the consequences.
 * It performes a image (or pixel) collision detection and calls
 * the respective sprite's impact and damage functions.
 * It also handles sprite destruction and the case when a sprite leaves the game border, 
 * i.e. removal from the game.
 */
function hybridMove() {
	// viewport
	var screen        = null;
	// game border for sprite removal
	var border        = null;
	// image or pixel collision detection
	var pixelaccurate = null;
	
	/**
	 * @private
	 * Moves all active sprites
	 */
	var moveSprites = function() {
		var sprites = resourceManager.getSpriteList();
		if( sprites.length > 0 ) {
			$.each(sprites, function(index, sprite){
				if(sprite.getActive() === true ){
					sprite.move();
					var position = sprite.getPosition();
					var width    = sprite.getDimension()[0];
					var height   = sprite.getDimension()[1];
					// check what kind of border the sprite can't cross
					if( border === "screen" ){
						if( (position[0]+width < screen.getPosition()[0]) 
						|| (position[1]+height < screen.getPosition()[1])
						|| (position[0] > screen.getPosition()[0]+screen.getDimension()[0])
						|| (position[1] > screen.getPosition()[1]+screen.getDimension()[1]) ) {
							sprite.setInactive();
						}
					}
					else if( border === "map" ){
						if( (position[0]+width < 0) 
						|| (position[1]+height < 0)
						|| (position[0] > screen.getDimension()[0] * screen.getGameDimension()[0])
						|| (position[1] > screen.getDimension()[1] * screen.getGameDimension()[1]) ) {
							sprite.setInactive();
						}
					}
				}
			});
		}
	};
	/**
	 * @private
	 * Checks for image collisions and calls effect functions
	 */
	var checkCollision = function() {
		var sprites = resourceManager.getSpriteList();
    	$.each(sprites, function(indexA, spriteA){
    		$.each(sprites, function(indexB, spriteB){
    			// avoid double colliding by 'removing' indexA from B List with 'greater' check
    			if( (indexA > indexB) 
    				// avoid self-collisions
    				&& (spriteA.getId() !== spriteB.getId())
    				// avoid collisions with already 'dead' sprites (vitality = 0)
    				&& (spriteA.getActive() === true)
    				&& (spriteB.getActive() === true)
    				&& (spriteA.getVitality()[0] > 0)
    				&& (spriteB.getVitality()[0] > 0) )
    			{
    	            // sprite images collision check
        			if( checkCollisionBox(spriteA, spriteB) ) {
        				var posA = [spriteA.getPosition()[0], spriteA.getPosition()[1]];
        	            var dimA = [spriteA.getDimension()[0], spriteA.getDimension()[1]];
        	            var posB = [spriteB.getPosition()[0], spriteB.getPosition()[1]];
        	            var dimB = [spriteB.getDimension()[0], spriteB.getDimension()[1]];
        				var collided = false;
        				// optionally use pixel accurate collision detection
        				if( pixelaccurate ){
        					var srcxA;
        					var srcxB;
        					var srcyA;
        					var srcyB;
        					// get individual x overlap for each image
        					if(posB[0] > posA[0]){
        						srcxA = posB[0] - posA[0];
        						srcxB = 0;
        					}
        					else{
        						srcxA = 0;
        						srcxB = posA[0] - posB[0];
        					}
        					// get individual y overlap for each image
        					if(posB[1] > posA[1]){
        						srcyA = posB[1] - posA[1];
        						srcyB = 0;
        					}
        					else{
        						srcyA = 0;
        						srcyB = posA[1] - posB[1];
        					}
        					// distance between the highest start and the lowest end coordinate gives the overlap dimension
        					var width  = Math.abs(Math.max(posA[0], posB[0]) - Math.min(posA[0]+dimA[0], posB[0]+dimB[0]));
        					var height = Math.abs(Math.max(posA[1], posB[1]) - Math.min(posA[1]+dimA[1], posB[1]+dimB[1]));
        					collided = checkCollisionPixel(spriteA, spriteB, srcxA, srcyA, srcxB, srcyB, width, height);
        				}
        				// collision effects
        				if( (collided && pixelaccurate) || !pixelaccurate ){
        					// CHECK IMPACT
        					// sprite A and B are both solid, so let them collide
        					if( (spriteA.getMode()[0] > 0) && (spriteB.getMode()[0] > 0) ) {
       							spriteA.impact(spriteB);
       							spriteB.impact(spriteA);
        					}
        					// only different channels can damage each other
        					if( spriteA.getMode()[3] !== spriteB.getMode()[3]) {
        						// CHECK DAMAGE
        						// spriteA takes damage
        						if( spriteA.getMode()[2] > 0 ){
        							//spriteB damages
        							if( spriteB.getMode()[1] > 0 ) {
        								// sprite A receives damage from sprite Bs force
        								spriteA.damage(spriteB);
        							}
        						}
        						// spriteB takes damage
        						if( spriteB.getMode()[2] > 0 ){
        							//spriteA damages
        							if( spriteA.getMode()[1] > 0 ) {
        								// sprite B receives damage from sprite As force
        								spriteB.damage(spriteA);
        							}
        						}
        					}
        				}
        			}
    			}
        	});
    	});
    };
    /**
	 * @private
	 * Compares two overlapping binary image arrays pixel by pixel
	 */
    var checkCollisionBox = function(spriteA, spriteB){
		var posA = [spriteA.getPosition()[0], spriteA.getPosition()[1]];
		var posB = [spriteB.getPosition()[0], spriteB.getPosition()[1]];
        var dimA = [spriteA.getDimension()[0], spriteA.getDimension()[1]];
        var dimB = [spriteB.getDimension()[0], spriteB.getDimension()[1]];
        if( !(posA[0]+dimA[0] < posB[0]) && !(posA[0] > posB[0]+dimB[0]) 
		&& !(posA[1]+dimA[1] < posB[1]) && !(posA[1] > posB[1]+dimB[1]) )
		{
        	return true;
		}
		return false;
	};
	/**
	 * @private
	 * Compares two overlapping binary image arrays pixel by pixel
	 * // FIXME Coordinates have to be respective to the current animation frame
	 */
	var checkCollisionPixel = function(spriteA, spriteB, srcxA, srcyA, srcxB, srcyB, width, height) {
		var dataA     = spriteA.getImageData();
		var dataB     = spriteB.getImageData();
		
		for(var x=0; x<width; x++){
			for(var y=0; y<height; y++){
				// collision if both alpha bytes are above zero 
				if( (dataA[srcxA+x][srcyA+y] > 0) && (dataB[srcxB+x][srcyB+y] > 0) ){
					return true;
				}
			}
		}
		return false;
	};
    /**
     * @private
     * Removed dead sprites from the game
     * TODO possibly delay splicing to avoid game flow hickups
     */
    var cleanupSprites = function() {
    	var spriteList = resourceManager.getSpriteList();
    	// do not use $.each() at this point, as it does not check for length during looping
    	for (var index=0; index<spriteList.length; index++){
    		if( spriteList[index].getActive() === false ){
    			//if( typeof sprite.getAnimation() === "object" ){
    			//	sprite.getAnimation().stop();
    			//}
    			spriteList.splice(index,1);
    		}
    	}
    };

    /** @scope hybridMove */
	return {
		/**
		 * Initializes the module
		 */
		init: function(){
			screen        = resourceManager.getScreen();
			border        = resourceManager.getBorder();
			pixelaccurate = resourceManager.getCollisionAccuracy();
		},
		/**
		 * Compares two overlapping binary image arrays pixel by pixel
		 * // FIXME Coordinates have to be respective to the current animation frame
		 */
		pixelCollision: checkCollisionPixel,
		/**
		 * Compares two overlapping binary image arrays pixel by pixel
		 */
		boxCollision: checkCollisionBox,
		/**
		 * Computes the move within a single game frame, i.e.
		 * Viewport scrolling, sprite movement, collision detection and 'dead' sprite removal
		 */
		moveFrame: function() {
			screen.move();
			moveSprites();
			checkCollision();
			cleanupSprites();
		}
	};
};
