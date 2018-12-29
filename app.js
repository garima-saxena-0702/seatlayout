var arrayobj = [
  { seatName: "01", pos1: "10", pos2: "10", color: "1" },
  { seatName: "02", pos1: "50", pos2: "10", color: "1" },
  { seatName: "03", pos1: "175", pos2: "10", color: "1" },
  { seatName: "04", pos1: "215", pos2: "10", color: "1" },
  { seatName: "05", pos1: "10", pos2: "65", color: "1" },
  { seatName: "06", pos1: "50", pos2: "65", color: "1" },
  { seatName: "07", pos1: "175", pos2: "65", color: "1" },
  { seatName: "08", pos1: "215", pos2: "65", color: "1" },
  { seatName: "09", pos1: "10", pos2: "120", color: "1" },
  { seatName: "10", pos1: "50", pos2: "120", color: "1" },
  { seatName: "11", pos1: "175", pos2: "120", color: "1" },
  { seatName: "12", pos1: "215", pos2: "120", color: "1" },
  { seatName: "13", pos1: "10", pos2: "175", color: "1" },
  { seatName: "14", pos1: "50", pos2: "175", color: "1" },
  { seatName: "15", pos1: "175", pos2: "175", color: "1" },
  { seatName: "16", pos1: "215", pos2: "175", color: "1" },
  { seatName: "17", pos1: "10", pos2: "230", color: "1" },
  { seatName: "18", pos1: "50", pos2: "230", color: "1" },
  { seatName: "19", pos1: "175", pos2: "230", color: "1" },
  { seatName: "20", pos1: "215", pos2: "230", color: "1" }
];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var elemleft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;

var seats = [];
var drag = false;
var doubleBox = {pos1: -1, pos2: -1};
var mouseMoveX = -1;
var mouseMoveY = -1;
var start = null;

function seatLayout() {
  // ctx.fillStyle = "lightslategray";
  ctx.globalAlpha = 1;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < arrayobj.length; i++) {
    if(arrayobj[i].color==1)
      ctx.fillStyle = "lightslategray";
    else
      ctx.fillStyle = "lightblue";
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
    var x = event.pageX - elemleft;
    var y = event.pageY - elemTop;
    selectSeat(x, y);
  },
  false
);

canvas.addEventListener( 
  "dblclick",
  function(event) {
    var x = event.pageX - elemleft;
    var y = event.pageY - elemTop;
    doubleBox.pos1 = x;
    doubleBox.pos2 = y;
    if(!drag){
      drag = true;
    }
    else{
      selectedArea(doubleBox);
      drag = false;
      doubleBox.pos1 = -1;
      doubleBox.pos2 = -1;
      mouseMoveX = -1;
      mouseMoveY = -1;
    }
  },
  false
);  

canvas.addEventListener('mousemove', function(event) { 
    if(drag){
        mouseMoveX  = event.pageX - elemleft;
        mouseMoveY = event.pageY - elemTop;
    }
}, false);

function draw(timestamp) {
    // if (!start) start = timestamp;
    // var progress = timestamp - start;
    // if (progress < 10000) {
      // ctx.clearRect(0, 0, 250, 400);
      seatLayout();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'skyblue';
      ctx.fillRect(doubleBox.pos1, doubleBox.pos2, mouseMoveX - doubleBox.pos1, mouseMoveY - doubleBox.pos2);
      window.requestAnimationFrame(draw);
    // }
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
      console.log(seats);
      ctx.fillRect(element.pos1, element.pos2, 25, 35);
    }
  });
}

function selectedArea(doubleBox) {
  arrayobj.forEach(elem => {
    if(doubleBox.pos1 > elem.pos1 && doubleBox.pos2 > elem.pos2 && seats.indexOf(elem.seatName) == -1 ){
      // console.log(elem.seatName);
      elem.color = "2";
      ctx.fillStyle = "lightblue";
      ctx.fillRect(elem.pos1, elem.pos2, 25, 35);
      seats.push(elem.seatName);
      console.log(seats)
    }
  });
}

window.requestAnimationFrame(draw);
// seatLayout();