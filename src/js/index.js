import * as vars from './vars.js';
import { Box } from './models.js';
import { saveSeed, addHistory, updateHistory, getSeeds } from './history.js';
import {
	getWindowOffset,
	checkPopulation,
	resetRun,
	debounce,
	checkBoxesOnClick,
	drawGrid,
	checkStatic,
} from './utils.js';

const yearTag = vars.yearTag;
let canvas = vars.canvas,
	ctx = vars.ctx,
	elemLeft = vars.elemLeft,
	elemTop = vars.elemTop,
	x = vars.x,
	y = vars.y,
	id = vars.id,
	offset = vars.offset,
	canvasWidth = vars.canvasWidth,
	canvasHeight = vars.canvasHeight,
	generation = vars.generation,
	boxes = [],
	history = [],
	seeds = [],
	grid,
	isDrawing = false,
	paint = true,
	genTarget = vars.genTarget,
	stepBtn = vars.stepBtn,
	runBtn = vars.runBtn,
	restBtn = vars.restBtn,
	seedBtn = vars.seedBtn,
	paintRadios = vars.paintRadios;

yearTag.innerText = new Date().getFullYear();

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

function create2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

/**
 * Poplulat the array with the default values
 */
function resetGrid() {
	x = 0;
	y = 0;
	grid = create2DArray(canvasWidth / offset, canvasHeight / offset);
	let x2 = 0;
	let y2 = 0;
	id = 0;
	boxes = [];
	history = [];
	setGeneration(generation);
	getSeeds();
	addHistory(history, generation);
	while (x < canvasWidth) {
		while (y < canvasHeight) {
			let box = new Box(id, x, y, false, '#57b816', offset, 0);
			boxes.push(box);
			grid[x2][y2] = box;
			y = y + offset;
			y2 += 1;
			id++;
			drawGrid(box);
		}
		y = 0;
		y2 = 0;
		x = x + offset;
		x2 += 1;
	}
}

/**
 * I update a single data point in Boxes{}
 * @param {*} gridItem
 * @param {*} pop
 */
function updateData(gridItem, pop) {
	let print = null;
	let newbox = boxes.find((box) => box.id === gridItem.id);
	newbox.population = pop;
	boxes.splice(newbox.id, 1, newbox);
	gridItem.fill == true ? (print = 1) : (print = 0);
}

function stepIteration() {
	//console.table(grid[1][1]);
	updateHistory(history, boxes, generation);
	generation++;
	setGeneration(generation);
	addHistory(history, generation);
	let fill = false;
	// boxes.forEach((box) => {
	// 	let localPopulation = checkPopulation(boxes, box);
	// 	box.population = localPopulation;
	// 	updateData(box, localPopulation);
	// });

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			let box = grid[i][j];
			let localPopulation = checkPopulation(grid, box, i, j);
			box.population = localPopulation;
			updateData(box, localPopulation);
		}
	}

	let isStatic = false;
	let historyObj1 = history[generation - 1];
	let historyObj2 = history[generation - 2];
	if (generation >= 2) {
		isStatic = checkStatic(
			historyObj1.fingerprint,
			historyObj2.fingerprint
		);
	}

	if (!isStatic) {
		updateGrid();
	} else {
		resetRun(runBtn);
	}
}

function updateGrid() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// boxes.forEach((box) => {
	// 	if (box.fill === false && box.population === 3) box.fill = true;
	// 	if ((box.fill === true && box.population < 2) || box.population > 3)
	// 		box.fill = false;
	// 	drawGrid(box);
	// });

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			let box = grid[i][j];
			if (box.fill === false && box.population === 3) box.fill = true;
			if ((box.fill === true && box.population < 2) || box.population > 3)
				box.fill = false;
			drawGrid(box);
		}
	}
}

function setGeneration() {
	genTarget.innerText = `Generation: ${generation}`;
}

document.fonts.ready.then(function () {
	elemLeft = getWindowOffset().left;
	elemTop = getWindowOffset().top;
	resetGrid();
});

// Event listeners
document.addEventListener('contextmenu', (event) => event.preventDefault());

stepBtn.addEventListener('click', () => {
	stepIteration();
});

runBtn.addEventListener('click', () => {
	if (runBtn.getAttribute('data-run') == 'true') {
		window.setRunTime = setInterval(stepIteration, vars.SPEED);
		runBtn.setAttribute('data-run', false);
		runBtn.innerText = 'Stop';
		runBtn.classList.remove('isStopped');
		runBtn.classList.add('isRunning');
	} else {
		resetRun(runBtn);
	}
});

restBtn.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	resetRun(runBtn);
	generation = 0;
	resetGrid();
});

seedBtn.addEventListener('click', () => {
	let seed = history[0];
	saveSeed(history);
});

for (let i = 0, len = paintRadios.length; i < len; i++) {
	paintRadios[i].addEventListener(
		'click',
		function () {
			paint = this.value == 'true' ? true : false;
		},
		false
	);
}

canvas.addEventListener(
	'mousedown',
	(e) => {
		isDrawing = true;
		let x = e.pageX - elemLeft,
			y = e.pageY - elemTop;
		resetRun(runBtn);
		checkBoxesOnClick(boxes, x, y, 'click', paint);
	},
	false
);

canvas.addEventListener(
	'mouseup',
	() => {
		isDrawing = false;
	},
	false
);

canvas.addEventListener(
	'mouseleave',
	() => {
		isDrawing = false;
	},
	false
);

canvas.addEventListener(
	'mousemove',
	function (e) {
		if (isDrawing) {
			let x = e.pageX - elemLeft,
				y = e.pageY - elemTop;
			debounce(checkBoxesOnClick(boxes, x, y, 'paint', paint), 250);
		}
	},
	false
);

window.addEventListener('resize', () => {
	getWindowOffset();
});
