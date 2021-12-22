let cells = document.querySelectorAll('#field td');
start(cells);
let i = 0;
var l = document.getElementById('tictactoewin');
var dis = 0;

function start(cells) {
	//let i = 0;
	
	for (let cell of cells) {
		cell.addEventListener('click', function() {
            if (cell.innerHTML === '' && dis !== 1) {
			cell.innerHTML = ['X', 'O'][i % 2];
            if (isVictory(cells) && dis !== 1) {
				//alert(cell.innerHTML, 'победил!');
				dis = 1;
				l.innerText = cell.innerHTML + ' победил!';
			} else if (i == 8) {
				dis = 1;
				l.innerText = 'Ничья';
			}
            i++
        }
		});
	}
}

function init(selector) {
	let cells = document.querySelectorAll('#field td');
	let i = 0;
	
	for (let cell of cells) {
		cell.addEventListener('click', function step() {
			if (dis !== 1) { 
			cell.innerHTML = ['X', 'O'][i % 2];
			cell.removeEventListener('click', step);

			// здесь мы должны проверять победу или ничью

			i++;
		}
		});
	}
}

let combs = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function isVictory(cells) {
	let combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let comb of combs) {
		if (
			cells[comb[0]].innerHTML == cells[comb[1]].innerHTML &&
			cells[comb[1]].innerHTML == cells[comb[2]].innerHTML &&
			cells[comb[0]].innerHTML != ''
		) {
			return true;
		}
	}
	
	return false;
}

let gamers = ['X', 'O'];
let key = i % 2;

var g = document.getElementById(field);


console.log(gamers[key]);