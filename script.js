const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const hitMissText = document.getElementById('hitMissText');

let isDrawing = false;
let startX = 0;
let startY = 0;
let circles = []; // Array to store circle objects

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous circle
    const radius = calculateRadius(startX, e.offsetX, startY, e.offsetY);
    drawCircle(startX, startY, radius);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('click', (e) => {
  checkHit(e.offsetX, e.offsetY);
});

function calculateRadius(x1, x2, y1, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.fillStyle = getRandomColor();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  circles.push({ x, y, radius }); // Add circle details to array
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles = []; // Clear circle data array
  hitMissText.textContent = ''; // Clear hit/miss text
}

function checkHit(clickX, clickY) {
  let hit = false;
  for (const circle of circles) {
    const distance = Math.sqrt(Math.pow(clickX - circle.x, 2) + Math.pow(clickY - circle.y, 2));
    if (distance <= circle.radius) {
      hit = true;
      break;
    }
  }
  hitMissText.textContent = hit ? 'Hit' : 'Miss';
}
