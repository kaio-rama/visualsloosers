let p5Instance; // Variable para la instancia de p5

function initializeP5() {
    // Crea una nueva instancia de p5 y define setup y draw dentro de ella
    p5Instance = new p5((p) => {
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(0);
        };

        p.draw = () => {
            // El ciclo draw se deja vacío porque el código del usuario se ejecutará manualmente
        };
    }, 'visual-canvas');
}

// Función para ejecutar el código del usuario
function runUserCode(code) {
    if (p5Instance) {
        p5Instance.remove(); // Elimina la instancia anterior para reiniciar el canvas
    }
    
    // Crear una nueva instancia de p5 para ejecutar el código del usuario
    p5Instance = new p5((p) => {
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(0);
            try {
                eval(code); // Ejecuta el código del usuario en el contexto de p5
            } catch (err) {
                console.error("Error en el código del usuario: ", err);
            }
        };
    }, 'visual-canvas');
}

// Escucha el botón para ejecutar el código del usuario
document.getElementById('run-code').addEventListener('click', () => {
    const code = document.getElementById('code-editor').value;
    runUserCode(code); // Ejecuta el código del usuario
});

// Inicializa p5 en la carga de la página
initializeP5();

