const toDoBoard = document.querySelector("#toDoBoard");
const toDoContent = document.querySelector("#toDoContent");
const toDoForm = document.querySelector("#toDoForm");
const toDoInput = document.querySelector("#toDoInput");
const toDoSubmit = document.querySelector("#toDoSubmit");
const toDoBtn = document.querySelector("#toDoBtn");
const inProgressBtn = document.querySelector("#inProgress");
const completedBtn = document.querySelector("#completed");
const SHOW = "side-board-show";
const HIDE = "side-board-hide";
const TODOS_LS = "toDos";

let toDos = [];
let countToDo;
let toDoClick = 0;
let mode = 0; //if mode is 0, it means in progress

function findToDo(id) {
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
    let toDo;
    if (parsedToDos !== null) {
        parsedToDos.forEach(function (parsedToDo) {
            if (parsedToDo.id === id) {
                 toDo = {
                    id: parsedToDo.id,
                    text: parsedToDo.text,
                    status: parsedToDo.status
                };
                console.log(toDo);
            }
        });
    }
    return toDo;
}

function filterToDo(id) {
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== id;
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleClickCheckBox(event) {
    const li = event.target.parentNode;
    toDoContent.removeChild(li);
    const deletedToDo = findToDo(parseInt(li.id));
    filterToDo(deletedToDo.id);
    let newToDo = {
        id: deletedToDo.id,
        text: deletedToDo.text,
        status: Math.abs(deletedToDo.status - 1)
    };
    toDos.push(newToDo);
    saveToDos();
}

function handleClickDeleteBtn(event) {
    const li = event.target.parentNode;
    toDoContent.removeChild(li);
    filterToDo(parseInt(li.id));
}

function paintToDo (toDo) {
    const li = document.createElement("li");
    const checkBox = document.createElement("div");
    const toDoText = document.createElement("div");
    const delBtn = document.createElement("div");

    li.classList.add("todo");
    li.id = toDo.id;
    checkBox.classList.add("check-box");
    toDoText.classList.add("todo-text");
    delBtn.classList.add("delete-btn");

    if (toDo.status === 0) {
        checkBox.innerText = "⬜️";
    }
    else if (toDo.status === 1) {
        checkBox.innerText = "⬛️";
    }
    checkBox.addEventListener("click", handleClickCheckBox);
    delBtn.addEventListener("click", handleClickDeleteBtn);
    toDoText.innerText = toDo.text;
    delBtn.innerText = "✂️";

    li.appendChild(checkBox);
    li.appendChild(toDoText);
    li.appendChild(delBtn);
    toDoContent.appendChild(li);
}

function loadToDos(status) {
    console.log(typeof(status));
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
    if (parsedToDos !== null) {
        parsedToDos.forEach(function(toDo) {
            if (toDo.status === status) {
                paintToDo(toDo);
            }
        });
    }
}

function drawToDoBoard() {
    if (toDos.length === 0) {
        countToDo = 0;
    }
    else {
        countToDo = toDos[toDos.length - 1].id + 1;
    }
    loadToDos(0);
    toDoBoard.classList.add(HIDE);
}
function handleClickToDo() {
    if (toDoClick === 0) {
        toDoClick = 1;
        toDoBoard.classList.remove(HIDE);
        toDoBoard.classList.add(SHOW);
    }
    else if(toDoClick === 1) {
        toDoClick = 0;
        toDoBoard.classList.remove(SHOW);
        toDoBoard.classList.add(HIDE);
    }
}

function handleSubmitToDo(event) {
    event.preventDefault();
    const toDo = {
        id: countToDo,
        text: toDoInput.value,
        status: 0, //0: inProgress, 1: completed
    };
    countToDo++;
    paintToDo(toDo);
    toDos.push(toDo);
    saveToDos();
    toDoInput.value = "";
}

function handleClickStatus(event) {
    console.log(event.target);
    if (event.target.id === "inProgress") {
        toDoContent.textContent = "";
        loadToDos(0);
        toDoInput.style = "visibility: visible;";
        toDoSubmit.style = "visibility: visible;";
    }
    else if (event.target.id === "completed") {
        toDoContent.textContent = "";
        loadToDos(1);
        toDoInput.style = "visibility: hidden;";
        toDoSubmit.style = "visibility: hidden;";
    }
}

function init() {
    getData(TODOS_LS, toDos);
    drawToDoBoard();
    toDoBtn.addEventListener("click", handleClickToDo);
    inProgressBtn.addEventListener("click", handleClickStatus);
    completedBtn.addEventListener("click", handleClickStatus);
    toDoForm.addEventListener("submit", handleSubmitToDo);
}

init();
