'use strict';
const canvas = document.querySelector('.main-canvas');
const ctx = canvas.getContext('2d');
let whiteData = [["WhiteKing", "♔", 9 * 35, 35],
["WhiteQueen", "♕", 7 * 35, 35],
["WhiteRook1", "♖", 35, 35],
["WhiteRook2", "♖", 15 * 35, 35],
["WhiteBishop1", "♗", 5 * 35, 35],
["WhiteBishop2", "♗", 11 * 35, 35],
["WhiteKnight1", "♘", 3 * 35, 35],
["WhiteKnight2", "♘", 13 * 35, 35],
["WhitePawn1", "♙", 35 + 70 * 0, 3 * 35],
["WhitePawn2", "♙", 35 + 70 * 1, 3 * 35],
["WhitePawn3", "♙", 35 + 70 * 2, 3 * 35],
["WhitePawn4", "♙", 35 + 70 * 3, 3 * 35],
["WhitePawn5", "♙", 35 + 70 * 4, 3 * 35],
["WhitePawn6", "♙", 35 + 70 * 5, 3 * 35],
["WhitePawn7", "♙", 35 + 70 * 6, 3 * 35],
["WhitePawn8", "♙", 35 + 70 * 7, 3 * 35]];
let blackData = [["BlackKing", "♚", 7 * 35, 15 * 35],
["BlackQueen", "♛", 9 * 35, 15 * 35],
["BlackRook1", "♜", 35, 15 * 35],
["BlackRook2", "♜", 15 * 35, 15 * 35],
["BlackBishop1", "♝", 5 * 35, 15 * 35],
["BlackBishop2", "♝", 11 * 35, 15 * 35],
["BlackKnight1", "♞", 3 * 35, 15 * 35],
["BlackKnight2", "♞", 13 * 35, 15 * 35],
["BlackPawn1", "♟", 35 + 70 * 0, 13 * 35],
["BlackPawn2", "♟", 35 + 70 * 1, 13 * 35],
["BlackPawn3", "♟", 35 + 70 * 2, 13 * 35],
["BlackPawn4", "♟", 35 + 70 * 3, 13 * 35],
["BlackPawn5", "♟", 35 + 70 * 4, 13 * 35],
["BlackPawn6", "♟", 35 + 70 * 5, 13 * 35],
["BlackPawn7", "♟", 35 + 70 * 6, 13 * 35],
["BlackPawn8", "♟", 35 + 70 * 7, 13 * 35]];
redraw();
//play
let playing = false;
canvas.addEventListener('mousedown', event => {
    let ex = event.offsetX;
    let ey = event.offsetY;
    checker(ex, ey);
    if (setter === true) {playing = true}
});
canvas.addEventListener("mousemove", function move(event) {
    if (playing === true) {
        let ex = event.offsetX;
        let ey = event.offsetY;
        checkerMove(ex, ey);
        SetNewFigure(ex, ey);
    }
});
canvas.addEventListener('mouseup', e => {
    if (playing === true) { playing = false }
    if (clickFix) {
    let figureNamePosNumber = 0;
    if (figureColore == "#fff2e6") {
        whiteData.forEach((b, i) => { if (b[0] == figureName) { figureNamePosNumber = i } });
        whiteData[figureNamePosNumber][2] = 35 + moven * 70;;
        whiteData[figureNamePosNumber][3] = 35 + movem * 70;;
    }
    else if (figureColore == "#666666") {
        blackData.forEach((b, i) => { if (b[0] == figureName) { figureNamePosNumber = i } });
        blackData[figureNamePosNumber][2] = 35 + moven * 70;;
        blackData[figureNamePosNumber][3] = 35 + movem * 70;;
    }
    killchecker(moven, movem);
    fildColore = "";
    figureColore = "";
    figureShape = "";
    figureName = "";
    setter = false;
    n = -1;
    m = -1;
    redraw();
    clickFix = false;
}
});
let fildColore = "";
let figureColore = "";
let figureShape = "";
let figureName = "";
let n = 0, m = 0;
let moven, movem;
let clickFix = false;
function checkerMove(xe, ye) {
    let x = xe, y = ye;
    for (let i = 0; i < 8; i++) {
        for (let k = 0; k < 8; k++) {
            if (x > i * 70 && x < (i + 1) * 70 && y > k * 70 && y < (k + 1) * 70) { moven = i; movem = k }
        }
    }
    if ((moven - movem) % 2 === 0) { fildColore = "white" }
    else { fildColore = "black" }
    clearField(moven, movem);
    clickFix = true;
}
let setter = false;
function checker(xe, ye) {
    let x = xe, y = ye;
    for (let i = 0; i < 8; i++) {
        for (let k = 0; k < 8; k++) {
            if (x > i * 70 && x < (i + 1) * 70 && y > k * 70 && y < (k + 1) * 70) { n = i; m = k }
        }
    }
    let xpos = 35 + n * 70;
    let ypos = 35 + m * 70;
    for (let i = 0; i < blackData.length; i++) {
        if (blackData[i][2] == xpos && blackData[i][3] == ypos) {
            setter = true;
            figureColore = "#666666";
            figureShape = blackData[i][1];
            figureName = blackData[i][0];
        }
        else if (whiteData[i][2] == xpos && whiteData[i][3] == ypos) {
            setter = true;
            figureColore = "#fff2e6";
            figureShape = whiteData[i][1];
            figureName = whiteData[i][0];
        }
    }
    if ((n - m) % 2 === 0) { fildColore = "white" }
    else { fildColore = "black" }
}
function killchecker(xe, ye) {
    let xpos = 35 + xe * 70;
    let ypos = 35 + ye * 70;
    for (let i = 0; i < blackData.length; i++) {
        if (blackData[i][2] === xpos && blackData[i][3] === ypos && figureColore === "#fff2e6") {
            blackData[i] = [];
        }
        else if (whiteData[i][2] == xpos && whiteData[i][3] == ypos && figureColore === "#666666") {
            whiteData[i] = [];
        }
    }
}
function clearField(xe, ye) {
    ctx.clearRect(xe * 70, ye * 70, 70, 70);
    ctx.fillStyle = fildColore;
    ctx.fillRect(xe * 70, ye * 70, 70, 70);
}
function SetNewFigure(xe, ye) {
    let x = xe, y = ye;
    ctx.beginPath();
    ctx.fillStyle = figureColore;
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '60px bolder serif';
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(figureShape, x, y);
}
function redraw() {
    ctx.clearRect(0, 0, 560, 560);
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(70 + i * 140, 0 + k * 140, 70, 70);
            ctx.fillRect(0 + i * 140, 70 + k * 140, 70, 70);
        }
    }
    for (let i = 0; i < blackData.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#666666";
        ctx.arc(blackData[i][2], blackData[i][3], 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '60px bolder serif';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(blackData[i][1], blackData[i][2], blackData[i][3]);
    }
    for (let i = 0; i < whiteData.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#fff2e6";
        ctx.arc(whiteData[i][2], whiteData[i][3], 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '60px bolder serif';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(whiteData[i][1], whiteData[i][2], whiteData[i][3]);
    }
}