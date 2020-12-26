import { History, Seed } from './models.js';
import { seedBtn, LOCAL_STORAGE_SEEDS } from './vars.js';

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

export function addHistory(history, gen) {
	history.push(new History(gen));
}

export default { updateHistory, addHistory };
