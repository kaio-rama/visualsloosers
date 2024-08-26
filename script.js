let p5Instance;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('visual-canvas');
  noLoop(); // Evita que se ejecute continuamente hasta que se pulse el botón.
  background(0);
}

function draw() {
  // Dejar el canvas en negro hasta que se ejecute el código
  background(0);
}

document.getElementById('run-code').addEventListener('click', () => {
  const code = document.getElementById('code-editor').value;
  runUserCode(code);
});

function runUserCode(userCode) {
  clear(); // Limpiamos el canvas antes de ejecutar nuevo código
  try {
    eval(userCode); // Evalúa y ejecuta el código ingresado por el usuario
  } catch (error) {
    console.error("Error en el código del usuario: ", error);
  }
}
