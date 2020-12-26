import { Seed } from './models.js';
import { resetGrid } from './index.js';
import { makeElement, resetRun } from './utils.js';
import {
	seedBtn,
	seedSelect,
	seedNameInput,
	renameBtn,
	deleteBtn,
	runBtn,
	LOCAL_STORAGE_SEEDS,
} from './vars.js';

export function getSeeds(item) {
	let seeds = checkForLocalSeeds();
	let i = 0;
	renameBtn.disabled = true;
	seedSelect.innerHTML = '<option value="" selected>Saved Seeds</option>';
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
	if (seeds == undefined) seeds = [];
	let seed = new Seed('seed' + Date.now(), history[0].fingerprint);
	seeds.push(seed);
	seeds = convertSeedToJSON(seeds);
	setLocalStorageSeeds(seeds);
	getSeeds();
}

export function loadSeed(seed) {
	let savedSeeds = checkForLocalSeeds();
	let updateSeed = savedSeeds[seed];
	seedNameInput.value = updateSeed.name;
	renameBtn.disabled = false;
	resetRun(runBtn);
	resetGrid(updateSeed.seed, seed);
}

export function renameSeed() {
	let seeds = checkForLocalSeeds();
	let seedLocation = seedSelect.value;
	let newName = seedNameInput.value;

	if (newName.trim().length > 0) {
		seeds[seedLocation].name = newName;
		seeds = convertSeedToJSON(seeds);
		setLocalStorageSeeds(seeds);
		seedNameInput.value = '';
		getSeeds(seedLocation);
	} else {
		alert('Can not have blank names.');
	}
}

export function deleteSeed() {
	let seeds = checkForLocalSeeds();
	let seedLocation = seedSelect.value;
	if (seedLocation != '') {
		seeds.splice(seedLocation, 1);
		seeds = convertSeedToJSON(seeds);
		setLocalStorageSeeds(seeds);
		seedNameInput.value = '';
		getSeeds();
	}
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

function checkForLocalSeeds() {
	let seeds = getLocalStorageSeeds();
	if (seeds) {
		return parseSeedFromJSON(seeds);
	} else {
		return [];
	}
}

seedSelect.addEventListener('change', function () {
	loadSeed(this.value);
});

renameBtn.addEventListener('mouseup', function () {
	renameSeed();
});

deleteBtn.addEventListener('mouseup', function () {
	deleteSeed();
});

export default { saveSeed, getSeeds };
