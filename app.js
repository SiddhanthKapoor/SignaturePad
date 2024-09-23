const canvas = document.getElementById("pad");
const clearbtn = document.getElementById("clear");
const save = document.getElementById("save");
const cxt = canvas.getContext("2d");
let isDrawing = false;
const selectElement = document.getElementById("stroke");

function resizeCanvas() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 100; 
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

clearbtn.addEventListener("click", clear);
save.addEventListener("click", saveCanvas);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", handleTouch);
canvas.addEventListener("touchmove", handleTouch);
canvas.addEventListener("touchend", stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    cxt.beginPath();
}

function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    } else {
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
}

function draw(e) {
    if (!isDrawing) return;

    const { x, y } = getCoordinates(e);
    const selectedValue = selectElement.value;

    cxt.lineWidth = selectedValue;
    cxt.lineCap = "round";
    cxt.lineTo(x, y);
    cxt.stroke();
    cxt.beginPath();
    cxt.moveTo(x, y);
}

function handleTouch(e) {
    e.preventDefault(); 
    const touch = e.type === 'touchstart' ? startDrawing : draw;
    touch(e);
}

function clear() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "mysignature.png";
    link.click();
}