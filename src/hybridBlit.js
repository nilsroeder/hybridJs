/**
 * @namespace
 * Handles the background tiling and sprite display
 */
function hybridBlit() {
	var context;
	var screen;
	var buffer;
	var bufferContext;
	
	/**
	 * @private
	 * Background tiling allows the game to be made up of multiple tiles. 
	 * Each tile has to be the same size as the screen
	 */
	var blitMap = function() {
		// screen constants
		var WIDTH   = screen.getDimension()[0];
		var HEIGHT  = screen.getDimension()[1];
		var SCREENX = screen.getPosition()[0];
		var SCREENY = screen.getPosition()[1];
		var SIZEY	= screen.getGameDimension()[1];
		
		var srcx   = SCREENX % WIDTH;
		var srcy   = SCREENY % HEIGHT;
		var dstx   = 0;
		var dsty   = 0;
		var width  = WIDTH  - srcx;
		var height = HEIGHT - srcy;
		
		// top-left map
		var mapId = parseInt( (Math.floor(SCREENY/HEIGHT) * SIZEY) + Math.floor(SCREENX/WIDTH), 10);
		var map   = resourceManager.getMapById(mapId);
		if( map !== 0){
			bufferContext.drawImage(map.getImage(), srcx, srcy, width, height, dstx, dsty, width, height);
			// TODO inherit map velocity, but only on change. and use a default, so not all maps need to have this field
			//screen.setVelocity(map.getVelocity()[0], map.getVelocity()[1]);
		}
		// top-right map
		if( srcx > 0){
			srcx   = 0;
			dstx   = width;
			width  = WIDTH  - width;
			height = height;
			
			mapId = mapId +1;
			map   = resourceManager.getMapById(mapId);
			if( map !== 0){
				bufferContext.drawImage(map.getImage(), srcx, srcy, width, height, dstx, dsty, width, height);
			}
			else{
				bufferContext.fillRect(dstx, dsty, width, height);
			}
		}
		// bottom-left map
		if( (SCREENY % HEIGHT) > 0 ){
			srcx   = SCREENX % WIDTH;
			srcy   = 0;
			dstx   = 0;
			dsty   = height;
			width  = WIDTH  - srcx;
			height = HEIGHT - height;
			
			mapId = (mapId-1)+SIZEY;
			map   = resourceManager.getMapById(mapId);
			if( map !== 0){
				bufferContext.drawImage(map.getImage(), srcx, srcy, width, height, dstx, dsty, width, height);
			}
			else{
				bufferContext.fillRect(dstx, dsty, width, height);
			}
		}
		// bottom-right map
		width  = SCREENX % WIDTH;
		height = SCREENY % HEIGHT;
		if( (height > 0) && (width > 0) ){
			srcx   = 0;
			srcy   = 0;
			dstx   = WIDTH  - (SCREENX % WIDTH);
			dsty   = HEIGHT - (SCREENY % HEIGHT);
			
			mapId = mapId+1;
			map   = resourceManager.getMapById(mapId);
			if( map !== 0){
				bufferContext.drawImage(map.getImage(), srcx, srcy, width, height, dstx, dsty, width, height);
			}
			else{
				bufferContext.fillRect(dstx, dsty, width, height);
			}
		}
	};
	/**
	 * @private
	 * Displays all active sprites
	 * TODO only draw whats visible
	 */
	var blitSprites = function() {
		var sprites = resourceManager.getSpriteList();
		if( sprites.length > 0 ) {
			$.each(sprites, function(index, sprite){
				var width  = sprite.getDimension()[0];
				var height = sprite.getDimension()[1];
				var destx  = sprite.getPosition()[0] - screen.getPosition()[0];
				var desty  = sprite.getPosition()[1] - screen.getPosition()[1];
				var srcx   = 0;
				var srcy   = 0;
				if(sprite.getAnimation() !== null){
					srcx = (sprite.getAnimation().getIndex()[0]-1) * width;
					srcy = (sprite.getAnimation().getIndex()[1]-1) * height;
				}
				bufferContext.drawImage(sprite.getImage(), srcx, srcy, width, height, destx, desty, width, height);
			});
		}
	};
	/** 
	 * @private
	 * Direct Buffer Display writes all changes directly to the screen.
	 * This is the faster than Double Buffer Display but can cause the
	 * screen to flicker occasionally.
	 */
	function directBufferDisplay(){
		blitMap();
		blitSprites();
	};
	/**
	 * @private
	 * Double Buffer Display writes all changes to a temporary canvas
	 * and then displays the whole canvas at once. This is a little slower
	 * than doing it directly but avoid screen flicker when too many changes occur.
	 */
	function doubleBufferingDisplay() {
		blitMap();
		blitSprites();
		context.drawImage(buffer, 0, 0);
	};
	/** @scope hybridBlit */
	return{
		/**
		 * Sets up the canvas element "screen" and
		 * sets the display method.
		 */
		init: function() {
			screen  = resourceManager.getScreen();
			screen.init();
		
			$('<canvas id="screen" style="border:1px solid black; background: #ccc;" width="'+screen.getDimension()[0]+'" height="'+screen.getDimension()[1]+'">').appendTo("#hybridRoot");
			var canvas = document.getElementById("screen");
			
			if(canvas.getContext) {
				if( resourceManager.getDoubleBuffering() ){
					context = canvas.getContext("2d");
					buffer  = document.createElement('canvas');
					buffer.width   = canvas.width;
					buffer.height  = canvas.height;
					bufferContext  = buffer.getContext('2d');
					this.blitFrame = doubleBufferingDisplay;
				}
				else{
					bufferContext  = canvas.getContext("2d");
					this.blitFrame = directBufferDisplay;
				}
				// void tile setup
				if( resourceManager.getVoidMap() ){
					var map = resourceManager.getMapById(-1);
					if( map !== 0 ){
						var pattern = bufferContext.createPattern(map.getImage(),'repeat');  
						bufferContext.fillStyle = pattern;
					}
				}
			}
			screen.setContext(bufferContext);
		},
		/**
		 * Blits background and sprites
		 */
		blitFrame: function() {
		}
	};
};