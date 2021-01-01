import { History } from './models.js';
import { seedBtn, HISTORY_DEPTH } from './vars.js';

export function updateHistory(history, grid, gen) {
	if (gen === 0) seedBtn.disabled = false;
	let thisHistory = history[gen];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			let box = grid[i][j];
			box.alive == true ? (print = 1) : (print = 0);
			thisHistory.fingerprint.push(print);
		}
	}
}

export function checkStatic(history, generation) {
	let a,
		b,
		loopLimit = null,
		status = null;

	a = history[generation - 1].fingerprint;
	generation > HISTORY_DEPTH
		? (loopLimit = generation - HISTORY_DEPTH)
		: (loopLimit = 1);

	for (let i = generation - 2; i >= loopLimit; i--) {
		b = history[i].fingerprint;
		if (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.reduce((x, y) => x + y, 0) === b.reduce((x, y) => x + y, 0) &&
			a.every((val, index) => val === b[index])
		) {
			generation - i === 1 ? (status = 'static') : (status = 'ocilating');
			break;
		}
	}
	return status;
}

export function addHistory(history, gen) {
	history.push(new History(gen));
}

export default { updateHistory, addHistory, checkStatic };
