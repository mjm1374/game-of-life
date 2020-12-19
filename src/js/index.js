const yearTag = document.getElementById('year');
const year = null;
let canvas = document.getElementById('canvas-container'),
	ctx = canvas.getContext('2d'),
	elemLeft = canvas.offsetLeft,
	elemTop = canvas.offsetTop,
	x = 0,
	y = 0,
	id = 0,
	offset = 10,
	canvasWidth = 1000,
	canvasHeight = 500,
	generation = 0,
	boxes = [],
	isDrawing = false,
	paint = true,
	genTarget = document.getElementById('gen'),
	stepBtn = document.querySelector('[data-step]'),
	runBtn = document.querySelector('[data-run]'),
	restBtn = document.querySelector('[data-reset]'),
	paintRadios = document.querySelectorAll('input[name="paint"]');

yearTag.innerText = new Date().getFullYear();

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
class Box {
	id = 0;
	x = 0;
	y = 0;
	fill = false;
	color = '#57b816';
	width = 20;
	height = 20;
	population = 0;

	constructor(id, x, y, fill, color, offset, population) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.fill = fill;
		this.width = offset;
		this.height = offset;
		this.population = population;
	}

	setPopulation(pop) {
		this.population = pop;
	}
}

function buildGrid() {
	setgeneration(generation);
	x = 0;
	y = 0;
	id = 0;
	boxes = [];

	while (x < canvasWidth) {
		while (y < canvasHeight) {
			let box = new Box(id, x, y, false, '#57b816', offset, 0);
			y = y + offset;
			id++;
			boxes.push(box);
			drawGrid(box);
		}
		y = 0;
		x = x + offset;
	}
}

document.fonts.ready.then(function () {
	buildGrid();
});

/**
 * Paints the grid item to the screen.
 */
function drawGrid(box) {
	ctx.clearRect(box.x, box.y, box.width, box.height);
	ctx.save();
	ctx.beginPath();
	ctx.rect(box.x, box.y, box.width, box.height);

	ctx.fillStyle = box.color;
	ctx.strokeStyle = '#56962a';
	box.fill ? ctx.fill() : ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

// Event listeners
document.addEventListener('contextmenu', (event) => event.preventDefault());

stepBtn.addEventListener('click', () => {
	stepIteration();
});

restBtn.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	clearInterval(window.setRunTime);
	runBtn.setAttribute('data-run', true);
	runBtn.innerText = 'Run';
	generation = 0;
	buildGrid();
});

for (let i = 0, len = paintRadios.length; i < len; i++) {
	paintRadios[i].addEventListener(
		'click',
		function () {
			paint = this.value == 'true' ? true : false;
			console.log(paint);
		},
		false
	);
}
// paintRadios.addEventListener('click', () => {
// 	for (const radio of paintRadios) {
// 		if (radio.checked) {
// 			paint = radio.value;
// 			break;
// 		}
// 	}
// });

canvas.addEventListener(
	'mousedown',
	(e) => {
		isDrawing = true;
		let x = e.pageX - elemLeft,
			y = e.pageY - elemTop;
		checkBoxesonClick(x, y, 'click');
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
	'mousemove',
	function (e) {
		if (isDrawing) {
			let x = e.pageX - elemLeft,
				y = e.pageY - elemTop;
			debounce(checkBoxesonClick(x, y, 'paint'), 250);
		}
	},
	false
);

function checkBoxesonClick(x, y, state) {
	boxes.forEach(function (box) {
		if (
			y > box.y &&
			y < box.y + box.width &&
			x > box.x &&
			x < box.x + box.height
		) {
			//console.log('clicked an element', box.id, box.x, box.y);
			state === 'click' ? flipColor(box, state) : paintColor(box, state);
		}
	});
}

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

runBtn.addEventListener('click', () => {
	if (runBtn.getAttribute('data-run') == 'true') {
		window.setRunTime = setInterval(stepIteration, 50);
		runBtn.setAttribute('data-run', false);
		runBtn.innerText = 'Stop';
	} else {
		clearInterval(window.setRunTime);
		runBtn.setAttribute('data-run', true);
		runBtn.innerText = 'Run';
	}
});

// adds and subtracts to the data set
function flipColor(gridItem) {
	let newbox = boxes.find((box) => box.id === gridItem.id);
	newbox.fill ? (newbox.fill = false) : (newbox.fill = true);
	boxes.splice(newbox.id, 1, newbox);
	drawGrid(newbox);
}

// adds and subtracts to the data set
function paintColor(gridItem) {
	let newbox = boxes.find((box) => box.id === gridItem.id);
	paint == true ? (newbox.fill = true) : (newbox.fill = false);
	boxes.splice(newbox.id, 1, newbox);
	debounce(drawGrid(newbox), 5000);
}

function updateData(gridItem, pop) {
	let newbox = boxes.find((box) => box.id === gridItem.id);
	newbox.population = pop;
	boxes.splice(newbox.id, 1, newbox);
	//console.log('boxes', boxes.length)
}

function stepIteration() {
	generation++;
	setgeneration(generation);
	let fill = false;
	boxes.forEach((box) => {
		let localPopulation = checkPopulated(box);
		box.population = localPopulation;
		updateData(box, localPopulation);
	});
	updateGrid();
}

function updateGrid() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	boxes.forEach((box) => {
		if (box.fill === false && box.population === 3) box.fill = true;
		if ((box.fill === true && box.population < 2) || box.population > 3)
			box.fill = false;
		drawGrid(box);
	});
}

function checkPopulated(box) {
	const boxId = box.id;
	const colPos = box.y;
	const rowPos = box.x;
	const testGridCol = [];
	const testGrid = [];
	const searchCoord = [-Math.abs(offset), 0, offset]; // use offset
	let population;

	for (let i = 0; i < 3; i++) {
		let searchCol = colPos + searchCoord[i];
		let thisCol = boxes.filter((box) => box.y == searchCol);
		testGridCol.push(...thisCol);
	}

	for (let i = 0; i < 3; i++) {
		let searchRow = rowPos + searchCoord[i];
		let thisCol = testGridCol.filter((box) => box.x == searchRow);
		testGrid.push(...thisCol);
	}

	const center = testGrid.find((box) => box.id === boxId);
	testGrid.splice(testGrid.indexOf(center), 1);
	population = testGrid.reduce((a, b) => ({ fill: a.fill + b.fill }));
	return population.fill;
}

function setgeneration(gen) {
	genTarget.innerText = `Generation: ${gen}`;
}
