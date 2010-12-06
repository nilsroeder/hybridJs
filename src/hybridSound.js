/**
 * @namespace 
 * 
 * Sound Object
 */
function hybridSound() {
	// sound file
	var file   = '';
	// sound id
	var id     = 0;
	// flag indicating whether or not sound is loaded
	var ready  = false;
	// sound volume [0-100]
	var volume = 100; 
	// html5 sound object
	var sound  = null;

	/** @scope hybridSound */
	return{
		/**
		 * To be used by the loader to indicate that
		 * the sound is finished loading
		 */
		setReady: function(){
			ready = true;
		},
		/**
		 * Returns true if the sound is loaded, false otherwise
		 */
		getReady: function(){
			return ready;
		},
		/**
		 * Sets the sound id
		 * @param val The sound id (int)
		 */
		setId: function(val) {
			id = val;
		},
		/**
		 * Returns the sound's id (int)
		 */
		getId: function() {
			return id;
		},
		/**
		 * Sets the html5 sound object
		 * @param val The html5 sound object
		 */
		setSound: function(val) {
			sound = val;
		},
		/**
		 * Returns the html5 sound object
		 */
		getSound: function() {
			return sound;
		},
		/**
		 * Sets the sound file (url) name
		 * @param val The file name (url)
		 */
		setFile: function(val) {
			file = val;
		},
		/**
		 * Returns the sound file name
		 */
		getFile: function() {
			return file;
		},
		/**
		 * Sets the sound's volume. Valid values [0-100]
		 * @param val The volume (int)
		 */
		setVolume: function(val) {
			volume = parseInt(val, 10);
		},
		/**
		 * Returns the sound volume
		 */
		getVolume: function() {
			return volume;
		}
	};
};