const cells = document.querySelectorAll(".cell");
const winningMessageText = document.querySelector("#winningMessageText");
const restartBtn = document.querySelector("#restartButton");
const winConditons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0 ,3, 6],
    [1 ,4, 7],
    [2, 5, 8],
    [0 ,4, 8],
    [2, 4, 6]
]
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();


function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    winningMessageText.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked (){
    const cellIndex = this.getAttribute("data-cell");
   
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
   

}
function changePlayer(){
    (currentPlayer === "X") ?  currentPlayer = "O" :  currentPlayer = "X";
    winningMessageText.textContent =`${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditons.length; i++)
    {
        const condition = winConditons[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "")
        {
            continue;
        }
        if(cellA == cellB && cellB == cellC)
        {
            roundWon=true;
            break;
        }
    }
    if(roundWon)
    {
        winningMessageText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes(""))
    {
        winningMessageText.textContent="Draw!";
        running = false;
    }
    else
    {
        changePlayer();
    }

}
function restartGame(){
    currentPlayer ="X";
    options = ["", "", "", "", "", "", "", "", ""];
    winningMessageText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell=>cell.textContent = "");
    running = true;
}