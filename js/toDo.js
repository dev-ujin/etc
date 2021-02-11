const toDoBoard = document.querySelector("#toDoBoard");
const toDoContent = document.querySelector("#toDoContent");
const toDoForm = document.querySelector("#toDoForm");
const toDoInput = document.querySelector("#toDoInput");
const toDoSubmit = document.querySelector("#toDoSubmit");
const toDoBtn = document.querySelector("#toDoBtn");
const inProgressBtn = document.querySelector("#in-progress");
const completedBtn = document.querySelector("#completed");
const SHOW = "side-board-show";
const HIDE = "side-board-hide";
const TODOS_LS = "toDos";

let toDos = [];
let toDoClick = 0;
let mode = 0; //if mode is 0, it means in progress

function findToDo(id) {
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
    let text="", status=0, toDo={};
    if (parsedToDos != null) {
        parsedToDos.forEach(function (parsedToDo) {
            if (parsedToDo.id == id) {
                toDo = {
                    id: id,
                    text: parsedToDo.text,
                    status: parsedToDo.status
                };
            }
        });
    }
    return toDo;
}

function filterToDo(id) {
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(id);
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
    const deletedToDo = findToDo(li.id);
    filterToDo(deletedToDo.id);
    const newToDo = {
        id: parseInt(deletedToDo.id),
        text: deletedToDo.text,
        status: Math.abs(deletedToDo.status - 1)
    };
    toDos.push(newToDo);
    saveToDos();
}

function handleClickDeleteBtn(event) {
    const li = event.target.parentNode;
    toDoContent.removeChild(li);
    filterToDo(li.id);
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

    if (toDo.status == 0) {
        checkBox.innerText = "⬜️";
        checkBox.classList.add("0");
    }
    else if (toDo.status == 1) {
        checkBox.innerText = "⬛️";
        checkBox.classList.add("1");
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
    if (parsedToDos != null) {
        parsedToDos.forEach(function(toDo) {
            if (toDo.status == status) {
                paintToDo(toDo);
            }
        });
    }
}

function drawToDoBoard() {
    loadToDos(0);
    toDoBoard.classList.add(HIDE);
}
function handleClickToDo() {
    if (toDoClick == 0) {
        toDoClick = 1;
        toDoBoard.classList.remove(HIDE);
        toDoBoard.classList.add(SHOW);
    }
    else if(toDoClick == 1) {
        toDoClick = 0;
        toDoBoard.classList.remove(SHOW);
        toDoBoard.classList.add(HIDE);
    }
}

function handleSubmitToDo(event) {
    event.preventDefault();
    const toDo = {
        id: toDos.length+1,
        text: toDoInput.value,
        status: 0, //0: in-progress, 1: completed
    };
    paintToDo(toDo);
    toDos.push(toDo);
    saveToDos();
    toDoInput.value = "";
}

function handleClickStatus(event) {
    console.log(event.target);
    if (event.target.id == "in-progress") {
        toDoContent.textContent = "";
        loadToDos(0);
        toDoInput.style = "visibility: visible;";
        toDoSubmit.style = "visibility: visible;";

    }
    else if (event.target.id == "completed") {
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
