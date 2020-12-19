// Event listeners
document.addEventListener('contextmenu', (event) => event.preventDefault());

stepBtn.addEventListener('click', () => {
	stepIteration();
});

runBtn.addEventListener('click', () => {
	if (runBtn.getAttribute('data-run') == 'true') {
		window.setRunTime = setInterval(stepIteration, 50);
		runBtn.setAttribute('data-run', false);
		runBtn.innerText = 'Stop';
	} else {
		clearInterval(window.setRunTime);
		runBtn.setAttribute('data-run', true);
		runBtn.innerText = 'Run';
	}
});

restBtn.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	clearInterval(window.setRunTime);
	runBtn.setAttribute('data-run', true);
	runBtn.innerText = 'Run';
	generation = 0;
	buildGrid();
});

for (let i = 0, len = paintRadios.length; i < len; i++) {
	paintRadios[i].addEventListener(
		'click',
		function () {
			paint = this.value == 'true' ? true : false;
			console.log(paint);
		},
		false
	);
}

canvas.addEventListener(
	'mousedown',
	(e) => {
		isDrawing = true;
		let x = e.pageX - elemLeft,
			y = e.pageY - elemTop;
		checkBoxesonClick(x, y, 'click');
	},
	false
);

canvas.addEventListener(
	'mouseup',
	() => {
		isDrawing = false;
	},
	false
);

canvas.addEventListener(
	'mouseleave',
	() => {
		isDrawing = false;
	},
	false
);

canvas.addEventListener(
	'mousemove',
	function (e) {
		if (isDrawing) {
			let x = e.pageX - elemLeft,
				y = e.pageY - elemTop;
			debounce(checkBoxesonClick(x, y, 'paint'), 250);
		}
	},
	false
);
