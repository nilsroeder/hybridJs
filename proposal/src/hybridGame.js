var Hybrid = (function(Hybrid) {
    var Game = Hybrid.Game = function(name) {
        this.name = name || 'game';
    }
    Game.prototype.start = function() {
        console.info('starting the game');
    }

    return Hybrid;
})(Hybrid || {});
