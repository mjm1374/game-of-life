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
/// |
///  |
//   \/
//seeds need to be set to an array and passed in. this is in works and your drunk so we are leaving you a note. Seeds to be parsed to an object with individual seeds in them nad then save out to JSON
export function saveSeed(history) {
	let existingSeeds = parseSeedFromJSON(getLocalStorage());
	if (existingSeeds == undefined) existingSeeds = [];
	console.log(existingSeeds);
	let seed = new Seed('seed' + Date.now(), history[0].fingerprint);
	seed = convertSeedToJSON(seed);
	setLocalStorage(seed);
}

export function getSeeds() {
	return getLocalStorage();
}

export default { updateHistory, addHistory, saveSeed, getSeeds };

//private

function convertSeedToJSON(seeds) {
	return JSON.stringify(seeds);
}

function parseSeedFromJSON(seeds) {
	return JSON.parse(seeds);
}

function getLocalStorage() {
	return localStorage.getItem(LOCAL_STORAGE_SEEDS);
}

function setLocalStorage(value) {
	localStorage.setItem(LOCAL_STORAGE_SEEDS, value);
}
