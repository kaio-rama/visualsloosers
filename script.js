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

let canvas;
let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let iterations = 100;
let hueShift = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    noLoop();
    createUI();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    scale(zoom);
    translate(offsetX, offsetY);

    // Fractal Mandelbrot
    drawMandelbrot();
}

function drawMandelbrot() {
    let w = width / 2;
    let h = height / 2;
    loadPixels();
    
    for (let x = -w; x < w; x++) {
        for (let y = -h; y < h; y++) {
            let c = createVector(x / w * 4 - 2, y / h * 4 - 2);
            let z = createVector(0, 0);
            let iter = 0;
            
            while (z.magSq() <= 4 && iter < iterations) {
                z.set(x / w * 4 - 2, y / h * 4 - 2);
                z.add(c);
                z.mult(zoom);
                iter++;
            }

            let col = color(map(iter, 0, iterations, 0, 255) + hueShift, 255, 255);
            set(x + w, y + h, col);
        }
    }
    updatePixels();
}

function createUI() {
    // Create UI controls for zoom, offset, iterations, and hue shift
    let zoomSlider = createSlider(1, 100, 1, 0.1);
    zoomSlider.position(10, height - 30);
    zoomSlider.input(() => {
        zoom = zoomSlider.value();
        redraw();
    });

    let offsetXSlider = createSlider(-width, width, 0, 1);
    offsetXSlider.position(10, height - 60);
    offsetXSlider.input(() => {
        offsetX = offsetXSlider.value();
        redraw();
    });

    let offsetYSlider = createSlider(-height, height, 0, 1);
    offsetYSlider.position(10, height - 90);
    offsetYSlider.input(() => {
        offsetY = offsetYSlider.value();
        redraw();
    });

    let iterationsSlider = createSlider(10, 500, 100, 10);
    iterationsSlider.position(10, height - 120);
    iterationsSlider.input(() => {
        iterations = iterationsSlider.value();
        redraw();
    });

    let hueSlider = createSlider(0, 255, 0, 1);
    hueSlider.position(10, height - 150);
    hueSlider.input(() => {
        hueShift = hueSlider.value();
        redraw();
    });

    let resetButton = createButton('Reset');
    resetButton.position(10, height - 180);
    resetButton.mousePressed(() => {
        zoom = 1;
        offsetX = 0;
        offsetY = 0;
        iterations = 100;
        hueShift = 0;
        zoomSlider.value(zoom);
        offsetXSlider.value(offsetX);
        offsetYSlider.value(offsetY);
        iterationsSlider.value(iterations);
        hueSlider.value(hueShift);
        redraw();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}
