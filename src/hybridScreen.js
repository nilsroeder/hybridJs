/**
 * @namespace
 * 
 * This module is responsible for the viewport through which the player
 * sees the game. The game map can be many times bigger than the viewport.
 * The viewport is then "moved" over the map (i.e. background scrolling).
 */
function hybridScreen() {
    var gamesize    = [0, 0],   // width and height of the screen in 'maps'
        dimension   = [0, 0],   // width and height of the screen in pixel
        position    = [0, 0],   // screen position within the map
        velocity    = [0, 0],   // viewport scroll velocity
        context,                // html5 canvas 2D context
        WIDTH, HEIGHT, X, Y;
    WIDTH = X = 0;
    HEIGHT = Y = 1;
	       
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
			gamesize[WIDTH] = parseInt(width, 10);
			gamesize[HEIGHT] = parseInt(height, 10);
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
			dimension[WIDTH] = parseInt(width, 10);
			dimension[HEIGHT] = parseInt(height, 10);
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
			if( xpos > (gamesize[WIDTH] * dimension[WIDTH]) ){ xpos = (gamesize[WIDTH] * dimension[WIDTH])-1; }
			if( ypos > (gamesize[HEIGHT] * dimension[HEIGHT]) ){ ypos = (gamesize[HEIGHT] * dimension[HEIGHT])-1; }
			
			position[X] = parseInt(xpos, 10);
			position[Y] = parseInt(ypos, 10);
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
			velocity[X] = parseInt(xvel, 10);
			velocity[Y] = parseInt(yvel, 10);
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
			this.setPosition(position[X] + velocity[X], position[Y] + velocity[Y]);
		}
	};
};
