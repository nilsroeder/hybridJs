$(function() {
	$('<div id="hybridRoot">').appendTo("body");
	var game = hybridGame();
	game.init(0, 0, null);
	game.load("data/tutorial1.xml", game.start);
});