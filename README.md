# Generador de Visuales

## Introducción
Esta aplicación permite generar visuales interactivos y aplicar transformaciones a imágenes. Incluye una función de zoom infinito basada en fractales.

## Cómo Usar

### Modificación de Imágenes
- Arrastra y suelta imágenes en el área designada para modificarlas.

### Generación de Visuales
- Utiliza los controles en la interfaz para ajustar los parámetros y ver cómo cambian los visuales.
 - La visualización principal utiliza fractales Mandelbrot. Puedes ajustar varios parámetros para modificar el resultado en tiempo real.

### Funcionalidades

- **Zoom**: Ajusta el zoom del fractal utilizando el control deslizante de zoom.
- **Desplazamiento**: Modifica el desplazamiento en el eje X y Y con los controles deslizantes correspondientes.
- **Iteraciones**: Cambia el número de iteraciones para modificar la complejidad y detalle del fractal.
- **Desplazamiento de Color**: Ajusta el desplazamiento de color para cambiar la paleta de colores.
- **Restablecer**: Usa el botón "Reset" para volver a los valores predeterminados.

### Controles

- **Zoom Slider**: Ajusta el nivel de zoom del fractal.
- **Offset X Slider**: Modifica el desplazamiento horizontal del fractal.
- **Offset Y Slider**: Modifica el desplazamiento vertical del fractal.
- **Iterations Slider**: Cambia el número de iteraciones para calcular el fractal.
- **Hue Slider**: Ajusta el desplazamiento del color para cambiar los tonos.
- **Reset Button**: Restablece todos los parámetros a sus valores iniciales.

## Ejemplos
```javascript
// Ejemplo de ajuste del zoom
function draw() {
    background(0);
    translate(width / 2, height / 2);
    scale(zoom); // Zoom ajustable
    translate(offsetX, offsetY); // Desplazamiento ajustable

    // Fractal Mandelbrot
    drawMandelbrot();
}





```
FAQs

¿Cómo se puede ajustar la resolución? Ajusta el tamaño del lienzo en el archivo script.js.

¿Puedo guardar mis visuales? Sí, puedes usar la opción de exportar en la interfaz.

markdown


### Paso 4: Pruebas y Despliegue

1. **Pruebas**: Asegúrate de probar todas las funcionalidades en diferentes navegadores y dispositivos.
2. **Despliegue**: Sube los cambios a tu repositorio de GitHub y verifica que GitHub Pages esté configurado correctamente.

Con estos pasos, deberías estar en camino para crear una aplicación web efectiva y un manual de uso útil para tus usuarios. ¿Te gustaría profundizar en algún paso en particular?

Dijiste:

