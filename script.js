const canvas = document.getElementById('visual-canvas');
const gl = canvas.getContext('webgl');
const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'default'
});

if (!gl) {
    alert('WebGL no está soportado en este navegador.');
    throw new Error('WebGL no está soportado en este navegador.');
}

const vertexShaderSource = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;

let fragmentShaderSource = `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
        gl_FragColor = vec4(color, 1.0);
    }
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error en compilación del shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error en enlace del programa:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
let program = createProgram(gl, vertexShader, fragmentShader);

if (!program) {
    throw new Error('Error al crear el programa WebGL.');
}

const positionAttributeLocation = gl.getAttribLocation(program, 'position');
let resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
let timeUniformLocation = gl.getUniformLocation(program, 'time');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1
]), gl.STATIC_DRAW);

function render(time) {
    time *= 0.001;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(timeUniformLocation, time);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);

document.getElementById('run-code').addEventListener('click', () => {
    const userCode = codeEditor.getValue();
    const newFragmentShaderSource = `precision mediump float; ${userCode}`;
    const newFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, newFragmentShaderSource);
    
    if (newFragmentShader) {
        const newProgram = createProgram(gl, vertexShader, newFragmentShader);
        if (newProgram) {
            gl.useProgram(newProgram);
            gl.deleteProgram(program);
            program = newProgram;

            resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
            timeUniformLocation = gl.getUniformLocation(program, 'time');
        } else {
            console.error('Error al crear el nuevo programa. Manteniendo el programa anterior.');
        }
    } else {
        console.error('Error en el fragment shader. Manteniendo el shader anterior.');
    }
});

