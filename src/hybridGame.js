/**
 * @namespace
 *
 * Handles the game loop and the necessary initialization
 * 
 * runId 	Id of the game loop thread
 * blit		local copy of the engine's blit object
 * move		local copy of the engine's move object
 * trigger	local copy of the engine's trigger object
 * speed	game loop speed in milliseconds
 */
function hybridGame() {
	// Id of the game loop thread
	var runId = 0;
	// local copy of the engine's blit object
	var blit;
	// local copy of the engine's move object
	var move;
	// local copy of the coordinate trigger list
	var coordinateTrigger;
	// game loop speed in milliseconds
	var speed;
	
	/** @scope hybridGame */
	return{
		/**
		 * Initializes the ressource manager and triggers. 
		 * @param callback Callback function to be called when initialization is finished
		 */
		init: function(xpos, ypos, callback) {
			this.stop();
			resourceManager.init();
			var blit     = hybridBlit();
			var move     = hybridMove();
			this.setMove(move);
			this.setBlit(blit);
			this.setCoordinateTrigger(0);
		
			if( (callback !== null) && (callback !== 0) && (callback !== undefined) ){
				callback();
			}
		},
		/**
		 * Uses the hybridLoader to load game data
		 * @param file Game data file to be loaded
		 * @param callback Callback function to be called when loading is finished
		 */
		load: function(file, callback){
			var loader   = hybridLoader();
			loader.load(file, callback);
		},
		/**
		 * Initializes the blitting system and the behaviour loop.
		 * Sets the game speed and executes the start triggers.
		 * Starts the game loop.
		 * @param callback Callback function to be called when game loop is started
		 */
		start: function(callback) {
			blit.init();
			move.init();
			this.setSpeed(resourceManager.getSpeed());
			this.setCoordinateTrigger(resourceManager.getTriggerByType("coordinate"));
			// execute all "start" trigger events
			var startList = resourceManager.getTriggerByType("start");
			if( startList.length > 0 ) {
				$.each(startList, function(index, trigger){
					trigger.triggerEvents();
					trigger.setLifetime(trigger.getLifetime()-1);
				});
			}
			// start game loop
			this.run();
			// signal game has started
			if( (callback !== null) && (callback !== 0) && (callback !== undefined) ){
				callback();
			}	
		},
		/**
		 * Stops the game loop
		 */
		stop: function() {
			clearInterval(runId);
			runId = 0;
		},
		/**
		 * Game loop. Runs in millisecond intervals definded by game speed.
		 * Moves background and sprites and does the collision handling.
		 * Checks all triggers.
		 * Executes userspace gameplay function
		 * Displays everything.
		 */
		run: function() {
			var game = this;
			runId = setInterval(function(){
				move.moveFrame();
				game.checkTrigger();
    			blit.blitFrame();
    			game.gameplay();
			}, speed);
		},
		/**
		 * Returns true if game loop is running, false otherwise.
		 * @return boolean
		 */
		isRunning: function() {
			if( runId !== 0 ){
				return true;
			}
			return false;
		},
		/**
		 * Stops the game loop and resets the resource manager.
		 */
		quit: function() {
			this.stop();
			
			blit     = 0;
			move     = 0;
			position = [0, 0];
			speed    = 0;
			coordinateTrigger  = 0;
			resourceManager.init();
		},
		/**
		 * Sets the blitting system
		 * TODO check if this shouldn't be private
		 */
		setBlit: function(blt){
			blit = blt;
		},
		/**
		 * Sets the move system
		 * TODO check if this shouldn't be private
		 */
		setMove: function(mv){
			move = mv;
		},
		/**
		 * Sets the coordinate triggers
		 * TODO check if this shouldn't be private
		 */
		setCoordinateTrigger: function(list){
			coordinateTrigger = list;
		},
		/**
		 * Trigger check and execute step
		 */
		checkTrigger: function(){
			if( (coordinateTrigger !== null) && (coordinateTrigger.length > 0) ){
				$.each(coordinateTrigger, function(index, trigger){
					if( trigger.getLifetime() > 0 ){
						var playerList = resourceManager.getSpritesByType("player");
						if( playerList.length > 0 ) {
							$.each(playerList, function(index, player){
								if( move.boxCollision(player, trigger) ){
									trigger.triggerEvents();
									trigger.setLifetime(trigger.getLifetime()-1);
								}
							});
						}
					}
				});
			}
		},
		/**
		 * Sets the game loop speed
		 * @param sp speed in milliseconds
		 *  TODO check if this shouldn't be private
		 */
		setSpeed: function(sp){
			speed = sp;
			if(this.isRunning()){
				this.stop();
				this.run();
			}
		},
		/**
		 * Returns the game loop speed
		 * @return int
		 */
		getSpeed: function(){
			return speed;
		},
		/**
		 * Userspace gameplay function
		 */
		gameplay: function() {
		}
	};
};