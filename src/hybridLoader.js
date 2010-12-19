/**
 * @namespace
 * 
 * Based on JQuery Ajax.
 * The loader object loads and writes level data from/to a file. 
 * The level data can be XML or JSON.
 * TODO JSON reader/writer 
 * TODO XML writer
 */
function hybridLoader() {
	var callback = 0;
	var waitId   = 0;
	
	/**
	 * @private
	 * Reads XML game data
	 * @param xml XML game data
	 */
	var xmlReader = function(xml){
		$("#loading").text("parsing game data");
		parseGame(xml);
		
		$("#loading").text("parsing screen data");
		parseScreen(xml);
		
		$("#loading").text("parsing map data");
		parseMap(xml);

		$("#loading").text("parsing sound data");
		parseSounds(xml);
		
		$("#loading").text("parsing image data");
		parsePrototypes(xml);
		
		$("#loading").text("parsing event data");
		parseTrigger(xml);
		
		waitId = setInterval(waitForResources, 100);
	};
	/**
	 * Writes XML game data
	 * @param xml XML game data
	 * TODO implement
	 */
	var xmlWriter = function(xml){
	};
	/**
	 * @private
	 * Reads JSON game data
	 * @param json JSON game data
	 * TODO implement
	 */
	var jsonReader = function(json){
	};
	/**
	 * @private
	 * Writes JSON game data
	 * @param json JSON game data
	 * TODO implement
	 */
	var jsonWriter = function(json){
	};
	/**
	 * @private
	 */
	function waitForResources(){
		var prtlist = resourceManager.getPrototypeList();
		var maplist = resourceManager.getMapList();
		//var sfxlist = resourceManager.getSoundList();
		var prtCount = 0;
		var mapCount = 0;
		//var sfxCount = 0;
		$("#loading").text("waiting for sprite images ["+prtCount+"/"+prtlist.length+"]");
		if( prtlist.length > 0 ) {
			$.each(prtlist, function(index, prt){
				if(prt.getReady()){prtCount++;}
			});
		}
		$("#loading").text("waiting for tile images ["+mapCount+"/"+maplist.length+"]");
		if( maplist.length > 0 ) {
			$.each(maplist, function(index, map){
				if(map.getReady()){mapCount++;}
			});
		}
		/*
		if( sfxlist.length > 0 ) {
			$.each(sfxlist, function(index, sound){
				if(sound.getReady()){sfxCount++; document.writeln("sound ready");}
			});
		}
		if( (prtlist.length <= prtCount) && (maplist.length <= mapCount) && (sfxlist.length <= sfxCount) ){
		*/
		if( (prtlist.length <= prtCount) && (maplist.length <= mapCount) ){
			clearInterval(waitId);
            if (typeof callback === "function"){
				callback();
			}
		}
	};
	/**
	 * @private
	 */
	function parseGame(xml) {
		$(xml).find("game").each(function()
		{
			// compulsory
			var displaySpeed = $(this).find("displaySpeed").text();
			if( displaySpeed !== undefined ){
				resourceManager.setDisplaySpeed(displaySpeed);
			}
			var gameSpeed = $(this).find("gameSpeed").text();
			if( gameSpeed !== undefined ){
				resourceManager.setGameSpeed(gameSpeed);
			}
			
			// optional
			var border = $(this).find("border").text();
			if( border !== undefined ){
				resourceManager.setBorder(border);
			}
			// pixel collision
			flag = $(this).find("collision").text();
			resourceManager.setCollisionAccuracy(flag);
			// double buffering
			var flag = $(this).find("doubleBuffering").text();
			resourceManager.setDoubleBuffering(flag);
			// void map
			flag = $(this).find("voidMap").text();
			resourceManager.setVoidMap(flag);
			// audio
			flag = $(this).find("audio").text();
			resourceManager.setAudio(flag);
		});
	};
	/**
	 * @private
	 */
	function parseScreen(xml) {
		$(xml).find("screen").each(function()
		{
			var screen     = resourceManager.getScreen();
			// compulsory
			var dimension  = $(this).find("dimension").text().split(" ");
			var gamesize   = $(this).find("gamesize").text().split(" ");
			
			screen.setDimension( dimension[0], dimension[1] );
			screen.setGameDimension( gamesize[0], gamesize[1] );
			
			// optional
			var velocity   = $(this).find("velocity").text().split(" ");
			
			if( velocity.length > 1 ){
				screen.setVelocity( velocity[0], velocity[1] );
			}
			else{
				screen.setVelocity( 0, 0 );
			}
		});
	};
	/**
	 * @private
	 */
	function parseMap(xml) {
		$(xml).find("map").each(function()
		{
			var screen 	= resourceManager.getScreen();
			var tile   	= hybridTile();
			var type 	= $(this).attr("type");

			// compulsory (void tile is an exception)
			if( "void" !== type ){
				var position   = $(this).find("position").text().split(" ");
				tile.setPosition( position[0], position[1] );
			
				var ypos  = parseInt(position[1], 10);
				var ysize = parseInt(screen.getGameDimension()[1], 10);
				var xpos  = parseInt(position[0], 10);
				var id    = (ypos * ysize) + xpos;
				tile.setId( id );
			}
			else{
				tile.setId( -1 );
			}
			var image		= new Image();
			image.onload	= tile.setReady;
			image.src   	= $(this).find("image").text();
			tile.setImage( image );
			// set screen to start map
			if( "start" === type ){
				screen.setPosition(position[0]*screen.getDimension()[0], position[1]*screen.getDimension()[1]);
			}
			
			// optional
			var velocity   = $(this).find("velocity").text().split(" ");
			if( velocity.length > 1 ){
				tile.setVelocity( velocity[0], velocity[1] );
			}
			
			resourceManager.addMap(tile);
		});
	};
	/**
	 * @private
	 * FIXME
	 */
	function parseSounds(xml){
		$(xml).find("sound").each(function()
		{
			var sound  = hybridSound();
			
			var id     = $(this).attr("id");
			var file   = $(this).find("file").text();
			var volume = $(this).find("volume").text();
			
			var audio    = new Audio(file);
			//audio.onload = sound.setReady;
			audio.src    = file;
			//audio.onload = sound.setReady;
			// TODO audio volume does not work
			//audio.volume = volume;
			audio.load();
			/* TODO check if this fallback is needed or can be removed
			audio.addEventListener("load", function() { 
				sound.setReady();
			}, true);
			*/
			
			sound.setId(id);
			sound.setFile(file);
			sound.setVolume(volume);
			sound.setSound(audio);
			
			resourceManager.addSound(sound);
		});
	};
	/**
	 * @private
	 */
	function parsePrototypes(xml) {
		$(xml).find("prototype").each(function()
		{
			var template    = hybridSpritePrototype();
			// compulsory
			var id			= $(this).attr("id");
			var image		= new Image();
			image.onload	= template.setReady;
			image.src   	= $(this).find("image").text();
			template.setId( id );
			template.setImage( image );
			//optional <animation> context to load its animation
			$(this).find("animation").each(function()
			{
				var frames = $(this).find("frames").text();
				var rows   = $(this).find("rows").text();
				var delay  = $(this).find("delay").text();
				template.setAnimation(true);
				template.setAnimationFrames(frames);
				template.setAnimationRows(rows);
				template.setAnimationDelay(delay);
			});
			resourceManager.addPrototype(template);
		});
	};
	/**
	 * @private
	 */
	function parseTrigger(xml) {
		$(xml).find("trigger").each(function()
		{
			var trigger = hybridTrigger();
			
			trigger.setType( $(this).attr("type") );
			trigger.setLifetime( $(this).attr("lifetime") );
			
			// box for coordinate triggers 
			var box = $(this).find("box").text().split(" ");
			if( box.length === 4 ) {
				trigger.setTriggerbox( box[0], box[1], box[2], box[3]);
			}
			
			//uses the <event> context to add events to this trigger
			$(this).find("event").each(function()
			{
				var type      = $(this).attr("type"); 
				var template  = $(this).attr("prototype");
				var name      = $(this).attr("name");
				var layer     = $(this).find("layer").text();
				var mode      = $(this).find("mode").text().split(" ");
				var gameplay  = $(this).find("gameplay").text().split(" ");
				var vitality  = $(this).find("vitality").text().split(" ");
				var velocity  = $(this).find("velocity").text().split(" ");
				var created   = $(this).find("created").text();
				var destroyed = $(this).find("destroyed").text();
				var movement  = $(this).find("movement").text();
				var impact    = $(this).find("impact").text();
				var damage    = $(this).find("damage").text();
				
				$(this).find("sprite").each(function()
				{
					var position =  $(this).find("position").text().split(" ");
					var event    = hybridEvent();
					event.setType( type );
					event.setPrototype( template );
					
					if( name !== undefined ){
						event.setName(name);
					}
					if( layer !== "" ){
						event.setLayer(layer);
					}
					if( position.length > 1 ) {
						event.setPosition( position[0], position[1]);
					}
					// impact, damage, substance, channel
					if( mode.length > 1 ) {
						event.setMode( mode[0], mode[1], mode[2], mode[3] );
					}
					else{
						event.setMode(0, 0, 0, 0);
					}
					if( created !== "" ){
						event.setCreated(created);
					}
					else{
						event.setCreated(0);
					}
					if( destroyed !== "" ){
						event.setDestroyed(destroyed);
					}
					else{
						event.setDestroyed(0);
					}
					if( movement !== "" ){
						event.setMovement(movement);
					}
					else{
						event.setMovement(0);
					}
					if( impact !== "" ){
						event.setImpact(impact);
					}
					else{
					}
					if( damage !== "" ){
						event.setDamage(damage);
					}
					else{
						event.setDamage(0);
					}
					// energy, lifes
					if( vitality.length > 1 ) {
						event.setVitality( vitality[0], vitality[1] );
					}
					else {
						event.setVitality(1, 1);
					}
					// xvel, yvel
					if( velocity.length > 1 ) {
						event.setVelocity( velocity[0], velocity[1] );
					}
					else{
						event.setVelocity(0, 0);
					}
				
					trigger.addEvent(event);
				});
			});
			
			resourceManager.addTrigger(trigger);
		});
	};
	
	/** @scope hybridLoader */
	return {
		/**
		 * Loads level data from XML file 
		 * using JQuery Ajax
		 */
		load: function(file, cb){
			callback = cb;
			$("#loading").text("before parsing");
			//if( navigator.onLine ) {
			$.ajax({
				type: "GET",
				async: false,
				url: file,
				dataType: "xml",
				success: xmlReader
				/*
				error:function (xhr, ajaxOptions, thrownError){
                	//alert(xhr.status);
                	//alert(xhr.statusText);
                	//alert(thrownError);
					alert(ajaxOptions);
					parseXml(xhr.responseText);
            	} 
            	*/
			});
			//}
		},
		/**
		 * Sends file content to server for saving
		 * XML or JSON format
		 * TODO implement
		 */
		write: function(file, cb){
		}
	};
};
