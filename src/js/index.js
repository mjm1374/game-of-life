let canvas = document.getElementById('canvas-container');
let ctx = canvas.getContext('2d'),
elemLeft = canvas.offsetLeft,
elemTop = canvas.offsetTop,
x = 0,
y = 0,
id = 0,
offset = 20,
canvasWidth = 1000,
canvasHeight = 500;
const boxes = [];

ctx.canvas.width  = canvasWidth;
ctx.canvas.height = canvasHeight;


class Box{
    id = 0;
    x = 0;
    y = 0;
    fill = false;
    color = '#000';
    width = 20;
    height = 20;

    constructor(id, x, y, fill, color, offset){
        this.id = id,
        this.x = x,
        this.y = y,
        this.fill = fill
        this.width = offset;
        this.height = offset;
    }
}

function buildGrid(){
    while (x < canvasWidth) {
        while (y < canvasHeight){
            let box =  new Box(id, x, y, false,'#000', offset);
            y = y + offset;
            id++;
            console.log(x, y);
            boxes.push(box);
            drawGrid(box);
        }
        y = 0;
        x = x + offset;
    }
}

buildGrid();
console.log(boxes);

canvas.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    //console.log(x, y);
    boxes.forEach(function(box) {
        //console.log( box.x, box.y,  box.x + box.height, box.y + box.width);
       // if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width)

        if (y > box.y && y < box.y + box.width && x > box.x && x < box.x + box.height) {

            //console.log('clicked an element', box.id, box.x, box.y);
            flipColor(box);
        }
    });

}, false);

function flipColor(boxx){
    let newbox = boxes.find(box => box.id === boxx.id);
    (newbox.fill) ? newbox.fill = false : newbox.fill = true;
    boxes.splice(newbox.id, 1, newbox);
    drawGrid(newbox);
}

/**
 * Paints the spacehip to the screen.
 */
function drawGrid(box) {
	ctx.save();
	ctx.beginPath();
	//ctx.translate(box.x, box.y);
	ctx.rect(
		box.x,
        box.y,
        box.width,
		box.height
	);
    ctx.fillStyle = box.color;

    (box.fill) ? ctx.fill() : ctx.stroke();
    //ctx.fill(); 
    
	ctx.closePath();

	ctx.restore();
}
