function playable(){
	var group = resourceManager.getSpritesByType('block');
	if( group.length < 1 ){
		var usertrigger = resourceManager.getTriggerByType('user');
		var count = Math.floor(Math.random()*usertrigger.length);
		usertrigger[count].triggerEvents();
	}
};

$(function() {
	$('<div id="hybridRoot">').appendTo("body");
	var game = hybridGame();
	game.init(0, 0, null);
	game.setGameplayHook(playable);
	game.load("data/tutorial5.xml", game.start);
	keyboardControls(game);
});
