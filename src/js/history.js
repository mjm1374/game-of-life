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

export function saveSeed(history, seeds) {
	seedBtn.disabled = true;
	let existingSeeds = parseSeedFromJSON(getLocalStorageSeeds());
	if (existingSeeds == undefined) existingSeeds = [];
	let seed = new Seed('seed' + Date.now(), history[0].fingerprint);
	seeds.push(seed);
	seeds = convertSeedToJSON(seeds);
	setLocalStorageSeeds(seeds);
}

export function getSeeds() {
	return getLocalStorageSeeds();
}

export default { updateHistory, addHistory, saveSeed, getSeeds };

//private

function convertSeedToJSON(seeds) {
	return JSON.stringify(seeds);
}

function parseSeedFromJSON(seeds) {
	return JSON.parse(seeds);
}

function getLocalStorageSeeds() {
	return localStorage.getItem(LOCAL_STORAGE_SEEDS);
}

function setLocalStorageSeeds(value) {
	localStorage.setItem(LOCAL_STORAGE_SEEDS, value);
}
