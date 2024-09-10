
const canvas = document.getElementById('visual-canvas');
const gl = canvas.getContext('webgl');
const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'default',
});

if (!gl) {
    alert('WebGL no está soportado en este navegador.');
    throw new Error('WebGL no está soportado en este navegador.');
}

// Ajustar canvas al tamaño de la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.getElementById('editor-container').offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

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

// Boton RUN CODE
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

// Boton CLEAR CODE
document.getElementById('clear-code').addEventListener('click' , () => {
    codeEditor.setValue(''); 

})

// Boton RANDOM CODE
document.getElementById('random-code').addEventListener('click', ()=>{
    codeEditor.setValue(randomCodes[Math.floor(Math.random()*randomCodes.length)])
})

// BOTON TUTORIAL
// Obtener elementos
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('myModal');

// Abrir el modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Cerrar el modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// Random codes
let random_01 = `
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx * vec3(1.0, 1.0, 1.0));
    gl_FragColor = vec4(color, 1.0);
}
`
let random_02 = `
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 distortedUV = uv + 0.1 * vec2(sin(time + uv.y * 10.0), cos(time + uv.x * 10.0));
    gl_FragColor = vec4(vec3(distortedUV.x, distortedUV.y, 0.5), 1.0);
}
`

let random_03 = `
uniform float time;

void main() {
    vec2 u_resolution = vec2(800.0, 600.0);
    vec2 p = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.y, u_resolution.x);
    float d = length(p);
    float color = 0.5 + 0.5 * cos(20.0 * d - time * 5.0);
    gl_FragColor = vec4(vec3(color), 1.0);
}
`

let random_04 = `
uniform float time;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 u_resolution = vec2(800.0, 600.0);
    vec2 p = gl_FragCoord.xy / u_resolution;
    float color = noise(p + time * 0.0001);
    gl_FragColor = vec4(vec3(color), 1.0);
}
`

let random_05 = `
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = vec3(0.105 + 1.5 * cos(time + uv.xyx * 2.0 + vec3(1, 2, 14)));
    gl_FragColor = vec4(color, 1.0);
}
`

let random_06 =`
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / resolution.y;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x) + time;
    float radius = dist * sin(time * 2.0);
    vec2 pos = radius * vec2(cos(angle), sin(angle));
    gl_FragColor = vec4(0.5 + 0.5 * sin(time + pos.x * 10.0),
                        0.5 + 0.5 * cos(time + pos.y * 10.0),
                        0.5 + 0.5 * sin(time + dist * 20.0),
                        1.0);
}
`

let random_07 = `
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 mirroredUV = abs(uv - 0.5) * 2.0;
    gl_FragColor = vec4(mirroredUV, 0.5 + 0.5 * sin(time), 1.0);
}` 

let random_08 = `
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float r = mod(time + uv.x * 50.0, 1.0);
    float g = mod(time + uv.y * 50.0, 1.0);
    float b = mod(time + (uv.x + uv.y) * 25.0, 1.0);
    gl_FragColor = vec4(r, g, b, 1.0);
}
`

let randomCodes = [random_01, random_02, random_03, random_04, random_05, random_06, random_07, random_08]