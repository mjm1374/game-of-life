let canvas = document.getElementById('canvas-container');
let ctx = canvas.getContext('2d'),
elemLeft = canvas.offsetLeft,
elemTop = canvas.offsetTop,
x = 0,
y = 0,
id = 0,
offset = 20,
canvasWidth = 1000,
canvasHeight = 500
generation = 0;
let boxes = [];
let nextGenBoxes = boxes;

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
    population = 0;

    constructor(id, x, y, fill, color, offset, population){
        this.id = id;
        this.x = x;
        this.y = y; 
        this.fill = fill;
        this.width = offset;
        this.height = offset;
        this.population = population;
    }

    setPopulation(pop){
        this.population = pop;
    }
}

function buildGrid(){
    while (x < canvasWidth) {
        let column = [];
        while (y < canvasHeight){
            let box =  new Box(id, x, y, false,'#000', offset, 0);
            y = y + offset;
            id++;
            boxes.push(box);
            column.push(box);
            drawGrid(box);
        }
        y = 0;
        x = x + offset;
    }
}

buildGrid();

/**
 * Paints the grib item to the screen.
 */
function drawGrid(box) {
	ctx.save();
	ctx.beginPath();
	ctx.rect(
		box.x,
        box.y,
        box.width,
		box.height
    );
    
    ctx.fillStyle = box.color;
    (box.fill) ? ctx.fill() : ctx.stroke();
	ctx.closePath();
	ctx.restore();
}


// Event listeners
let stepBtn = document.querySelector('[data-step]');
stepBtn.addEventListener('click', () => {
    stepIteration();
});


canvas.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    //console.log(x, y);
    boxes.forEach(function(box) {
        if (y > box.y && y < box.y + box.width && x > box.x && x < box.x + box.height) {
            console.log('clicked an element', box.id, box.x, box.y);
            flipColor(box);
        }
    });
}, false);

// adds and subtracts to the data set
function flipColor(gridItem){
    let newbox = boxes.find(box => box.id === gridItem.id);
    (newbox.fill) ? newbox.fill = false : newbox.fill = true; 
    boxes.splice(newbox.id, 1, newbox);
    drawGrid(newbox);
    // updateGrid();
}

function updateData(gridItem, pop){
    let newbox = nextGenBoxes.find(box => box.id === gridItem.id);
    newbox.population = pop;
    nextGenBoxes.splice(newbox.id, 1, newbox);
}

function stepIteration(){
    generation++;
    let fill = false;
    boxes.forEach((box) => {
        let localPopulation = checkPopulated(box);
        box.population = localPopulation;
        updateData(box,  localPopulation);
    })

    updateGrid();
}

function updateGrid(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach((box) => {
        if(box.fill === false && box.population === 3) box.fill = true;
        if(box.fill === true && box.population < 2 || box.population > 3) box.fill = false;
        drawGrid(box)
    });
    
}

function checkPopulated(box){
    const boxId = box.id;
    const colPos = box.y;
    const rowPos = box.x;
    const testGridCol = [];
    const testGrid = [];
    const searchCoord = [-20, 0, 20]; // use offset
    let population;

    for (let i = 0; i < 3; i++) {
        let searchCol = colPos + searchCoord[i];
        let thisCol = boxes.filter((box) => box.y == searchCol );
        testGridCol.push(...thisCol);
    }

    for (let i = 0; i < 3; i++) {
        let searchRow = rowPos + searchCoord[i];
        let thisCol = testGridCol.filter((box) => box.x == searchRow );
        testGrid.push(...thisCol);
    }
    
    const center = testGrid.find(box => box.id === boxId);
    testGrid.splice(testGrid.indexOf(center), 1);
    population = testGrid.reduce((a, b) => ({fill: a.fill + b.fill}));
    return population.fill;
}
