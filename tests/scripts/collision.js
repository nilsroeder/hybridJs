/**
 * Gameplay implementation of sprite related functions
 * Handles 
 * - sprite moves
 * - sprite animation events
 */
function hybridSpriteGameplay(spr) {
	var sprite = spr;
	
	var created1 = function(){
		if(sprite.getAnimation() !== null){
			sprite.getAnimation().start(0, 0, 'forward', -1, null);
		}
	};
	var movement1 = function(){
		sprite.setPosition(sprite.getPosition()[0]+sprite.getVelocity()[0], sprite.getPosition()[1]+sprite.getVelocity()[1]);
	};
	var damage1 = function(force){
		sprite.setVelocity(sprite.getVelocity()[0]*-1, sprite.getVelocity()[1]*-1);
	};
	
	return{
		getCreated: function(val){ return created1; },
		getDestroyed: function(val){},
		getMovement: function(val){ return movement1; },
		getImpact: function(val){},
		getDamage: function(val){ return damage1; }
	};
};

var fps = 0;
function fpsCounter(){
	fps++;
};

function start(){
	$('<div id="itext" style="background: #ddd; overflow: hidden; z-index: 1; width: 200px; height: 40px; position: absolute; margin-left: 700px; margin-top: -700px;">').appendTo("body");
	game.start(fpsDisplay);
};

function fpsDisplay(){
	var list = resourceManager.getSpritesByName("player");
	var player = list[0];
	runId = setInterval(function(){
		$('#itext').text("Sprites["+resourceManager.getSpriteList().length+"] FPS["+fps+"] POS["+player.getPosition()[0]+","+player.getPosition()[1]+"]");
        fps = 0;
    },1000);
	
};

var game;
//on page load
$(function() {
	$('<div id="hybridRoot">').appendTo("body");
	game = hybridGame();
	game.setDisplayHook( fpsCounter );
	game.init(0, 0, null);
	game.load("data/collision.xml", start);
});
