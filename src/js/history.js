import { History } from './models.js';
import { seedBtn } from './vars.js';

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
	history.setName = 'seed' + new Date();
	console.log(history);
	let seed = convertHistoryToJSON(history);
	console.log(seed);
}

export default { updateHistory, addHistory, saveSeed };

//private

function convertHistoryToJSON(history) {
	return JSON.stringify(history);
}
