/**
 * @namespace
 * A trigger holds the conditions that must be met for an event to be triggered.
 * There are three types of triggers [user|start|coordinate]. User triggers are
 * simply event prototypes that can be trigger by gameplay anytime. Start triggers
 * are automatically triggered on game start. Coordinate triggers are areas within
 * the game map that will trigger their events when the player enters them.
 * Triggers can hold multiple events (for the same condition set) and
 * have a lifetime, i.e. can be used more than once.
 * 
 * End triggers and time triggers can easily be implemented in gameplay using the
 * user trigger type.
 */
function hybridTrigger() {
	// trigger lifetime: [-1] = always, [0] = inactive, [1-n] number of activities. Default is "1"
	var lifetime  = 1;
	// [user|start|coordinate]. Default is "coordinate"
	var type      = "coordinate";
	// [xpos, ypos, width, height] trigger box definition
	var triggerbox  = [4];
	// eventlist of events attached to this trigger
	var eventList = [];
	
	/** @scope hybridTrigger */
	return {
		/**
		 * Set the trigger lifetime.
		 * [-1] = always, [0] = inactive, [1-n] number of activities. Default is "1"
		 * @param val lifetime (int)
		 */
		setLifetime: function(val) {
			lifetime = parseInt(val, 10);
		},
		/**
		 * Returns the trigger lifetime
		 * @return int
		 */
		getLifetime: function() {
			return lifetime;
		},
		/**
		 * Sets the trigger type
		 * [user|start|coordinate]. Default is "coordinate"
		 * @param val trigger type (string)
		 */
		setType: function(val) {
			type = val;
		},
		/**
		 * Returns the trigger type
		 * @return string
		 */
		getType: function() {
			return type;
		},
		/**
		 * Sets the triggerbox position and dimension
		 * TODO implement
		 * @param xpos X-axis position
		 * @param ypos Y-Axis position
		 * @param width Triggerbox width
		 * @param height Triggerbox height
		 */
		setTriggerbox: function(xpos, ypos, width, height) {
			triggerbox[0] = parseInt(xpos, 10);
			triggerbox[1] = parseInt(ypos, 10);
			triggerbox[2] = parseInt(width, 10);
			triggerbox[3] = parseInt(height, 10);
		},
		/**
		 * Returns the triggerbox definitions
		 * @return array
		 */
		getTriggerbox: function() {
			return triggerbox;
		},
		/**
		 * Returns the triggerbox position
		 * @return array
		 */
		getPosition: function() {
			return [triggerbox[0], triggerbox[1]];
		},
		/**
		 * Returns the triggerbox dimension
		 * @return array
		 */
		getDimension: function() {
			return [triggerbox[2], triggerbox[3]];
		},
		/**
		 * Adds event to the trigger's event list
		 * @param event hybridEvent
		 * @return array
		 */
		addEvent: function(event) {
			eventList.push(event);
			return eventList;
		},
		/**
		 * Returns the trigger event list
		 * @return array
		 */
		getEventList: function() {
			return eventList;
		},
		/**
		 * Return single event by its name
		 * @return hybridEvent
		 */
		getEventByName: function(name) {
			var target = 0;
			$.each(eventList, function(index, event){
				if( event.getName() === name ) {
					target = event;
				}
			});
			return target;
		},
		/**
		 * Triggers all events attached to this trigger
		 */
		triggerEvents: function(){
			if( eventList.length > 0 ) {
				$.each(eventList, function(index, event){
					var spritePrototype = resourceManager.getPrototypeById(event.getPrototype());
					spritePrototype.activate(event);
				});
			}
		}
	};
};

/**
 * @namespace
 * 
 * Represents a single event that can occur during the game. 
 * Events are triggered through trigger Objects which hold the
 * activation conditions. There are events for adding sprites,
 * animations and soundeffects
 */
function hybridEvent() {
	// event name which forms sprite name. default empty
	var name      = "";
	// prototype id
	var template  = 0;
	// event type which forms sprite group. default "sprite"
	var type      = "sprite";
	// z-index layer of later sprite.
	var layer     = 1;
	// sprite position
	var position  = [0, 0];
	// sprite velocity
	var velocity  = [0, 0];
	// sprite vitality
	var vitality  = [1, 1];
	// sprite mode [substance, damage, mortality, channel]
	var mode      = [0, 0, 0, 0];
	// sprite gameplay [move, impact, damage, created, destroyed]
	var gameplay  = [0, 0, 0, 0, 0];
	
	/** @scope hybridEvent */
	return{
		/**
		 * Sets the event name
		 * @param val event name
		 */
		setName: function(val) {
			name = val;
		},
		/**
		 * Returns the event name
		 * @return string
		 */
		getName: function() {
			return name;
		},
		/**
		 * Sets the event prototype
		 * @param val prototype ID
		 */
		setPrototype: function(val) {
			template = val;
		},
		/**
		 * Returns the event prototype
		 * @return int
		 */
		getPrototype: function() {
			return template;
		},
		/**
		 * Sets the event type (sprite group)
		 * @param val type
		 */
		setType: function(val) {
			type = val;
		},
		/**
		 * Returns the event type
		 * @return string
		 */
		getType: function() {
			return type;
		},
		/**
		 * Sets the event z-index position
		 * @param val z-index (int)
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
		 * Sets the position for the sprite
		 * @param xpos X-axis position
		 * @param ypos Y-axis position
		 */
		setPosition: function(xpos, ypos) {
			position[0] = parseInt(xpos, 10);
			position[1] = parseInt(ypos, 10);
		},
		/**
		 * Returns the sprite position
		 * @return array
		 */
		getPosition: function() {
			return position;
		},
		/**
		 * Sets the sprite velocity
		 * @param xvel Horizontal velocity
		 * @param yvel Vertical velocity
		 */
		setVelocity: function(xvel, yvel) {
			velocity[0] = parseInt(xvel, 10);
			velocity[1] = parseInt(yvel, 10);
		},
		/**
		 * Returns the sprite velocity
		 * @return array
		 */
		getVelocity: function() {
			return velocity;
		},
		/** Sets the sprite vitality
		 * @param energy Sprite engery level
		 * @param life Sprite lifes
		 */
		setVitality: function(energy, life) {
			vitality[0] = parseInt(energy, 10);
			vitality[1] = parseInt(life, 10);
		},
		/**
		 * Returns the sprite vitality
		 * @return array
		 */
		getVitality: function() {
			return vitality;
		},
		/**
		 * Sets the sprite mode.
		 * TODO define various modes
		 * @param impact Sprite substance
		 * @param force Sprite force
		 * @param damage Sprite toughness
		 * @param channel Sprite channel
		 */
		setMode: function(impact, force, damage, channel) {
			mode[0] = parseInt(impact, 10);
			mode[1] = parseInt(force, 10);
			mode[2] = parseInt(damage, 10);
			mode[3] = parseInt(channel, 10);
		},
		/**
		 * Return sprite mode
		 * @return array
		 */
		getMode: function() {
			return mode;
		},
		/**
		 * Set sprite behaviour
		 * @param val behaviour ID
		 */
		setMovement: function(val) {
			gameplay[0] = parseInt(val, 10);
		},
		/**
		 * Return sprite behaviour
		 * @return array
		 */
		getMovement: function() {
			return gameplay[0];
		},
		/**
		 * Set sprite behaviour on impact
		 * @param val impact behaviour ID
		 */
		setImpact: function(val) {
			gameplay[1] = parseInt(val, 10);
		},
		/**
		 * Return sprite impact behaviour ID
		 * @return int
		 */
		getImpact: function() {
			return gameplay[1];
		},
		/**
		 * Sets sprite behaviour on damage
		 * @param val damage behaviour ID
		 */
		setDamage: function(val) {
			gameplay[2] = parseInt(val, 10);
		},
		/**
		 * Returns sprite damage behaviour ID
		 * @return int
		 */
		getDamage: function() {
			return gameplay[2];
		},
		/**
		 * Set sprite behaviour on creation
		 * @param val creation behaviour ID
		 */
		setCreated: function(val) {
			gameplay[3] = parseInt(val, 10);
		},
		/**
		 * Returns sprite creation behaviour ID
		 * @return int
		 */
		getCreated: function() {
			return gameplay[3];
		},
		/**
		 * Sets sprite destruction behaviour
		 * @param val destruction behaviour ID
		 */
		setDestroyed: function(val) {
			gameplay[4] = parseInt(val, 10);
		},
		/**
		 * Returns sprite destruction behaviour ID
		 * @return int
		 */
		getDestroyed: function() {
			return gameplay[4];
		}
	};
};