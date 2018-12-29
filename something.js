var box = { posx1: -1, posy1: -1, posx2: -1, posy2: -1 };

canvas.addEventListener(
    "dblclick",
    function(event) {
      var x = event.pageX - elemleft;
      var y = event.pageY - elemTop;
      if (box.posx1 == -1 && box.posx2 == -1) {
        box.posx1 = x;

        box.posy1 = y;
        // console.log(box);
      } else {
        box.posx2 = x;
        box.posy2 = y;
        // console.log(box);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "blue";
        ctx.fillRect(
          box.posx1,
          box.posy1,
          box.posx2 - box.posx1,
          box.posy2 - box.posy1
        );
        multiSeatSelect(box);
        setTimeout(function() {
          console.log("settimeout");
        }, 3000);

        box.posx1 = -1;
        box.posy1 = -1;
        box.posx2 = -1;
        box.posy2 = -1;
      }
    },
    false
  );

  function multiSeatSelect(box) {
  arrayobj.forEach(function(element) {
    if (
      element.pos1 > box.posx1 &&
      element.pos2 > box.posy1 &&
      element.pos1 < box.posx2 &&
      element.pos2 < box.posy2
    ) {
      if (seats.indexOf(element.seatName) == -1) {
        seats.push(element.seatName);
      }
    }
  });
  console.log(seats);
}