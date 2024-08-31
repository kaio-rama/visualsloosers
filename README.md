# Generador de Visuales
https://kaio-rama.github.io/visualsloosers/

Funciones Básicas del Generador de Visuales
1. Función Principal en el Fragment Shader

glsl

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(color, 1.0);
}

    gl_FragCoord: Proporciona las coordenadas del fragmento actual en la ventana.
    resolution: Uniforme que indica la resolución del canvas (ancho y alto).
    time: Uniforme que indica el tiempo en segundos desde que se inició la animación.
    uv: Coordenadas normalizadas del fragmento (de 0 a 1).
    color: Color calculado usando una función matemática.
    gl_FragColor: Color final del fragmento.

Funciones y Parámetros Usables en el Código
1. Uniformes

    uniform vec2 resolution;:
        Descripción: La resolución del canvas (ancho y alto).
        Uso: Ajusta la resolución en el shader para que los cálculos de coordenadas y colores se adapten al tamaño del canvas.

    uniform float time;:
        Descripción: Tiempo en segundos desde el inicio de la animación.
        Uso: Permite la animación y la creación de efectos dinámicos basados en el tiempo.

2. Funciones Matemáticas en GLSL

En el fragment shader, puedes usar varias funciones matemáticas para crear efectos visuales:

    sin(x): Seno de x.
    cos(x): Coseno de x.
    abs(x): Valor absoluto de x.
    mod(x, y): Resto de x dividido por y.
    mix(x, y, a): Interpolación lineal entre x y y usando a como el factor de mezcla.
    smoothstep(edge0, edge1, x): Función de interpolación suave entre 0 y 1 en el intervalo [edge0, edge1].

3. Ejemplos de Código para el Editor

Puedes escribir fragment shaders en el editor de código para generar diferentes efectos visuales. Aquí algunos ejemplos básicos:

    Colores Cambiantes:

    glsl

precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(color, 1.0);
}

Efecto de Ondas:

glsl

precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float wave = sin(10.0 * uv.y + time);
    vec3 color = vec3(uv.x, wave, 1.0 - uv.y);
    gl_FragColor = vec4(color, 1.0);
}

Gradiente Radial:

glsl

    precision mediump float;
    uniform float time;
    uniform vec2 resolution;

    void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        float dist = length(uv - vec2(0.5));
        vec3 color = vec3(1.0, 0.5 + 0.5 * cos(time), 1.0 - dist);
        gl_FragColor = vec4(color, 1.0);
    }

Cómo Utilizar estas Funciones

    Modificar el Fragment Shader:
        Escribe tu código en el área del editor. Usa las variables uniformes (resolution, time) y funciones matemáticas para crear efectos visuales.
        Ejemplos proporcionados pueden ser copiados y pegados en el editor para ver cómo afectan el canvas.

    Interacción con el Código:
        Run Code Button: Compila y aplica el código del fragment shader escrito en el editor al canvas.
        Puedes ajustar el código en tiempo real y ver los cambios directamente en el canvas.

Consideraciones Adicionales

    Errores en el Shader: Si el código GLSL contiene errores, el shader puede no compilar correctamente. Asegúrate de que el código no tenga errores de sintaxis.
    Performance: Los cálculos complejos pueden afectar el rendimiento, especialmente en dispositivos con menos potencia de procesamiento.




FAQs

¿Cómo se puede ajustar la resolución? Ajusta el tamaño del lienzo en el archivo script.js.

¿Puedo guardar mis visuales? Sí, puedes usar la opción de exportar en la interfaz.

markdown


### Paso 4: Pruebas y Despliegue

1. **Pruebas**: Asegúrate de probar todas las funcionalidades en diferentes navegadores y dispositivos.
2. **Despliegue**: Sube los cambios a tu repositorio de GitHub y verifica que GitHub Pages esté configurado correctamente.
