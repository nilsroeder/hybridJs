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

function pccontrols(){
	$(document).keydown(
            function(event) {
                switch (event.keyCode) {
                    // space bar
                    case 32:
                    	var sound = resourceManager.getSoundById("gun");
                    	sound.getSound().play();
                    break;
                    // left arrow key
                    case 37:
                    	audio.volume=10;
                    break;
                    // right arrow key
                    case 39:
                    	audio.volume(50);
                    break;
                    // 'p' for Pause / Continue
                    case 80:
                        if( game.isRunning() ) {
                            game.stop();
                        }
                        else{
                            game.run();
                        }
                    break;
                    // 'q' for Quit
                    case 81:
                        game.quit();
                    break;
                }
            });

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
	pccontrols();
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
	game.load("data/sound.xml", start);
});

