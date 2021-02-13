const bookmarkBoard = document.querySelector("#bookmarkBoard");
const bookmarkContent = document.querySelector("#bookmarkContent");
const bookmarkForm = document.querySelector("#bookmarkForm");
const bookmarkBtn = document.querySelector("#bookmarkBtn");
const colorChoice = document.querySelector(".color-choice");

const BOOKMARKS_LS = "bookmarks";
let bookmarkClick = 0;
let bookmarks = [];

function saveBookmarks() {
    localStorage.setItem(BOOKMARKS_LS, JSON.stringify(bookmarks));
}

function handleClickColorBall(event) {
    const bookmarkColorInput = document.querySelector("#bookmarkColorInput");
    const colorBalls = document.querySelectorAll(".color-ball");
    colorBalls.forEach(function (colorBall) {
        if (colorBall.id !== event.target.id) {
            colorBall.classList.remove("color-ball-selected");
        }
        else {
            colorBall.classList.add("color-ball-selected");
        }
    });
    bookmarkColorInput.value = colorCode;
}
// 
function drawBookMarkColorChoice() {
    const colors = ["#FF0000", "#FF8000", "#FFBF00", "#74DF00", "#04B45F", "#01A9DB", "#0431B4", "#9A2EFE", "#B404AE", "#FE2E64", "#A4A4A4",
                    "#8A0808", "#8A4B08", "#868A08", "#088A08", "#088A68", "#086A87", "#084B8A", "#380B61", "#8A0886", "#8A084B", "#424242"];
    for (let i=0 ; i < colors.length ; i++) {
        const colorBall = document.createElement("div");
        colorBall.id = colors[i];
        colorBall.classList.add("color-ball");
        colorBall.style = `background-color:${colors[i]};`;
        colorChoice.appendChild(colorBall);
        colorBall.addEventListener("click", handleClickColorBall);
    }
    
}

function sliceBookMark (name) {
    const english = /[a-zA-Z]/;
    const hangul =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let MAX_LENGTH = 0;
    if (hangul.test(name)) {
        MAX_LENGTH = 6;
    }
    else {
        MAX_LENGTH = 7;
    }
    if (name.length > MAX_LENGTH) {
        name = name.slice(0, MAX_LENGTH);
    }
    return name;
}

function paintBookmark(bookmark) {
    const bookmarkBall = document.createElement("div");
    const bookmarkBallInner = document.createElement("div");
    const bookmarkBallName = document.createElement("a");

    bookmarkBall.id = bookmark.id;
    bookmarkBall.classList.add("bookmark-ball");
    bookmarkBall.style = `background-color: ${bookmark.color}`;
    bookmarkBallInner.classList.add("bookmark-ball-inner");
    const bookmarkNameSliced = sliceBookMark(bookmark.name);
    bookmarkBallName.textContent = bookmarkNameSliced;
    bookmarkBallName.classList.add("bookmark-ball-name");
    bookmarkBallName.href = bookmark.url;
    bookmarkBallInner.appendChild(bookmarkBallName);
    bookmarkBall.appendChild(bookmarkBallInner);
    bookmarkContent.appendChild(bookmarkBall);
}

function loadBookmarks() {
    const parsedBookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_LS));
    if (parsedBookmarks !== null) {
        parsedBookmarks.forEach(function(bookmark) {
        paintBookmark(bookmark);
        });
    }
}

function drawBookmarkBoard() {
    drawBookMarkColorChoice();
    loadBookmarks();
    bookmarkBoard.classList.add(HIDE);
}

function handleClickBookmark () {
    if (bookmarkClick === 0) {
        bookmarkClick = 1;
        bookmarkBoard.classList.remove(HIDE);
        bookmarkBoard.classList.add(SHOW);
    }
    else if (bookmarkClick === 1) {
        bookmarkClick = 0;
        bookmarkBoard.classList.remove(SHOW);
        bookmarkBoard.classList.add(HIDE);

    }
}

function clearColorChoice() {
    const colorBalls = document.querySelectorAll(".color-ball");
    colorBalls.forEach(function (colorBall) {
        colorBall.classList.remove("color-ball-selected");
    });
}

function handleSubmitBookmark(event) {
    console.log("submit");
    const bookmarkNameInput = document.querySelector("#bookmarkNameInput");
    const bookmarkUrlInput = document.querySelector("#bookmarkUrlInput");
    const bookmarkColorInput = document.querySelector("#bookmarkColorInput");
    event.preventDefault();
    bookmark = {
        id: bookmarks.length + 1,
        name: bookmarkNameInput.value,
        url : bookmarkUrlInput.value,
        color: bookmarkColorInput.value
    };
    paintBookmark(bookmark);
    bookmarks.push(bookmark);
    saveBookmarks();
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
    clearColorChoice();
}

function init() {
    getData(BOOKMARKS_LS, bookmarks);
    drawBookmarkBoard();
    bookmarkBtn.addEventListener("click", handleClickBookmark);
    bookmarkForm.addEventListener("submit", handleSubmitBookmark);
}

init();