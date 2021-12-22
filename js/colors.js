let field = document.querySelector('#field');
start(2);
var k = 1;
var o = 1;
var clocker = document.clockform.clock
var level = parseInt(1);
document.getElementById('score').textContent = level;


function start(size) {
	activate(build(field, prepare(size)), size);
}

function build(field, arr) {
	field.innerHTML = '';
	let cells = [];

	for (let sub of arr) {
		let tr = document.createElement('tr');

		for (let num of sub) {
			let td = document.createElement('td');
			td.innerHTML = num;
			tr.appendChild(td);

			cells.push(td);
		}

		field.appendChild(tr);
	}

	return cells;
}

function activate(cells, size) {
	let counter = 1;

	for (let cell of cells) {
		cell.addEventListener('click', function () {
			if (this.innerHTML == counter) {
				this.classList.add('active');
				findTIME();
				o = 0;

				if (counter == size * size) {
					start(++size);
				}

				counter++;
			}
		});
	}
}

function prepare(size) {
	let arr = [];
	level = level + 1
	document.getElementById('score').textContent = level;
	arr = range(size * size);
	arr = shuffle(arr);
	arr = chunk(arr, size);

	return arr;
}

function range(count) {
	let arr = [];

	for (let i = 1; i <= count; i++) {
		arr.push(i);
	}

	return arr;
}

function shuffle(arr) {
	let result = [];
	let length = arr.length;

	for (let i = 0; i < length; i++) {
		let random = getRandomInt(0, arr.length - 1);
		let elem = arr.splice(random, 1)[0];
		result.push(elem);
	}

	return result;
}

function chunk(arr, n) {
	let result = [];
	let count = Math.ceil(arr.length / n);

	for (let i = 0; i < count; i++) {
		let elems = arr.splice(0, n);
		result.push(elems);
	}

	return result;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trim(string) { return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
var init = 0;
var startDate;
var clocktimer;

function clearFields() {
	init = 0;
	clearTimeout(clocktimer);
	document.clockform.clock.value = '00:00:00.00';
	document.clockform.label.value = '';
}

function clearALL() {
	clearFields();
	document.getElementById('marker').innerHTML = '';
}

function startTIME() {
	if (k == 1) {
		var thisDate = new Date();
		var t = thisDate.getTime() - startDate.getTime();
		var ms = t % 1000; t -= ms; ms = Math.floor(ms / 10);
		t = Math.floor(t / 1000);
		var s = t % 60; t -= s;
		t = Math.floor(t / 60);
		var m = t % 60; t -= m;
		t = Math.floor(t / 60);
		var h = t % 60;
		if (h < 10) h = '0' + h;
		if (m < 10) m = '0' + m;
		if (s < 10) s = '0' + s;
		if (ms < 10) ms = '0' + ms;
		if (init == 1) document.clockform.clock.value = h + ':' + m + ':' + s + '.' + ms;
		clocktimer = setTimeout("startTIME()", 10);
	}
}

function findTIME() {
	if (o == 1) {
		if (init == 0) {
			startDate = new Date();
			startTIME();
			init = 1;
		}
	}
}

function Disable() {
	k = 0;
	field.className = "disabled"
}



document.addEventListener('keydown', function (event) {
	if (event.code == 'KeyM' && (event.ctrlKey || event.metaKey)) {
		start(level+2);
	}
});