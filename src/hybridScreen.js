/**
 * @namespace
 * 
 * This module is responsible for the viewport through which the player
 * sees the game. The game map can be many times bigger than the viewport.
 * The viewport is then "moved" over the map (i.e. background scrolling).
 */
function hybridScreen() {
	// width and height of the screen in 'maps'
	var gamesize  = [0 ,0];
	// width and height of the screen in pixel
	var dimension = [0, 0];
	// screen position within the map
	var position  = [0, 0];
	// viewport scroll velocity
	var velocity  = [0, 0];
	// html5 canvas 2D context
	var context;
	       
	/** @scope hybridScreen */
	return {
		/**
		 * empties the engine's DOM root element
		 */	
		init: function() {
			$("#hybridRoot").empty();
		},
		/**
		 * Sets the canvas context
		 * @param ctx The html5 2D canvas context
		 */
		setContext: function(ctx) {
			context = ctx;
		},
		/**
		 * Returns the (hopefully previously initialzed) canvas context
		 */
		getContext: function() {
			return context;
		},
		/**
		 * Sets the game dimension, i.e. width and height in "maps"
		 * @param width Number of horizontal maps
		 * @param height Number of vertical maps
		 */ 
		setGameDimension: function(width, height) {
			gamesize[0] = parseInt(width, 10);
			gamesize[1] = parseInt(height, 10);
		},
		/**
		 * Returns the number of horizontal and vertical maps
		 * as array in form [width, height]
		 */
		getGameDimension: function() {
			return gamesize;
		},
		/**
		 * Sets the viewport dimension, i.e. width and height in pixel
		 * @param width Width in pixel
		 * @param height Height in pixel
		 */
		setDimension: function(width, height) {
			dimension[0] = parseInt(width, 10);
			dimension[1] = parseInt(height, 10);
		},
		/**
		 * Returns the viewport dimension in pixel
		 * as array in form [width, height]
		 */
		getDimension: function() {
			return dimension;
		},
		/**
		 * Sets the viewport position within a map in pixel.
		 * @param xpos The x-axis position
		 * @param ypos The y-axis position
		 */
		setPosition: function(xpos, ypos) {
			// min check
			if( xpos < 0 ){ xpos = 0; }
			if( ypos < 0 ){ ypos = 0; }
			// max check
			if( xpos > (gamesize[0] * dimension[0]) ){ xpos = (gamesize[0] * dimension[0])-1; }
			if( ypos > (gamesize[1] * dimension[1]) ){ ypos = (gamesize[1] * dimension[1])-1; }
			
			position[0] = parseInt(xpos, 10);
			position[1] = parseInt(ypos, 10);
		},
		/**
		 * Returns the viewport position within a map in pixel. Array in form [xpos, ypos]
		 */
		getPosition: function() {
			return position;
		},
		/**
		 * Sets the viewport velocity, i.e. scrolling speed and direction
		 * @param xvel X-axis velocity
		 * @param yvel Y-axis velocity
		 */
		setVelocity: function(xvel, yvel) {
			velocity[0] = parseInt(xvel, 10);
			velocity[1] = parseInt(yvel, 10);
		},
		/**
		 * Returns the viewport velocity as array in form [xvel, yvel]
		 */
		getVelocity: function() {
			return velocity;
		},
		/**
		 * Moves the viewport position according to its velocity
		 */
		move: function() {
			this.setPosition(position[0]+velocity[0], position[1]+velocity[1]);
		}
	};
};
