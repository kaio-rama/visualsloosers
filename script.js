let zoomSlider, offsetXSlider, offsetYSlider, iterationsSlider, hueSlider;
let p5Instance;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    noLoop();

    // Initialize sliders
    zoomSlider = select('#zoom');
    offsetXSlider = select('#offsetX');
    offsetYSlider = select('#offsetY');
    iterationsSlider = select('#iterations');
    hueSlider = select('#hue');

    // Initialize buttons
    select('#run-code').mousePressed(runUserCode);
    select('#reset').mousePressed(resetControls);

    // Create default p5 sketch
    p5Instance = new p5((p) => {
        p.setup = () => {
            p.createCanvas(windowWidth, windowHeight);
            p.noLoop();
        };

        p.draw = () => {
            p.background(0);
            p.translate(p.width / 2, p.height / 2);
            p.scale(zoomSlider.value());
            p.translate(offsetXSlider.value(), offsetYSlider.value());
            p.loadPixels();
            
            for (let x = -p.width / 2; x < p.width / 2; x++) {
                for (let y = -p.height / 2; y < p.height / 2; y++) {
                    let c = p.createVector(x / (p.width / 2) * 4 - 2, y / (p.height / 2) * 4 - 2);
                    let z = p.createVector(0, 0);
                    let iter = 0;
                    
                    while (z.magSq() <= 4 && iter < iterationsSlider.value()) {
                        z.set(x / (p.width / 2) * 4 - 2, y / (p.height / 2) * 4 - 2);
                        z.add(c);
                        z.mult(zoomSlider.value());
                        iter++;
                    }

                    let col = p.color(p.map(iter, 0, iterationsSlider.value(), 0, 255) + hueSlider.value(), 255, 255);
                    p.set(x + p.width / 2, y + p.height / 2, col);
                }
            }
            p.updatePixels();
        };
    });
}

function runUserCode() {
    try {
        let userCode = select('#code-editor').value();
        p5Instance.remove();
        p5Instance = new p5((p) => {
            eval(userCode); // Run user code
        });
    } catch (error) {
        console.error('Error executing user code:', error);
    }
}

function resetControls() {
    zoomSlider.value(1);
    offsetXSlider.value(0);
    offsetYSlider.value(0);
    iterationsSlider.value(100);
    hueSlider.value(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}

