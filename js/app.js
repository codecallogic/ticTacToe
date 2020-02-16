/*----- constants -----*/
const BOARDx = [
    [,,],
    [,,],
    [,,]
];

const BOARDo = [
    [,,],
    [,,],
    [,,]
]

let currentPlayer;
let player = ['X', 'O'];
let available = [];
let winner = null;

/*----- cached element references -----*/
let boardDisplay = document.querySelectorAll('#board > button');
let block = document.getElementById('board');
let image = document.createElement('img');
let message = document.getElementById('message');
let allIMG = document.querySelectorAll('.theX');
let newGameBtn = document.getElementById('newGame');

/*----- event listeners -----*/

block.addEventListener('click', handleClick);
newGameBtn.addEventListener('click', newGame);

/*----- functions -----*/

init();

function init(){

    currentPlayer = Math.floor(Math.random() * player.length);
        
    for(let i = 0; i < 9; i++){
        boardDisplay[i].id = i;
    }

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            available.push([j, i]);
        }
    }
}

function newGame(){
    for(let i = 0; i < 9; i++){
        boardDisplay[i].classList.remove('X');
        boardDisplay[i].classList.remove('O');
        boardDisplay[i].innerHTML = ' ';
    }
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            BOARDo[i][j] = '';
            BOARDx[i][j] = '';
            console.log(BOARDo);
        }
    }
    winner = null;
    message.innerHTML = '';
    available = [];
    init();
}

function handleClick(evt){
    let blockID = evt.target.id;
    if( evt.target.tagName !== 'BUTTON' || BOARDx.includes(blockID) || BOARDo.includes(blockID)) return;
    
    if(blockID < 3){
        column = blockID - 0;
        playerBoard(0, blockID, column);
    }else if(blockID > 2 && blockID < 6){
        column = blockID - 3; 
        playerBoard(1, blockID, column);
    }else{
        column = blockID - 6;
        playerBoard(2, blockID, column);
    }
}

function playerBoard(row, blockID, column){
    let getEl = document.getElementById(blockID);
    let X = getEl.classList.contains('X');
    let O = getEl.classList.contains('O');
    if(currentPlayer === 0){ 
        if(O){
            return;
        }else{
            BOARDx[row].splice(column,1,blockID);
            getEl.className += ' X';
            
        }
    }else if (currentPlayer === 1){
        if(X){
            return;
        }else{
            BOARDo[row].splice(column,1,blockID);
            getEl.className += ' O';
            
        }
    }

    let renderID = blockID;
    render(renderID);
    nextTurn(currentPlayer);
}

function render(renderID){
    const playerButton = document.getElementById(renderID);
    if(currentPlayer === 0){
        if(playerButton.innerHTML === '<img>'){
            // console.log('false');
            // return;
        }else{
            const childElement = document.createElement('img');
            childElement.className = 'theX';
            childElement.src = 'images/x.png';
            playerButton.appendChild(childElement);
        }
    }

    if(currentPlayer === 1){
        if(playerButton.innerHTML === '<img>'){
            // console.log('false');
            // return;
        }else{
            const childElement = document.createElement('img');
            childElement.className = 'theCircle';
            childElement.src = 'images/circle.png';
            playerButton.appendChild(childElement);
        }
    }

    if(winner === null && checkWinner() === true){
        let letter = currentPlayer;
        message.innerHTML = `Congrats ${player[letter]} is the winner`;
    }
}

function nextTurn(player){
    player === 0 ? currentPlayer = 1 : currentPlayer = 0;
    let index = Math.floor(Math.random() * available.length);
    available.splice(index,1)[0];
    if(winner === null && available.length === 0 ){
        message.innerHTML = `Its a tie`;
    }
}

function checkWinner(){
    let board;

    currentPlayer === 0 ? board = BOARDx : board = BOARDo;

    // Vertical 

    board[0][0] === '0' && board[1][0] === '3' && board[2][0] === '6' ? winner = true : false;
    board[0][1] === '1' && board[1][1] === '4' && board[2][1] === '7' ? winner = true : false;
    board[0][2] === '2' && board[1][2] === '5' && board[2][2] === '8' ? winner = true : false;

    // Horizontal

    board[0][0] === '0' && board[0][1] === '1' && board[0][2] === '2' ? winner = true : false;
    board[1][0] === '3' && board[1][1] === '4' && board[1][2] === '5' ? winner = true : false;
    board[2][0] === '6' && board[2][1] === '7' && board[2][2] === '8' ? winner = true : false;

    // Diagonal

    board[0][0] === '0' && board[1][1] === '4' && board[2][2] === '8' ? winner = true : false;
    board[2][0] === '6' && board[1][1] === '4' && board[0][2] === '2' ? winner = true : false;

    return winner;

}