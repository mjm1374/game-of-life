import { History, Seed } from './models.js';
import { seedBtn, LOCAL_STORAGE_SEEDS } from './vars.js';

export function updateHistory(history, boxes, gen) {
	if (gen === 0) seedBtn.disabled = false;
	let thisHistory = history[gen];
	boxes.forEach((box) => {
		box.fill == true ? (print = 1) : (print = 0);
		thisHistory.fingerprint.push(print);
	});
}

export function addHistory(history, gen) {
	history.push(new History(gen));
}

export function saveSeed(history) {
	console.log(history);
	let seed = new Seed('seed' + Date.now(), history[0].fingerprint);
	console.log('XXX', seed);
	seed = convertHistoryToJSON(seed);
	setLocalStorage(seed);
	console.log(seed);
}

export function getSeeds() {
	return getLocalStorage();
}

export default { updateHistory, addHistory, saveSeed, getSeeds };

//private

function convertHistoryToJSON(seeds) {
	return JSON.stringify(seeds);
}

function parseHistoryToJSON(seeds) {
	return JSON.parse(seeds);
}

function getLocalStorage() {
	return localStorage.getItem(LOCAL_STORAGE_SEEDS);
}

function setLocalStorage(value) {
	localStorage.setItem(LOCAL_STORAGE_SEEDS, value);
}
