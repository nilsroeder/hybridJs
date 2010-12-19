/**
 * Gameplay implementation of sprite related functions
 * Handles 
 * - sprite moves
 * - sprite animation events
 */
function hybridSpriteGameplay(spr) {
	var sprite = spr;
	
	var created1 = function(){
		sprite.getAnimation().start(0, 0, 'forward', -1, null);
	};
	var movement1 = function(){
		sprite.setPosition(sprite.getPosition()[0]+sprite.getVelocity()[0], sprite.getPosition()[1]+sprite.getVelocity()[1]);
	};
	
	return{
		getCreated: function(val){ return created1; },
		getDestroyed: function(val){},
		getMovement: function(val){ return movement1; },
		getImpact: function(val){},
		getDamage: function(val){}
	};
};

function drawTriggerBoxes(){
	var triggerList = resourceManager.getTriggerByType("coordinate");
	var context = resourceManager.getScreen().getContext();
	context.strokeStyle = '#f00';
	context.lineWidth   = 1;
	$.each(triggerList, function(index, trigger){
		context.strokeRect(trigger.getPosition()[0], trigger.getPosition()[1], trigger.getDimension()[0], trigger.getDimension()[1]);
	});
};

var fps = 0;
function fpsCounter(){
	fps++;
	drawTriggerBoxes();
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
	game.load("data/trigger.xml", start);
});
