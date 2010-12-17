/**
 * @namespace
 * 
 * This module handles the placement of background tiles.
 * A game map can be made out of an arbitrary number of tiles
 * which all have to have the same size as the viewport.
 * Game map coordinates are calculated in tiles starting at [0,0],
 * e.g. a tile at 3rd column, 4th row would have coordinate [2,3].
 */
function hybridTile() {
	// absolute tile position in "tiles"
	var position  = [0, 0];
	// tile scrolling velocity. Overwrites viewport velocity
	var velocity  = [0, 0];
	// tile image string
	var image     = '';
	// tile id. Id [0] is reserved for the void tile
	var id        = 0;
	// ?
	var active    = false;
	// loading flag to indicate whether or not image is loaded
	var ready     = false;

	/** @scope hybridTile */
	return {
		/**
		 * To be used by the loader to indicate that
		 * the image is finished loading
		 */
		setReady: function(){
			ready = true;
		},
		/**
		 * Returns true if the image is loaded, false otherwise
		 */
		getReady: function(){
			return ready;
		},
		/**
		 * Sets the tile id
		 * @param val The tile id (int)
		 */
		setId: function(val) {
			id = parseInt(val, 10);
		},
		/**
		 * Returns the tile's id (int)
		 */
		getId: function() {
			return id;
		},
		/**
		 * ?
		 */
		isActive: function() {
			return active;
		},
		/**
		 * ?
		 */
		// TODO isn't this obsolete
		setActive: function(flag) {
			active = flag;
		},
		/**
		 * Set the tile position
		 * @param xpos Horizontal position
		 * @param ypos Vertical position
		 */
		setPosition: function(xpos, ypos) {
			position[0] = parseInt(xpos, 10);
			position[1] = parseInt(ypos, 10);
		},
		/**
		 * Returns the tile position as array in form [xpos, ypos]
		 */
		getPosition: function() {
			return position;
		},
		/**
		 * Sets the tile scrolling velocity.
		 * This temporarily overwrites the viewport scroll velocity
		 * @param xvel Horizontal speed
		 * @param yvel Vertical speed
		 */
		setVelocity: function(xvel, yvel) {
			velocity[0] = parseInt(xvel, 10);
			velocity[1] = parseInt(yvel, 10);
		},
		/**
		 * Return the tile's scrolling velocity as array in form [xvel, yvel]
		 */
		getVelocity: function() {
			return velocity;
		},
		/**
		 * Sets the tile's image
		 * @param val The image
		 */
		//TODO image as Image() or string?
		setImage: function(val) {
			image = val;
		},
		/**
		 * Returns the tile's image
		 */
		getImage: function() {
			return image;
		}
	};
};
