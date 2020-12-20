import * as vars from './vars.js';

export function getWindowOffset() {
	return { left: vars.canvas.offsetLeft, top: vars.canvas.offsetTop };
}

export function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		let context = this,
			args = arguments;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export function checkPopulated(boxes, box) {
	const boxId = box.id;
	const colPos = box.y;
	const rowPos = box.x;
	const testGridCol = [];
	const testGrid = [];
	const searchCoord = [-Math.abs(vars.offset), 0, vars.offset];
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

export function resetRun(runBtn) {
	clearInterval(window.setRunTime);
	runBtn.setAttribute('data-run', true);
	runBtn.classList.remove('isRunning');
	runBtn.classList.add('isStopped');
	runBtn.innerText = 'Run';
}
/**
 * Check the state of the box currently clicked
 * @param {*} x
 * @param {*} y
 * @param {*} state
 */
export function checkBoxesOnClick(boxes, x, y, state, paint) {
	boxes.forEach(function (box) {
		if (
			y > box.y &&
			y < box.y + box.width &&
			x > box.x &&
			x < box.x + box.height
		) {
			//console.log('clicked an element', box.id, box.x, box.y);
			state === 'click'
				? flipColor(boxes, box, state)
				: paintColor(boxes, box, paint);
		}
	});
}

/**
 * Paints a (1) grid item to the screen. I basically put a box on the canvas
 */
export function drawGrid(box) {
	vars.ctx.clearRect(box.x, box.y, box.width, box.height);
	vars.ctx.save();
	vars.ctx.beginPath();
	vars.ctx.rect(box.x, box.y, box.width, box.height);
	vars.ctx.fillStyle = box.color;
	vars.ctx.strokeStyle = '#56962a';
	box.fill ? vars.ctx.fill() : vars.ctx.stroke();
	vars.ctx.closePath();
	vars.ctx.restore();
}

export function checkStatic(a, b) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
}

//private

// adds and subtracts to the data set
function flipColor(boxes, gridItem) {
	let newbox = boxes.find((box) => box.id === gridItem.id);
	newbox.fill ? (newbox.fill = false) : (newbox.fill = true);
	boxes.splice(newbox.id, 1, newbox);
	drawGrid(newbox);
}

// adds and subtracts to the data set
function paintColor(boxes, gridItem, paint) {
	let newbox = boxes.find((box) => box.id === gridItem.id);
	paint == true ? (newbox.fill = true) : (newbox.fill = false);
	boxes.splice(newbox.id, 1, newbox);
	debounce(drawGrid(newbox), 5000);
}
