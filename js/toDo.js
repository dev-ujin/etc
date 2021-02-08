const container = document.querySelector("#container");
const toDoBoard = document.querySelector("#toDoBoard");
const btn = document.querySelector("#toDoBtn");
const SHOW = "side-board-show";
const HIDE = "side-board-hide";
let click = 0;


function drawBoard() {
    toDoBoard.classList.add(HIDE);
}
function handleClick() {
    if (click == 0) {
        click = 1;
        toDoBoard.classList.remove(HIDE);
        toDoBoard.classList.add(SHOW);
    }
    else if(click == 1) {
        click = 0;
        toDoBoard.classList.remove(SHOW);
        toDoBoard.classList.add(HIDE);
    }
}

function init() {
    drawBoard();
    btn.addEventListener("click", handleClick);
}

init();
