//Funcion anonima del primer objeto modelo del Board
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }

    //Se crea para obtener los prototipos Getter de la clase Board
    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();

//Funcion de la pelota, constructor
(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";        
    }

    //Funcion para mover la pelota
    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
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
        //limpia para ver el movimiento de la barra
        clean: function(){
            this.context.clearRect(0,0,this.board.width, this.board.height);
        },
        draw: function(){
            for (var i = this.board.elements.length -1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.context,el);
            };
        },
        //Metodo para jugar, limpia y dibuja el board
        play: function(){
            if(this.board.playing){
                this.clean();
                this.draw();
                this.board.ball.move();
            }            
        }
    }

    //Funcion que dibuja el board
    function draw(context,element){
        switch(element.kind){
            case "rectangle":
                context.fillRect(element.x,element.y, element.width,element.height);
                break;
            case "circle":
                context.beginPath();
                context.arc(element.x,element.y,element.radius,0,7);
                context.fill();
                context.closePath();
                break;
        }             
    }
})();

var board = new Board(800,400);
var bar = new Bar(20,100,20,100,board);
var bar_2 = new Bar(760,100,20,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new Ball(300, 100, 10, board);

window.requestAnimationFrame(controller);

//Configuracion para mover la barra
document.addEventListener("keydown", function(ev){
    if(ev.keyCode == 87){
        //W
        bar.up();
    }
    else if(ev.keyCode == 83){
        //S
        bar.down();
    }
    if(ev.keyCode === 38){
        //up
        bar_2.up();
    }
    else if(ev.keyCode === 40){
        //down
        bar_2.down();
    }
    else if(ev.keyCode === 32){
        ev.preventDefault();
        board.playing = !board.playing;
    }
});

//window.addEventListener("load",main);
window.requestAnimationFrame(controller);

//Funcion principal para ejecutar todos los elementos
function controller()
{
    board_view.play();
    window.requestAnimationFrame(controller);
}