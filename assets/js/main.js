let game = document.querySelector(".game");
let player = document.querySelector('.player');
let gameContainer = "";
let isPlayable = true;
let isCpuMode = true;
let turn = 0;
let playerOneTurn = true;
let nPlayer = "";
let isWin = false;
let map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

function displayButton() {
    document.querySelector('#gameOne').style.display = "none";
    document.querySelector('#twoPlayers').style.display = "block";
    document.querySelector('#vsBot').style.display = "block";
}

function displayMap(cpuMode) {
    isCpuMode = cpuMode
    document.querySelector('#twoPlayers').style.display = "none";
    document.querySelector('#vsBot').style.display = "none";
    document.querySelector('.player').style.display = "block";
    player.innerHTML = "Player One";
    gameContainer = document.createElement('div');
    gameContainer.classList.add('gameContainer');
    game.appendChild(gameContainer);
    gameContainer.style.gap = "0";
    map.forEach((el) => {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        gameContainer.appendChild(rowContainer);
        el.forEach((value, index) => {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            rowContainer.appendChild(cell);
            cell.addEventListener('click', () => {
                connectFour(index)
            })
        })
    })
}

function connectFour(index) {
    turn += 1;
    if (isPlayable) {
        for (let i = map.length - 1; i >= 0; i--) {
            if (map[i][index] == 0) {
                let image = document.createElement('img');
                document.querySelectorAll('.cell')[index + (7 * i)].appendChild(image);
                if (!playerOneTurn) {
                    image.src = "./assets/images/jaune.png";
                    player.innerHTML = "Player One";
                    player.style.color = "red";
                    map[i].splice((index), 1, 2);
                    playerOneTurn = !playerOneTurn
                    endGame()
                }
                else {
                    image.src = "./assets/images/rouge.png";
                    player.innerHTML = "Player Two";
                    player.style.color = "yellow";
                    map[i].splice((index), 1, 1)
                    playerOneTurn = !playerOneTurn
                    endGame()
                    if (isCpuMode && isPlayable) {
                        bot()
                    }
                }
                break;
            }
        }
    }
}

function bot() {
    if (turn < 42) {
        let random = randomize(0, document.querySelectorAll('.cell').length - 1)
        while (document.querySelectorAll('.cell')[random].innerHTML != "") {
            random = randomize(0, document.querySelectorAll('.cell').length - 1)
        }
        document.querySelectorAll('.cell')[random].click()
    }
}

function endGame() {
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if (map[i][j] != 0) {
                //verification des lignes
                if (map[i][j] == map[i][j - 1] && map[i][j - 1] == map[i][j - 2] && map[i][j - 2] == map[i][j - 3]) {
                    isWin = true;
                    nPlayer = map[i][j]
                }
                // vérification des colonnes
                else if (map[i][j] == map[i - 1][j] && map[i - 1][j] == map[i - 2][j] && map[i - 2][j] == map[i - 3][j]) {
                    isWin = true;
                    nPlayer = map[i][j]
                }
                // vérification des diagonales gauche
                else if (map[i][j] == map[i - 1][j - 1] && map[i - 1][j - 1] == map[i - 2][j - 2] && map[i - 2][j - 2] == map[i - 3][j - 3]) {
                    isWin = true;
                    nPlayer = map[i][j]
                }
                // vérification des diagonales droite
                else if (map[i][j] == map[i - 1][j + 1] && map[i - 1][j + 1] == map[i - 2][j + 2] && map[i - 2][j + 2] == map[i - 3][j + 3]) {
                    isWin = true;
                    nPlayer = map[i][j]
                }
                else if (map[0].indexOf(0) == -1 && map[1].indexOf(0) == -1 && map[2].indexOf(0) == -1 && map[3].indexOf(0) == -1 && map[4].indexOf(0) == -1 && map[5].indexOf(0) == -1 && !isWin) {
                    isWin = true;
                    nPlayer = 3 ;
                }
            }
            if (isWin) {
                isPlayable = false;
                document.querySelector("#restart").style.display = "block";
                player.style.marginBottom = "-35px";
                winner(nPlayer);
            }
        }
    }
}

function winner(nPlayer) {
    switch (nPlayer) {
        case 1:
            player.innerHTML = "Player One Win !!!";
            player.style.color = "red";
            break;
        case 2:
            player.innerHTML = "Player Two Win !!!";
            player.style.color = "yellow";
            break;
        case 3:
            player.innerHTML = "Match Nul";
            player.style.color = "aliceblue";
            break;
    }
}

function restart() {
    isPlayable = true;
    document.querySelector("#restart").style.display = "none";
    document.querySelector(".player").style.display = "none";
    document.querySelector("#gameOne").style.display = "block";
    player.style.marginBottom = "0";
    isCpuMode = true;
    playerOneTurn = true
    turn = 0;
    isWin = false;
    nPlayer = "";
    gameContainer.remove();
    map = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}