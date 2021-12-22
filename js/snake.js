// ����, �� ������� �� ����� �����������, � ���� ��� �� ����������
var canvas = document.getElementById('game');
// ������������ ������ � ����������, ������� ����� ��
var context = canvas.getContext('2d');
// ������ ����� �������� �� ���� � 16 ��������
var grid = 32;
// ��������� ����������, ������� �������� �� �������� ������
var count = 0;
var scoreelem = document.getElementById("score");
var lengthelem = document.getElementById("length");
var score = 0;
var kill = 0;
var speed = 15
// � ��� � ���� ������
var snake = {
    // ��������� ����������
    x: 160,
    y: 160,
    // �������� ������ � � ������ ����� ����� ������ ��������� �� ��� � ��� �. �� ������ ����� ��������� �������������, ������� �������� �� ������ ����� ����.
    dx: 32,
    dy: 0,
    // ����� �� ����� �����, ������� ���� ������
    cells: [],
    // ��������� ����� ������ � 4 ��������
    maxCells: 4
};
// � ��� � ���. ����������, ��� ��� ������� ������.
var apple = {
    // ��������� ���������� ������
    x: 320,
    y: 320
};
// ������ ��������� ��������� ����� � �������� ���������
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// ������� ���� � �������� �������, ������ �������� ����� �� �����������
function loop() {
    
    // ������ �������, ������� ��������� �������� ���� � 60 ������ � ������� �� 15 (60/15 = 4)
    requestAnimationFrame(loop);
    // ������� ��� ���������� ������ ���� ��� �� ������, � ���� � ���� ���������� ������, � ���� ���������� count ������ ������, ��� ����������� �� �����
    

    if (10 - Math.floor(score / 10) >= 4) {
        speed = 10 - Math.floor(score / 10)
    }

    // if (++count < speed) {
        if (++count < speed) {
        return;
    }

    // �������� ���������� ��������
    count = 0;
    // ������� ������� ����
    context.clearRect(0, 0, canvas.width, canvas.height);
    // ������� ������ � ������ ���������
    snake.x += snake.dx;
    snake.y += snake.dy;
    // ���� ������ �������� ���� ���� �� ����������� � ���������� � �������� � ��������������� ������
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    // ������ �� �� ����� ��� �������� �� ���������
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }
    // ���������� ��������� � ��������� �����������. ������ ������ �������, ������� ��������� � ���������� � ������ �������, ������� �������� �� ��� ������
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // ����� ����� ����� ������� ��������� ������� �� ������� ������, ������ ��� ��� �������� � ��������� ����������� ������ ����� ����
    if (snake.cells.length > snake.maxCells && kill == 0) {
        snake.cells.pop();
    }
    // ������ ��� � ������� ������
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    // ���� �������� ������ � ���� ����� ������������ ��������� 
    if (kill == 0) {
        context.fillStyle = 'green';
        scoreelem.textContent = score;
        lengthelem.textContent = score + 4;

    }

    if (kill == 0 & score == Infinity) {
        kill = 1;
        scoreelem.textContent = 'Cheater';
    }
    // ������������ ������ ������� ������
    snake.cells.forEach(function (cell, index) {
        // ����� ������� ������ ��������, ������ ������ ���������� ������ �� ���� �������, ����� ������ ��� ������������ ������ �������
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // ���� ������ ��������� �� ������...
        if (cell.x === apple.x && cell.y === apple.y) {
            // ����������� ����� ������
            score = score + 1;
            snake.maxCells++;
            // ������ ����� �������
            // ������, ��� ������ ������ � ��� 400x400, ��� ���� �� ������ �� ������ � 25 � ������ �������
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        if (snake.maxCells >= 32 * 32) {
            kill = 1;
            scoreelem.textContent = 'Winner';
        }

        // ���������, �� ����������� �� ���� ���� � �����
        // ��� ����� ���������� ���� ������ � �������, ���� �� � ��� � ������� ������ ��� ������ � ����������� ������������ 
        for (var i = index + 1; i < snake.cells.length; i++) {
            // ���� ����� ������ ���� � �������� ���� ������
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // ����� ��������� ��������� �������� ����������
                // ������ ������� � ��������� �����  
                snake.dy = 0;
                snake.dx = 0;
                kill = 1;
            }
        }
    });
}
// �������, ����� ���������� �������, � ��������� �� ��� ������ �������
document.addEventListener('keydown', function (e) {
    // ������������� ��������� ����� ������: ���� ������ ��������, ��������, �����, �� ��� ���� ������� ����� ��� ������ ������ �� �������� � ������ ��������� ��������� � �� �� �������, ��� � ������. ��� ������� ��� ����, ����� �� ������������� ���� ������ �� ������� �� ���� � �� ��������� ��� ����.
    // ������� �����
    // ���� ������ ������� �����, � ��� ���� ������ ������ �� �������� �� �����������
    if (e.which === 37 && snake.dx === 0 && kill == 0) {
        // �� ��� �� �������� �� �����������, �����, � ������������ � �������������
        // �� �� ����� ������ ����� � � ��������� �������
        snake.dx = -32;
        snake.dy = 0;
    }
    // ������� �����
    else if (e.which === 38 && snake.dy === 0 && kill == 0) {
        snake.dy = -32;
        snake.dx = 0;
    }
    // ������� ������
    else if (e.which === 39 && snake.dx === 0 && kill == 0) {
        snake.dx = 32;
        snake.dy = 0;
    }
    // ������� ����
    else if (e.which === 40 && snake.dy === 0 && kill == 0) {
        snake.dy = 32;
        snake.dx = 0;
    }
});

// ��������� ����

document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyM' && (event.ctrlKey || event.metaKey)) {
        score = score + 1;
        snake.maxCells++;
    }
});


requestAnimationFrame(loop);