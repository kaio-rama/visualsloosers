function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    noLoop();
}

function draw() {
    background(255);
    stroke(0);
    noFill();

    // Ejemplo básico de visualización
    ellipse(width / 2, height / 2, 200, 200);
}

// Ejemplo de fractal (Zoom infinito)
function mandelbrot(x, y, zoom) {
    let c = createVector(x, y);
    let z = createVector(0, 0);
    let iter = 0;
    let maxIter = 100;
    
    while (z.magSq() <= 4 && iter < maxIter) {
        z.set(x, y);
        z.add(c);
        z.mult(zoom);
        iter++;
    }
    
    return iter;
}
