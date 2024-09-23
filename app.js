const canvas = document.getElementById("pad");
const clearbtn = document.getElementById("clear");
const save = document.getElementById("save");
const cxt = canvas.getContext("2d");
let writingmode = false;
const selectElement = document.getElementById("stroke");
const selectedValue = selectElement.value;

clearbtn.addEventListener("click", clear);
save.addEventListener("click", saveCanvas);

canvas.addEventListener("mousedown", start);
canvas.addEventListener("touchstart", start, { passive: false });

canvas.addEventListener("mouseup", stop);
canvas.addEventListener("touchend", stop);
canvas.addEventListener("mouseout", stop);

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw, { passive: false });

function start(e) {
  writingmode = true;
  draw(e);
}

function stop() {
  writingmode = false;
  cxt.beginPath();
}

function draw(e) {
  const selectElement = document.getElementById("stroke");
  const selectedValue = selectElement.value;
  if (!writingmode) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;
  cxt.lineWidth = selectedValue;
  cxt.lineCap = "round";
  cxt.lineTo(x, y);
  cxt.stroke();
  cxt.beginPath();
  cxt.moveTo(x, y);
}

function clear() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const dataURL = canvas.toDataURL("image/jpg");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "mysignature.jpg";
  link.click();
}
