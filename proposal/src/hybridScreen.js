var Hybrid = (function(Hybrid) {
    var Screen = Hybrid.Screen = function() {
        this.gamesize = [0, 0];
        this.dimension = [0, 0];
        this.position = [0, 0];
    }

    Screen.prototype = (function() {
        function privateFunction() {
            console.info('i\'m private ' + this.dimension[0]);
        }

        return {
            constructor: Screen, // !!!: constructor is statement important 
            setGameDimension: function(w, h) {
                this.gamesize[Hybrid.WIDTH] = w;
                this.gamesize[Hybrid.HEIGHT] = h;
            },
            getGameDimension: function() {
                return this.gamesize;
            },
            setPosition: function(x, y) {
                this.position[Hybrid.X] = x;
                this.position[Hybrid.Y] = y;
            },
            publicUsingPrivate: function() {
                // !!!: note the *.call(this)
                privateFunction.call(this);
            }
        }
    })();

    return Hybrid;
})(Hybrid || {});
