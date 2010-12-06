/**
 * Gameplay implementation of sprite related functions
 * Handles 
 * - sprite moves
 * - sprite animation events
 */
function hybridSpriteGameplay(spr) {
	var sprite = spr;
	
	//=======================CREATION==========================
	var created0 = function(){
		sprite.getAnimation().start(0, 0, 'forward', -1, null);
	};
	//=======================DESTRUCTION=======================
	var destroyed0 = function(){
	};
	//=======================MOVEMENT==========================
	var movement0 = function(){
		sprite.setPosition(sprite.getPosition()[0]+sprite.getVelocity()[0], sprite.getPosition()[1]+sprite.getVelocity()[1]);
	};
	//=======================IMPACT============================
	var impact0 = function(force){
	};
	//=======================DAMAGE============================
	var damage0 = function(force){
	};
	
	var pub = {};
	
	pub.getCreated = function(val){
		switch(val){
			case 0: return created0; break;
			default: return created0;
		}
	};
	
	pub.getDestroyed = function(val){
		switch(val){
			case 0: return destroyed0; break;
			default: return destroyed0;
		}
	};
	
	pub.getMovement = function(val) {
		switch(val){
			case 0: return movement0; break;
			default: return movement0;
		}
	};
	
	pub.getImpact = function(val) {
		switch(val){
			case 0: return impact0; break;
			default: return impact0;
		}
	};
	
	pub.getDamage = function(val) {
		switch(val){
			case 0: return damage0; break;
			default: return damage0;
		}
	};
	
	return pub;
};

var fps = 0;
function gameplay(){
	fps++;
};

var game;
function load() {
	$('<div id="hybridRoot" style="overflow: hidden; z-index: 0; width: 1010px; height: 735px; position: absolute; margin-left: 0px; margin-top: 0px;">').appendTo("body");
	game          = hybridGame();
	game.gameplay = gameplay;
	game.init(0, 0, null);
	game.load("data/tiles.xml", start);
};

function start(){
	$('<div id="itext" style="background: #ddd; overflow: hidden; z-index: 1; width: 200px; height: 40px; position: absolute; margin-left: 809px; margin-top: 1px;">').appendTo("body");
	game.start(frameCounter);
};

function frameCounter(){
	runId = setInterval(function(){
		$('#itext').text("Sprites["+resourceManager.getSpriteList().length+"] FPS["+fps+"]");
        fps = 0;
    },1000);
	
};

//on page load
$(function() {
	load();
});
