export class Box {
	id = 0;
	x = 0;
	y = 0;
	fill = false;
	color = '#57b816';
	width = 20;
	height = 20;
	population = 0;

	constructor(id, x, y, fill, color, offset, population) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.fill = fill;
		this.width = offset;
		this.height = offset;
		this.population = population;
	}

	setPopulation(pop) {
		this.population = pop;
	}
}

export class History {
	gen;
	fingerprint = [];

	constructor(id) {
		this.gen = id;
	}

	updatePrint(data) {
		this.fingerprint.push(data);
	}
}

export default {
	Box,
	History,
};
