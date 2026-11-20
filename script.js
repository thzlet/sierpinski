const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");
const campo = document.getElementById("nivel");
const MIN = 0;
const MAX = 10;

function triangulo(a, b, c) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.closePath();
  ctx.fill();
}

function meio(p, q) {
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
}

// recursão
function sierpinski(a, b, c, nivel) {
  if (nivel === 0) {
    triangulo(a, b, c);
    return;
  }
  const ab = meio(a, b);
  const bc = meio(b, c);
  const ca = meio(c, a);
  sierpinski(a, ab, ca, nivel - 1);
  sierpinski(ab, b, bc, nivel - 1);
  sierpinski(ca, bc, c, nivel - 1);
}

function desenhar() {
  let nivel = parseInt(campo.value, 10);
  if (isNaN(nivel)) nivel = 0;
  nivel = Math.max(MIN, Math.min(MAX, nivel));
  campo.value = nivel;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margem = 30;
  const lado = canvas.width - 2 * margem;
  const altura = (lado * Math.sqrt(3)) / 2;
  const topo = (canvas.height - altura) / 2;

  const grad = ctx.createLinearGradient(0, topo, 0, topo + altura);
  grad.addColorStop(0, "#ff6ec7");
  grad.addColorStop(1, "#7c5cff");
  ctx.fillStyle = grad;

  sierpinski(
    { x: canvas.width / 2, y: topo },
    { x: margem, y: topo + altura },
    { x: canvas.width - margem, y: topo + altura },
    nivel
  );
}

// setas
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    const delta = e.key === "ArrowUp" ? 1 : -1;
    const atual = parseInt(campo.value, 10) || 0;
    campo.value = Math.max(MIN, Math.min(MAX, atual + delta));
    desenhar();
  }
});

campo.addEventListener("input", desenhar);
desenhar();
