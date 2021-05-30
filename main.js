//Funcion anonima del primer objeto modelo del Board
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    //Se crea para obtener los prototipos Getter de la clase Board
    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            //elements.push(this.ball);
            return elements;
        }
    }
})();

//Constructor de la clase Bar
(function(){
    self.Bar = function(x,y,width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }

    //Para mover las barras
    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+this.x+" y: "+this.y;
        }
    }
})();

//Clase para dibujar las vistas del board
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.context = canvas.getContext("2d");
    }

    self.BoardView.prototype={
        draw: function(){
            for (var i = this.board.elements.length -1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.context,el);
            };
        }
    }

    function draw(context,element){
        switch(element.kind){
            case "rectangle":
                context.fillRect(element.x,element.y, element.width,element.height);
                break;
        }             
    }
})();

var board = new Board(800,400);
var bar = new Bar(20,100,20,100,board);
var bar_2 = new Bar(760,100,20,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);

window.requestAnimationFrame(controller);

//Configuracion para mover la barra
document.addEventListener("keydown", function(ev){
    if(ev.keyCode == 38){
        bar.up();
    }
    else if(ev.keyCode == 40){
        bar.down();
    }
    if(ev.keyCode === 87){
        //W
        bar_2.up();
    }
    else if(ev.keyCode === 83){
        //S
        bar_2.down();
    }

    console.log(bar.toString());
});

//window.addEventListener("load",main);
window.requestAnimationFrame(controller);

//Funcion principal para ejecutar todos los elementos
function controller()
{
    board_view.draw();
    window.requestAnimationFrame(controller);
}