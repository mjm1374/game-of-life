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

export function checkPopulation(grid, x, y) {
	const colCnt = vars.canvasWidth / vars.offset - 1;
	const rowCnt = vars.canvasHeight / vars.offset - 1;
	let population = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let thisCol = (x + i + colCnt) % colCnt;
			let thisRow = (y + j + rowCnt) % rowCnt;
			let neighbor = grid[thisCol][thisRow];
			population += neighbor.alive;
		}
	}
	let center = grid[x][y];
	population -= center.alive;
	return population;
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
export function checkBoxesOnClick(grid, x, y, state, paint) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			let box = grid[i][j];
			if (
				y > box.y &&
				y < box.y + box.width &&
				x > box.x &&
				x < box.x + box.height
			) {
				state === 'click'
					? flipColor(grid, i, j)
					: paintColor(grid, i, j, paint);
				break;
			}
		}
	}
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
	box.alive ? vars.ctx.fill() : vars.ctx.stroke();
	vars.ctx.closePath();
	vars.ctx.restore();
}

export function checkStatic(a, b, c = null) {
	return (
		(Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index])) ||
		(Array.isArray(a) &&
			Array.isArray(c) &&
			a.length === c.length &&
			a.every((val, index) => val === c[index]))
	);
}

//private

// adds and subtracts to the data set
function flipColor(grid, x, y) {
	let newbox = grid[x][y];
	newbox.alive ? (newbox.alive = false) : (newbox.alive = true);
	grid[x][y] = newbox;
	debounce(drawGrid(newbox), 5000);
}

// adds and subtracts to the data set
function paintColor(grid, x, y, paint) {
	let newbox = grid[x][y];
	paint == true ? (newbox.alive = true) : (newbox.alive = false);
	grid[x][y] = newbox;
	debounce(drawGrid(newbox), 5000);
}
