/**
 * @namespace
 * 
 * The sprite object represents an active sprite during the game.
 * All active sprites are handled in an array by the resource manager.
 * They are generated during the game from the prototype templates through
 * events. They are also removed from the game whenever they 'die', i.e. the
 * number of active sprites always changes.
 */
function hybridSprite() {
	// sprite position [x-axis, y-axis]
	var position  = [0, 0];
	// width and height of the displayed image (including animation corrections)
	var dimension = [0, 0];
	// sprite velocity [x-vel , y-vel]
	var velocity  = [0,0 ];
	// image url
	var image;
	// holds a binary representation of the image pixels
	var imageData;
	// active sprite id
	var id        = 0;
	// sprite name inherited from event. Default empty
	var name      = "";
	// sprite type inherited from event. Default "sprite"
	var type      = 'sprite';
	// z-index. default 1
	var layer     = 1;
	// animation object [optional]
    var animation = null;
    // sprite vitality [energy, lifes]
    var vitality  = [1, 1];
    // sprite collision mode [substance, attack, defense, channel]
    var mode      = [3, 3, 3, 3];
    // flag indicating whether or not this sprite is still active
    var active    = true;
    
    /** @scope hybridSprite */
    return{
    	/**
    	 * Sets the z-index 
    	 * @param val z-index
    	 */
    	setLayer: function(val) {
	    	layer = parseInt(val, 10);
		},
		/**
		 * Returns the z-index
		 * @return int
		 */
		getLayer: function() {
			return layer;
		},
		/**
		 * Sets the image
		 * @param val Image()
		 */
		setImage: function(val) {
			image = val;
		},
		/**
		 * Returns image
		 * @return image
		 */
		getImage: function() {
			return image;
		},
		/**
		 * Sets the image data (binary or alpha channel)
		 * @param imgD image data array
		 */
		setImageData: function(imgD){
			imageData = imgD;
		},
		/**
		 * Returns the binary or alpha channel image data
		 * @return array
		 */
		getImageData: function(){
			return imageData;
		},
		/**
		 * Sets ID
		 * @param val ID
		 */
		setId: function(val) {
			id = parseInt(val, 10);
		},
		/**
		 * Returns ID
		 * @return int
		 */
		getId: function() {
			return id;
		},
		/**
		 * Sets name
		 * @param val Name
		 */
		setName: function(val) {
			name = val;
		},
		/**
		 * Returns name
		 * @return string
		 */
		getName: function() {
			return name;
		},
		/**
		 * Sets type
		 * @param val Type
		 */
		setType: function(val) {
			type = val;
		},
		/**
		 * Returns type
		 * @return string
		 */
		getType: function() {
			return type;
		},
		/**
		 * Sets position
		 * @param xpos X-axis position
		 * @param ypos Y-axis position
		 */
		setPosition: function(xpos, ypos) {
			position[0] = parseInt(xpos, 10);
			position[1] = parseInt(ypos, 10);
		},
		/**
		 * Returns position
		 * @return array
		 */
		getPosition: function() {
			return position;
		},
		/**
		 * Sets image width and height
		 * @param width Width
		 * @param height Height
		 */
		setDimension: function(width, height) {
			dimension[0] = parseInt(width, 10);
			dimension[1] = parseInt(height, 10);
		},
		/**
		 * Returns image width and height
		 * @return array
		 */
		getDimension: function() {
			return dimension;
		},
		/**
		 * Sets velocity
		 * @param xvel Horizontal velocity
		 * @param yvel Vertical velocity
		 */
		setVelocity: function(xvel, yvel) {
			velocity[0] = parseInt(xvel, 10);
			velocity[1] = parseInt(yvel, 10);
		},
		/**
		 * Returns velocity
		 * @return array
		 */
		getVelocity: function() {
			return velocity;
		},
		/**
		 * Sets vitality
		 * @param energy Energy
		 * @param life Lifes
		 */
		setVitality: function(energy, life) {
			vitality[0] = parseInt(energy, 10);
			vitality[1] = parseInt(life, 10);
		},
		/**
		 * Returns vitality
		 * @return array
		 */
		getVitality: function() {
			return vitality;
		},
		/**
		 * Sets mode. Examples: 
		 * Non-lethal wall [1,0,0,0].
		 * Bullet [1,1,1,0].
		 * Ghost [0,0,0,0].
		 * @param impact Impact behaviour. 0=no impact, 1=impact
		 * @param force Amount of damage an impact with this sprite causes
		 * @param damage Damage behaviour. 0=invincible, 1=destructible
		 * @param channel Sprites on the same channel can't collide
		 */
		setMode: function(impact, force, damage, channel) {
			mode[0] = parseInt(impact, 10);
			mode[1] = parseInt(force, 10);
			mode[2] = parseInt(damage, 10);
			mode[3] = parseInt(channel, 10);
		},
		/**
		 * Returns mode
		 * @return array
		 */
		getMode: function() {
			return mode;
		},
		/**
		 * Sets animation object
		 * @param val Animation object
		 */
		setAnimation: function(val) {
			animation = val;
		},
		/**
		 * Returns animation object
		 * @return hybridAnimation
		 */
		getAnimation: function() {
			return animation;
		},
		/**
		 * Sets sprite inactive
		 */
		setInactive: function(){
			active = false;
		},
		/**
		 * Returns active indicator
		 * @return boolean
		 */
		getActive: function(){
			return active;
		},
		//======== GAMEPLAY HOOKS ============
		/**
		 * Behaviour hook
		 * To be implemented in gameplay
		 */
		move: function() {
		},
		/**
		 * Impact hook
		 * To be implemented in gameplay
		 */
		impact: function(force){
		},
		/**
		 * Damage hook
		 * To be implemented in gameplay
		 */
		damage: function(force){
		},
		/**
		 * Creation hook
		 * To be implemented in gameplay
		 */
		created: function(){
		},
		/**
		 * Destruction hook
		 * To be implemented in gameplay
		 */
		destroyed: function(){
		}	
    };
};	

/**
 * @namespace
 * 
 * The animation object always belongs to a parent sprite (but is optional).
 * Moves the sprite image containing the animation 'through' the animation window
 * 
 * @param parentId 		Id of the sprite the animation belongs to
 * @param totalWidth 	The width of the sprite image
 * @param totalHeight 	The height of the sprite image
 */
function hybridAnimation(parentId, totalWidth, totalHeight) {
	// id of parent sprite
	var id         = parentId;
	// image width
    var width      = totalWidth;
    // image height
    var height     = totalHeight;
    // frames in animation
    var frames     = 0;
    // rows in animation (i.e. number of animations within image)
    var rows       = 0;
    // delay between frames in milliseconds
    var delay      = 0;
    // current frame
    var frameIndex = 1;
    // current row
    var rowIndex   = 1;
    // animation direction [forward|reverse]. Default "forward".
    var direction  = 'forward';
    // thread Id of the animation cycle
    var runId      = null;
    // number of cycles the animation should be played [-1,0,n]
    var cycles     = 0;
    
    /** @scope hybridAnimation */
    return{
    	/**
    	 * Return id of parent sprite
    	 * @return int
    	 */
    	getId: function(){
			return id;
		},
		/**
		 * Set number of frames in animation
		 * @param val Number of frames
		 */
		setFrames: function(val) {
			frames = parseInt(val, 10);
		},
		/**
		 * Return number of frames in animation
		 * @return int
		 */
		getFrames: function() {
			return frames;
		},
		/**
		 * Set number of animations
		 * @param val Number of animations
		 */
		setRows: function(val) {
			rows = parseInt(val, 10);
		},
		/**
		 * Return number of animations
		 * @return int
		 */
		getRows: function() {
			return rows;
		},
		/**
		 * Set animation speed (in milliseconds between frames)
		 * @param val Milliseconds delay
		 */
		setDelay: function(val) {
			delay = parseInt(val, 10);
		},
		/**
		 * Return animation speed
		 * @return int
		 */
		getDelay: function() {
			return delay;
		},
		/**
		 * Sets animation direction
		 * [forward | reverse]
		 * @param val Direction
		 */
		setDirection: function(val) {
			direction = val;
		},
		/**
		 * Returns animation direction
		 * @return string
		 */
		getDirection: function() {
			return direction;
		},
		/**
		 * Returns width and height of single frame
		 * @return array
		 */
		getDimension: function() {
			var dimension = [parseInt(width/frames, 10), parseInt(height/rows, 10)];
			return dimension;
		},
		/**
		 * Sets current animation index
		 * @param frame Current frame
		 * @param row Current row
		 */
		setIndex: function(frame, row){
			frameIndex = frame;
			rowIndex   = row;
		},
		/**
		 * Return current animation index
		 * @return array
		 */
		getIndex: function(){
			return [frameIndex, rowIndex];
		},
		/**
		 * Starts animation loop
		 * @param frameStart Pointer to frame to start from
		 * @param rowstart Pointer to animation row
		 * @param directionStart Animation direction
		 * @param loop Number of times this animation is looped. Values smaller zero mean infinitely.
		 * @param callback Callback function called after each animation cycle
		 */
		start: function(frameStart, rowStart, directionStart, loop, callback) {
			if( runId !== null ){
				this.stop();
			}
			// set optional frame start
			frameIndex = 1;
			if(frameStart > 0) {
				frameIndex = frameStart;
			}
			// set optional row start
			rowIndex = 1;
			if(rowStart > 0) {
				rowIndex = rowStart;
			}
			// catch out-of-bound values
			if(frameIndex > frames ) {
				frameIndex = frames;
			}
			if(rowIndex > rows ) {
				rowIndex = rows;
			}
			direction = 'forward';
			// set optional animation direction
			if(directionStart !== null) {
				direction = directionStart;
			}
			// set optional animation cycle length
			cycles = -1;
			if(loop !== null) {
				cycles = loop;
			}
			// start animation cycle if there is an animation (i.e. more than 1 frame)
			if( frames > 1 ) {
				var animObj = this;
				runId = setInterval(function(){
					// reverse animation
					if( direction === 'reverse'){
						frameIndex--;
						// one cycle is over
						if(frameIndex < 0){
							frameIndex = frames;
							if( cycles > 0 ){
								cycles--;
								if (typeof callback === "function") {
									callback();
								}
							}
						}
					}
					// default forward animation
					else{
						frameIndex++;
						// one cycle is over
						if(frameIndex > frames){
							frameIndex = 1;
							if( cycles > 0 ){
								cycles--;
								if (typeof callback === "function") {
									callback();
								}
							}
						}
					}
					// cycles are all done. stop animation
					if( cycles === 0 ){
						animObj.stop();
					}
				}, delay);
			}
		},
		/**
		 * Stops animation
		 */
		stop: function() {
			if( runId !== null) {
				clearInterval(runId);
				runId      = null;
				cycles     = 0;
				frameIndex = 1;
				rowIndex   = 1;
			}
		}
    };
};

/**
 * @namespace
 * 
 * Prototype Objects are loaded before the game starts and serve as templates 
 * to 'generate' active sprites from events during gameplay. They exists for the 
 * lifetime of a level.
 */
function hybridSpritePrototype() {
	// image url
	var image;
	// binary image data
	var imageData;
	// prototype id
	var id        = 0;
	// boolean whether or not sprit has an animation
	var animation = false;
	// number of frames in animation
    var animationFrames = 0;
    // number of rows in animation
    var animationRows   = 0;
    // millisecond delay between animation frames
    var animationDelay  = 0;
    // flag indication whether or not the prototype data has finished loading
    var ready     = false;
    
    /**
	 * Creates binary/alpha image data using a temporary canvas
	 */
    var createImageData = function(){
		// create temporary canvas to get access to the image pixel data
		$('<canvas id="binaryCanvas" width="'+image.width+'" height="'+image.height+'">').appendTo("#hybridRoot");
		var canvas = document.getElementById('binaryCanvas');
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);
		var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		// fill the binary image data
		imageData = [image.width];
		for(var x=0; x<image.width; x++){
			imageData[x] = [image.height];
			for(var y=0; y<image.height; y++){
				var idx = (x + y * image.width) * 4;
				imageData[x][y] = canvasData.data[idx+3];
			}
		}
		$("#binaryCanvas").remove();
    };
    
    var f_getImageData = function(){
    	return imageData;
    };
    
    var f_getImage = function(){
    	return image;
    };
    
   /** @scope hybridSpritePrototype */
    return{
    	/**
    	 * Creates binary/alpha image data
    	 * Indicates prototype is loaded and ready 
    	 */
    	setReady: function(){
			createImageData();
			ready = true;
		},
		/**
		 * Returns ready status
		 * @return boolean
		 */
		getReady: function(){
			return ready;
		},
		/**
		 * Sets image object
		 * @param val Image()
		 */
		setImage: function(val) {
			image = val;
		},
		/**
		 * Returns image object
		 * @return image
		 */
		getImage: f_getImage,
		/**
		 * Returns image data
		 * @return array
		 */
		getImageData: f_getImageData,
		/**
		 * Set prototype id
		 * @param val ID
		 */
		setId: function(val) {
			id = val;
		},
		/**
		 * Returns prototype id
		 * @return ID
		 */
		getId: function() {
			return id;
		},
		/**
		 * Sets flag whether or not this sprite is animated
		 * @param flag Animation flag
		 */
		setAnimation: function(flag){
			animation = flag;
		},
		/**
		 * Returns animation flag
		 * @return boolean
		 */
		getAnimation: function(){
			return animation;
		},
		/**
		 * Set number of animation frames
		 * @param val Number of frames
		 */
		setAnimationFrames: function(val){
			animationFrames = val;
		},
		/**
		 * Returns number of animation frames
		 * @return int
		 */
		getAnimationFrames: function(){
			return animationFrames;
		},
		/**
		 * Sets number of animations
		 * @param val Number of animations
		 */
		setAnimationRows: function(val){
			animationRows = val;
		},
		/**
		 * Returns number of animations
		 * @return int
		 */
		getAnimationRows: function(){
			return animationRows;
		},
		/**
		 * Sets animation delay
		 * @param val Delay in milliseconds
		 */
		setAnimationDelay: function(val){
			animationDelay = val;
		},
		/**
		 * Returns animation delay
		 * @return int
		 */
		getAnimationDelay: function(){
			return animationDelay;
		},
		/**
		 * Creates an active sprite from prototype and event data
		 * @param event Event data 
		 * @return Id of newly created sprite
		 */
		activate: function(event) {
			// creating new active sprite
			var sprite    = hybridSprite();
			sprite.setId( resourceManager.getNewSpriteId() );
			sprite.setImage(f_getImage());
			sprite.setImageData(f_getImageData());
			sprite.setDimension(f_getImage().width, f_getImage().height);
			// values from event
			sprite.setLayer(event.getLayer());
			sprite.setType(event.getType());
			sprite.setName(event.getName());
			sprite.setPosition(event.getPosition()[0], event.getPosition()[1]);
			sprite.setVelocity(event.getVelocity()[0], event.getVelocity()[1]);
			sprite.setVitality(event.getVitality()[0], event.getVitality()[1]);
			sprite.setMode(event.getMode()[0], event.getMode()[1], event.getMode()[2], event.getMode()[3]);
			// optionally create animation
			if( animation === true ){
				var spriteAnimation = hybridAnimation( sprite.getId(), image.width, image.height );
				spriteAnimation.setFrames( animationFrames ); 
				spriteAnimation.setRows( animationRows );
				spriteAnimation.setDelay( animationDelay ); 
				sprite.setAnimation(spriteAnimation);
				//correct sprite dimension
				sprite.setDimension(spriteAnimation.getDimension()[0], spriteAnimation.getDimension()[1]);
			}	
			// add sprite to the active sprite list
			resourceManager.addSprite(sprite);
			// assign user defined gameplay functions to sprite
			var gameplay = hybridSpriteGameplay(sprite);
			if( gameplay !== null ){
				if( event.getMovement() > 0 ){
					sprite.move      = gameplay.getMovement( event.getMovement() );
				}
				if( event.getImpact() > 0 ){
					sprite.impact    = gameplay.getImpact( event.getImpact() );
				}
				if( event.getDamage() > 0 ){
					sprite.damage    = gameplay.getDamage( event.getDamage() );
				}
				if( event.getCreated() > 0 ){
					sprite.created   = gameplay.getCreated( event.getCreated() );
				}
				if( event.getDestroyed() > 0 ){
					sprite.destroyed = gameplay.getDestroyed( event.getDestroyed() );
				}
			}
			// sprite creation finalized
			sprite.created();
			return sprite.getId();
		}
    };
};
