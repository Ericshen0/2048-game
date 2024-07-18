const gameBoard = document.getElementById('game-board');
const gridSize = 4;
let grid = [];

// 初始化遊戲
function initGame() {
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    addNewTile();
    addNewTile();
    renderBoard();
}

// 在空白位置添加新的數字瓦片
function addNewTile() {
    let emptyTiles = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                emptyTiles.push({x: i, y: j});
            }
        }
    }
    if (emptyTiles.length > 0) {
        let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[randomTile.x][randomTile.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// 渲染遊戲板
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = grid[i][j] || '';
            if (grid[i][j] !== 0) {
                tile.style.backgroundColor = getTileColor(grid[i][j]);
            }
            gameBoard.appendChild(tile);
        }
    }
}

// 獲取瓦片顏色
function getTileColor(value) {
    const colors = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e'
    };
    return colors[value] || '#3c3a32';
}

// 初始化遊戲
initGame();

// 添加鍵盤事件監聽器
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    addNewTile();
    renderBoard();
}

// 移動函數（這裡只實現了向左移動，其他方向的邏輯類似）
function moveLeft() {
    for (let i = 0; i < gridSize; i++) {
        let row = grid[i].filter(num => num !== 0);
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j+1]) {
                row[j] *= 2;
                row[j+1] = 0;
            }
        }
        row = row.filter(num => num !== 0);
        while (row.length < gridSize) {
            row.push(0);
        }
        grid[i] = row;
    }
}

// 其他移動函數（向上、向下、向右）需要類似實現