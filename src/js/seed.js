import { Seed } from './models.js';
import { makeElement } from './utils.js';
import {
	seedBtn,
	seedSelect,
	seedNameInput,
	LOCAL_STORAGE_SEEDS,
} from './vars.js';

export function getSeeds() {
	let seeds = checkForLocalSeeds();
	let i = 0;
	seedSelect.innerHTML = '';
	seeds.forEach((seed) => {
		let SeeedListItem = makeElement('option', 'seedlist');
		SeeedListItem.value = i;
		SeeedListItem.text = seed.name;
		seedSelect.appendChild(SeeedListItem);
		i++;
	});
}

export function saveSeed(history) {
	seedBtn.disabled = true;
	let seeds = checkForLocalSeeds();
	console.log(seeds);
	if (seeds == undefined) seeds = [];
	let seed = new Seed('seed' + Date.now(), history[0].fingerprint);
	seeds.push(seed);
	console.log(seeds);
	seeds = convertSeedToJSON(seeds);
	setLocalStorageSeeds(seeds);
	getSeeds();
}

export function loadSeed(seed) {
	let savedSeeds = parseSeedFromJSON(getLocalStorageSeeds());
	let updateSeed = savedSeeds[seed];
	seedNameInput.value = updateSeed.name;
	console.log(updateSeed);
}

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

seedSelect.addEventListener('change', function () {
	loadSeed(this.value);
});

function checkForLocalSeeds() {
	let seeds = getLocalStorageSeeds();
	if (seeds.length > 0) {
		return parseSeedFromJSON(seeds);
	} else {
		return [];
	}
}

export default { saveSeed, getSeeds };
