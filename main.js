//Funcion anonima del primer objeto del Board
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();

//
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
    }
})();

//Funcion principal para ejecutar todos los elementos
function main()
{

}