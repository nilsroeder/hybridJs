/**
 * @namespace
 * 
 * The resource manager is a global object that is created on
 * game engine initialization. It handles all the resources that
 * are needed by the gameplay, i.e. active sprites, tiles, sounds, 
 * events and so on.
 * The resource manager is initialized by the game loop.
 */
var resourceManager = (function() {
	// list of all tiles
	var mapList       = [];
	// list of all active sprites
	var spriteList    = [];
	// list of all soundeffects
	var soundList     = [];
	// list of all sprite prototypes
	var prototypeList = [];
	// list of all triggers
	var triggerList   = [];
	// viewport
	var screen;
	// display speed
	var displaySpeed;
	// game speed
	var gameSpeed;
	// game border beyond sprites are removed [screen | map]
	var border          = "screen";
	// double buffering flag. default true
	var doubleBuffering = true;
	// void tile flag for "wallpapering" areas outside the map. default true
	var voidTile        = true;
	// using audio flag. default true
	var audio			= true;
	// pixel accurate collision flag. default true
	var collision		= true;
	// debug mode flag
	var debug			= false;

	/** @scope resourceManager */
	return {
		setDebug: function(flag){
			debug = flag;
		},
		getDebug: function(){
			return debug;
		},
		/**
		 * Initializes the resource manager, required before use.
		 * Inits the hybridScreen, active sprite list, soundlist, prototypelist, triggerlist and resets game speed.
		 */
		init: function() {
			screen        = hybridScreen();
			mapList       = [];
			if( (spriteList !== null) && (spriteList !== 0) && (spriteList !== undefined) && (spriteList.length > 0) ){
				$.each(spriteList, function(index, sprite){
					sprite.getAnimation().stop();
				});
			}
			spriteList    = [];
			soundList     = [];
			prototypeList = [];
			triggerList   = [];
			speed         = 0;
		},
		/**
		 * Sets flag for collision accuracy. 
		 * If set to "pixel", pixel accurate collision is used, box shape collision otherwise.
		 * @param flag Collision accuracy flag
		 */
		setCollisionAccuracy: function(flag){
			if( flag === "pixel" ){
				collision = true;
			}
			else{
				collision = false;
			}
		},
		/**
		 * Returns collision accuracy flag
		 * @return flag
		 */
		getCollisionAccuracy: function(){
			return collision;
		},
		/**
		 * Sets double buffering flag. If set to "on"
		 * double buffering is used, direct buffer otherwise.
		 * @param flag Double buffering flag
		 */
		setDoubleBuffering: function(flag){
			if( flag === "on" ){
				doubleBuffering = true;
			}
			else{
				doubleBuffering = false;
			}
		},
		/**
		 * Returns double buffering flag
		 * @return flag
		 */
		getDoubleBuffering: function(){
			return doubleBuffering;
		},
		/**
		 * Sets void tile flag. If set to "on"
		 * a void tile is used for areas outside the game map.
		 * @param flag Void tile flag
		 */
		setVoidMap: function(flag){
			if( flag === "on" ){
				voidTile = true;
			}
			else{
				voidTile = false;
			}
		},
		/**
		 * Returns void tile flag
		 * @return flag
		 */
		getVoidMap: function(){
			return voidTile;
		},
		/**
		 * Sets audio flag. If set to "on" audio is activated, otherwise muted.
		 * @param flag Audio flag
		 */
		setAudio: function(flag){
			if( flag === "on" ){
				audio = true;
			}
			else{
				audio = false;
			}
		},
		/**
		 * Returns audio flag
		 * @return flag
		 */
		getAudio: function(){
			return audio;
		},
		/**
		 * Sets game border flag, i.e. if sprites shall be removed when
		 * they leave the screen or the game map. Options [screen | map].
		 * @param flag Border flag
		 */
		setBorder: function(flag) {
			border = flag;
		},
		/**
		 * Returns game border flag
		 * @return flag
		 */
		getBorder: function() {
			return border;
		},
		/**
		 * Sets display speed indicator
		 * @param val Game speed
		 */
		setDisplaySpeed: function(val) {
			displaySpeed = val;
		},
		/**
		 * Returns display speed indicator
		 * @return int
		 */
		getDisplaySpeed: function() {
			return displaySpeed;
		},
		/**
		 * Sets game speed indicator
		 * @param val Game speed
		 */
		setGameSpeed: function(val) {
			gameSpeed = val;
		},
		/**
		 * Returns game speed indicator
		 * @return int
		 */
		getGameSpeed: function() {
			return gameSpeed;
		},
		/**
		 * Returns hybridScreen object
		 * @return hybridScreen
		 */
		getScreen: function() {
			return screen;
		},
		/**
		 * Returns list of hybridTiles that make the game map
		 * @return array
		 */
		getMapList: function() {
			return mapList;
		},
		/**
		 * Returns tile of given ID
		 * @param id Tile ID
		 * @return hybridTile
		 */
		getMapById: function(id) {
			var target = 0;
			$.each(mapList, function(index, map){
				if (parseInt(map.getId(), 10) === id) {
					target = map;
				}
			});
			return target;
		},
		/**
		 * Adds hybridTile to map list
		 * @param map hybridTile
		 * @return array
		 */
		addMap: function(map) {
			mapList.push(map);
			return mapList;
		},
		/**
		 * Returns list of active sprites
		 * @return array
		 */
		getSpriteList: function() {
			return spriteList;
		},
		/**
		 * Returns sprite of given ID
		 * @param id Sprite ID
		 * @return hybridSprite
		 */
		getSpriteById: function(id) {
			var target = 0;
			$.each(spriteList, function(index, sprite){
				if( parseInt(sprite.getId(), 10) === id) {
					target = sprite;
				}
			});
			return target;
		},
		/**
		 * Returns all sprites of given type
		 * @param type Group identifier
		 * @return array
		 */
		getSpritesByType: function(type) {
			var group = [];
			$.each(spriteList, function(index, sprite){
				if( sprite.getType() === type ) {
					group.push(sprite);
				}
			});
			return group;
		},
		/**
		 * Returns all sprites of given name
		 * @param name Group identifier
		 * @return array
		 */
		getSpritesByName: function(name) {
			var group = [];
			$.each(spriteList, function(index, sprite){
				if( sprite.getName() === name ) {
					group.push(sprite);
				}
			});
			return group;
		},
		/**
		 * Adds hybridSprite object to active sprite list
		 * @return array
		 */
		addSprite: function(sprite) {
			spriteList.push(sprite);
			return spriteList;
		},
		/**
		 * Returns ID for new sprite
		 * @return int
		 */
		getNewSpriteId: function() {
			var newId = 1;
			if( spriteList.length > 0 ){
				// assuming the last sprite (highest id) always sits at the array end (due to add => push)
				newId = parseInt(spriteList[spriteList.length-1].getId() + 1,10);
			}
			return newId;
		},
		/**
		 * Returns list of hybridSounds
		 * @return array
		 */
		getSoundList: function() {
			return soundList;
		},
		/**
		 * Returns sound of given ID
		 * @param id Sound ID
		 * @return hybridSound
		 */
		getSoundById: function(id) {
			var target = 0;
			$.each(soundList, function(index, sound){
				if( sound.getId() === id ) {
					target = sound;
				}
			});
			return target;
		},
		/**
		 * Adds hybridSound to sound list
		 * @return array
		 */
		addSound: function(sound) {
			soundList.push(sound);
			return soundList;
		},
		/**
		 * Returns list of hybridSpritePrototypes
		 * @return array
		 */
		getPrototypeList: function() {
			return prototypeList;
		},
		/**
		 * Returns Prototype of given id
		 * @param id Prototype ID
		 * @return hybridSpritePrototype
		 */
		getPrototypeById: function(id) {
			var target = 0;
			$.each(prototypeList, function(index, template){
				if( template.getId() === id ) {
					target = template;
				}
			});
			return target;
		},
		/**
		 * Adds hybridSpritePrototype to prototype list
		 * @return array
		 */
		addPrototype: function(prototype) {
			prototypeList.push(prototype);
			return prototypeList;
		},
		/**
		 * Returns list of hybridTriggers
		 * @return array
		 */
		getTriggerList: function() {
			return triggerList;
		},
		/**
		 * Returns all triggers of given type
		 * @param type Group identifier
		 * @return array
		 */
		getTriggerByType: function(type){
			var group = [];
			$.each(triggerList, function(index, trigger){
				if( trigger.getType() === type){
					group.push(trigger);
				}
			});
			return group;
		},
		/**
		 * Adds hybridTrigger to trigger list
		 * @return array
		 */
		addTrigger: function(trigger) {
			triggerList.push(trigger);
			return triggerList;
		}
	};
})();
