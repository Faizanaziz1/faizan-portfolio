const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let width, height, stars = [];
const mouse = { x: 0, y: 0 };

function resize() {
  width = canvas.width = window.innerWidth * devicePixelRatio;
  height = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  const count = Math.min(850, Math.floor((window.innerWidth * window.innerHeight) / 1800));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: (Math.random() * 1.3 + .2) * devicePixelRatio,
    a: Math.random() * .75 + .15,
    tw: Math.random() * Math.PI * 2,
    speed: Math.random() * .018 + .004
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const s of stars) {
    s.tw += s.speed;
    const alpha = s.a * (0.72 + Math.sin(s.tw) * 0.28);
    const px = s.x + mouse.x * 7 * devicePixelRatio;
    const py = s.y + mouse.y * 7 * devicePixelRatio;

    ctx.beginPath();
    ctx.arc(px, py, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,230,255,${alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
window.addEventListener("mousemove", e => {
  mouse.x = (e.clientX / window.innerWidth - .5) * .45;
  mouse.y = (e.clientY / window.innerHeight - .5) * .45;
});

resize();
draw();
