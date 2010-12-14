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
            constructor: Screen, 
            get gamesize() { return this._gamesize; },
            set gamesize(val) { this._gamesize = val; },
            get dimension() { return this._dimension; },
            set dimension(val) { this._dimension = val; },
            get position() { return this._position; },
            set position(val) { this._position = val; },
            publicUsingPrivate: function() {
                privateFunction.call(this);
            }
        }
    })();

    return Hybrid;
})(Hybrid || {});
