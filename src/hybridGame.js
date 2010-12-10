/**
 * @namespace
 *
 * Handles the game loop and the necessary initialization
 */
function hybridGame() {
	// Id of the game loop blit thread
	var blitId = 0;
	// Id of the game loop gameplay thread
	var stepId = 0;
	// local copy of the engine's blit object
	var blit;
	// local copy of the engine's move object
	var move;
	// local copy of the coordinate trigger list
	var coordinateTrigger;
	// game loop display speed in milliseconds
	var displaySpeed;
	// game loop gameplay speed in milliseconds
	var gameSpeed;
	
	var setBlit = function(blt){
		blit = blt;
	};
	var setMove = function(mv){
		move = mv;
	};
	var setCoordinateTrigger = function(list){
		coordinateTrigger = list;
	};
	var checkTrigger = function(){
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
	};
	var setSpeed = function(dspeed, gspeed){
		displaySpeed = dspeed;
		gameSpeed = gspeed;
		if(f_isRunning()){
			f_stop();
			f_run();
		}
	};
	var getSpeed = function(){
		return [displaySpeed, gameSpeed];
	};
	var f_stop = function() {
		clearInterval(blitId);
		blitId = 0;
		clearTimeout(stepId);
		stepId = 0;
	};
	var f_step = function(){
		stepId = setTimeout(function(){
			move.moveFrame();
			checkTrigger();
			gameplayHook();
			f_step();
		}, gameSpeed);
	};
	var f_run = function() {
		blitId = setInterval(function(){
			blit.blitFrame();
			displayHook();
		}, displaySpeed);
		f_step();
	};
	var f_isRunning = function() {
		if( blitId !== 0 ){
			return true;
		}
		return false;
	};
	var gameplayHook = function() {
	};
	var displayHook = function() {
	};

	/** @scope hybridGame */
	return{
		/**
		 * Initializes the ressource manager and triggers. 
		 * @param callback Callback function to be called when initialization is finished
		 */
		init: function(xpos, ypos, callback) {
			f_stop();
			resourceManager.init();
			var blit     = hybridBlit();
			var move     = hybridMove();
			setMove(move);
			setBlit(blit);
			setCoordinateTrigger(0);
		
            if( typeof callback === "function" ){
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
			setSpeed(resourceManager.getDisplaySpeed(), resourceManager.getGameSpeed());
			setCoordinateTrigger(resourceManager.getTriggerByType("coordinate"));
			// execute all "start" trigger events on start-up
			var startList = resourceManager.getTriggerByType("start");
			if( startList.length > 0 ) {
				$.each(startList, function(index, trigger){
					trigger.triggerEvents();
					trigger.setLifetime(trigger.getLifetime()-1);
				});
			}
			// start game loop
			f_run();
			// signal game has started
            if( typeof callback === "function" ){
				callback();
			}	
		},
		/**
		 * Stops the game loop
		 */
		stop: f_stop,
		/**
		 * Game loop. Runs in millisecond intervals defined by game speed.
		 * Moves background and sprites and does the collision handling.
		 * Checks all triggers.
		 * Executes userspace gameplay function
		 * Displays everything.
		 */
		run: f_run,
		/**
		 * Returns true if game loop is running, false otherwise.
		 * @return boolean
		 */
		isRunning: f_isRunning,
		/**
		 * Stops the game loop and resets the resource manager.
		 */
		quit: function() {
			f_stop();
			
			blit     = 0;
			move     = 0;
			position = [0, 0];
			displaySpeed       = 0;
			gameSpeed          = 0;
			coordinateTrigger  = 0;
			resourceManager.init();
		},
		/**
		 * Userspace gameplay hook
		 */
		setGameplayHook: function(method){
			if( typeof method === "function" ){
				gameplayHook = method;
			}
		},
		/**
		 * Userspace display hook
		 */
		setDisplayHook: function(method){
			if( typeof method === "function" ){
				displayHook = method;
			}
		}
	};
};
