var arrayobj = [
  { seatName: "01", pos1: 10, pos2: 10, color: "1" },
  { seatName: "02", pos1: 50, pos2: 10, color: "1" },
  { seatName: "03", pos1: 175, pos2: 10, color: "1" },
  { seatName: "04", pos1: 215, pos2: 10, color: "1" },
  { seatName: "05", pos1: 10, pos2: 65, color: "1" },
  { seatName: "06", pos1: 50, pos2: 65, color: "1" },
  { seatName: "07", pos1: 175, pos2: 65, color: "1" },
  { seatName: "08", pos1: 215, pos2: 65, color: "1" },
  { seatName: "09", pos1: 10, pos2: 120, color: "1" },
  { seatName: "10", pos1: 50, pos2: 120, color: "1" },
  { seatName: "11", pos1: 175, pos2: 120, color: "1" },
  { seatName: "12", pos1: 215, pos2: 120, color: "1" },
  { seatName: "13", pos1: 10, pos2: 175, color: "1" },
  { seatName: "14", pos1: 50, pos2: 175, color: "1" },
  { seatName: "15", pos1: 175, pos2: 175, color: "1" },
  { seatName: "16", pos1: 215, pos2: 175, color: "1" },
  { seatName: "17", pos1: 10, pos2: 230, color: "1" },
  { seatName: "18", pos1: 50, pos2: 230, color: "1" },
  { seatName: "19", pos1: 175, pos2: 230, color: "1" },
  { seatName: "20", pos1: 215, pos2: 230, color: "1" }
];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var elemleft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;

var seats = [];
var drag = false;
var doubleBox = { pos1: null, pos2: null };
var mouseMoveX = null;
var mouseMoveY = null;
var start = null;

function seatLayout() {
  ctx.globalAlpha = 1;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < arrayobj.length; i++) {
    if (arrayobj[i].color == 1) ctx.fillStyle = "lightslategray";
    else ctx.fillStyle = "lightblue";
    ctx.fillRect(arrayobj[i].pos1, arrayobj[i].pos2, 25, 35);
    ctx.strokeText(
      arrayobj[i].seatName,
      parseInt(arrayobj[i].pos1) + 8,
      parseInt(arrayobj[i].pos2) + 44
    );
  }
  ctx.stroke();
}

canvas.addEventListener(
  "click",
  function(event) {
    x = event.pageX - elemleft;
    y = event.pageY - elemTop;
    var outsideSeat = true;
    arrayobj.forEach(elem => {
      if (
        elem.pos1 < x &&
        parseInt(elem.pos1) + 25 > x &&
        elem.pos2 < y &&
        parseInt(elem.pos2) + 35 > y
      ) {
        outsideSeat = false;
        selectSeat(event.pageX - elemleft, event.pageY - elemTop);
      }
    });
    if (outsideSeat) {
      if (!drag) {
        doubleBox.pos1 = x;
        doubleBox.pos2 = y;
        drag = true;
      } else {
        if (mouseMoveX === null) return;
        selectedArea(doubleBox);
        drag = false;
        doubleBox.pos1 = null;
        doubleBox.pos2 = null;
        mouseMoveX = null;
        mouseMoveY = null;
      }
    }
  },
  false
);

canvas.addEventListener(
  "mousemove",
  function(event) {
    if (drag) {
      mouseMoveX = event.pageX - elemleft;
      mouseMoveY = event.pageY - elemTop;
    }
  },
  false
);

function draw(timestamp) {
  seatLayout();
  if (drag) {
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "skyblue";
    if (mouseMoveX != null) {
      ctx.fillRect(
        doubleBox.pos1,
        doubleBox.pos2,
        mouseMoveX - doubleBox.pos1,
        mouseMoveY - doubleBox.pos2
      );
    }
  }
  window.requestAnimationFrame(draw);
}

function selectSeat(x, y) {
  arrayobj.forEach(function(element) {
    if (
      y >= element.pos2 &&
      y <= parseInt(element.pos2) + 35 &&
      x >= element.pos1 &&
      x <= parseInt(element.pos1) + 25
    ) {
      if (element.color == "1") {
        ctx.fillStyle = "lightblue";
        element.color = "2";
        seats.push(element.seatName);
      } else {
        ctx.fillStyle = "lightslategray";
        element.color = "1";
        for (var i = 0; i < seats.length; i++) {
          if (seats[i] === element.seatName) {
            seats.splice(i, 1);
          }
        }
      }
      ctx.fillRect(element.pos1, element.pos2, 25, 35);
    }
  });
}

function selectedArea(doubleBox) {
  console.log(doubleBox, mouseMoveX, mouseMoveY);
  rectLeft = Math.min(doubleBox.pos1, mouseMoveX);
  rectRight = Math.max(doubleBox.pos1, mouseMoveX);
  rectTop = Math.min(doubleBox.pos2, mouseMoveY);
  rectBottom = Math.max(doubleBox.pos2, mouseMoveY);

  arrayobj.forEach(elem => {
    if (
      (rectLeft < elem.pos1 &&
        rectTop < elem.pos2 &&
        rectRight > elem.pos1 &&
        rectBottom > elem.pos2) ||
      (rectLeft - 25 < elem.pos1 &&
        rectTop < elem.pos2 &&
        rectRight - 25 > elem.pos1 &&
        rectBottom > elem.pos2) ||
      (rectLeft > elem.pos1 &&
        rectLeft < elem.pos1 + 25 &&
        rectTop < elem.pos2 &&
        rectRight > elem.pos1 &&
        rectRight < elem.pos1 + 25 &&
        rectBottom > elem.pos2) ||
      (rectLeft < elem.pos1 &&
        rectTop - 35 < elem.pos2 &&
        rectRight > elem.pos1 &&
        rectBottom - 35 > elem.pos2) ||
      (rectLeft < elem.pos1 &&
        rectTop > elem.pos2 &&
        rectTop < elem.pos2 + 35 &&
        rectRight > elem.pos1 &&
        rectBottom < elem.pos2 + 35 &&
        rectBottom > elem.pos2)
    ) {
      if (seats.indexOf(elem.seatName) == -1) {
        elem.color = "2";
        ctx.fillStyle = "lightblue";
        seats.push(elem.seatName);
        console.log(elem, { rectBottom, rectTop, rectRight, rectLeft });
      } else {
        elem.color = "1";
        ctx.fillStyle = "lightslategray";
        for (var i = 0; i < seats.length; i++) {
          if (seats[i] === elem.seatName) {
            seats.splice(i, 1);
          }
        }
      }
      ctx.fillRect(elem.pos1, elem.pos2, 25, 35);
    }
  });
}

window.requestAnimationFrame(draw);
