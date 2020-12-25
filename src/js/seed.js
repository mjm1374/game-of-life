import { Seed } from './models.js';
import { makeElement } from './utils.js';
import { seedBtn, seedSelect, LOCAL_STORAGE_SEEDS } from './vars.js';

export function getSeeds() {
	let savedSeeds = parseSeedFromJSON(getLocalStorageSeeds());

	let i = 0;
	savedSeeds.forEach((seed) => {
		let SeeedListItem = makeElement('option', 'seedlist');
		SeeedListItem.value = i;
		SeeedListItem.text = seed.name;
		seedSelect.appendChild(SeeedListItem);
		i++;
	});
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

export function loadSeed(seed) {
	let savedSeeds = parseSeedFromJSON(getLocalStorageSeeds());
	let updateSeed = savedSeeds[seed];
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
	console.log('changed', this.value);
	loadSeed(this.value);
});

export default { saveSeed, getSeeds };
