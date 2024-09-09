# Generador de Visuales
https://kaio-rama.github.io/visualsloosers/

### Para crear código de shaders que funcione en tu aplicación, los usuarios deben conocer los siguientes parámetros e información clave:

1. **Uniformes Disponibles**:
   - `time`: Un valor flotante que representa el tiempo en segundos desde que comenzó la ejecución. Útil para animaciones.
   - `resolution`: Un vector de dos componentes (`vec2`) que representa el tamaño del canvas en píxeles. Se usa para normalizar coordenadas y adaptar el visual a la resolución de la pantalla.

2. **Coordenadas**:
   - `gl_FragCoord.xy`: Coordenadas del fragmento actual en el espacio de pantalla. Combinadas con `resolution`, permiten crear efectos basados en la posición.

3. **Tipos de Datos GLSL**:
   - **Vec2**: Vector de dos componentes (ej. `vec2(1.0, 0.0)`).
   - **Vec3**: Vector de tres componentes, común para colores RGB (ej. `vec3(1.0, 0.0, 0.0)`).
   - **Vec4**: Vector de cuatro componentes, incluyendo alfa (ej. `vec4(1.0, 0.0, 0.0, 1.0)`).

4. **Funciones Comunes**:
   - `sin()`, `cos()`: Funciones trigonométricas útiles para crear patrones ondulados.
   - `length(vec2)`: Calcula la distancia desde el origen, útil para efectos radiales.

5. **Estructura del Shader**:
   - El shader debe contener un `main()` que calcula el color de cada píxel (`gl_FragColor`).

### Ejemplo Básico:
```glsl
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;  // Normaliza las coordenadas
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx * vec3(1.0, 1.0, 1.0));  // Color animado
    gl_FragColor = vec4(color, 1.0);  // Asigna el color al fragmento
}
```

Este código genera un gradiente de color animado. El usuario puede modificar el cálculo de `uv` y `color` para crear diferentes visuales.

Funciones Básicas del Generador de Visuales
1. Función Principal en el Fragment Shader

```glsl
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(color, 1.0);
}
```
   * gl_FragCoord: Proporciona las coordenadas del fragmento actual en la ventana.
   * resolution: Uniforme que indica la resolución del canvas (ancho y alto).
   * time: Uniforme que indica el tiempo en segundos desde que se inició la animación.
   * uv: Coordenadas normalizadas del fragmento (de 0 a 1).
   * color: Color calculado usando una función matemática.
   * gl_FragColor: Color final del fragmento.


Funciones y Parámetros Usables en el Código
1. Uniformes


####uniform vec2 resolution;
        Descripción: La resolución del canvas (ancho y alto).
        Uso: Ajusta la resolución en el shader para que los cálculos de coordenadas y colores se adapten al tamaño del canvas.

####uniform float time;
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
