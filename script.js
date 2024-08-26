let sketch = (p) => {
    let code = '';

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('visual-canvas');
        p.noLoop();
    };

    p.draw = () => {
        p.background(0);
        try {
            eval(code);
        } catch (err) {
            console.error(err);
        }
    };

    document.getElementById('run-code').addEventListener('click', () => {
        code = document.getElementById('code-editor').value;
        p.loop();
        p.draw();
        p.noLoop();
    });
};

new p5(sketch);

