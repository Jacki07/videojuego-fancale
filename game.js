// Seleccionamos el personaje (fantasma) para manipular su movimiento
const fantasma = document.getElementById('fantasma');

// Variables para la posición inicial del personaje y su velocidad en los ejes X e Y
let posX = 0;   // Posición inicial en el eje X (horizontal)
let posY = 0;   // Posición inicial en el eje Y (vertical)
let velX = 0;   // Velocidad inicial en el eje X
let velY = 0;   // Velocidad inicial en el eje Y
let velocidadMax = 15;  // Límite de velocidad máxima para evitar que el personaje se mueva demasiado rápido
let aceleracion = 0.5;  // Valor de aceleración, cuanto mayor es, más rápido aumenta la velocidad
let friccion = 0.9;     // Fricción para desacelerar el movimiento cuando se suelta una tecla

// Guardamos el estado de las teclas presionadas en este objeto (true cuando está presionada)
let teclasPresionadas = {};

// Función para escuchar cuando una tecla es presionada
document.addEventListener('keydown', (event) => {
    teclasPresionadas[event.key] = true;  // Establece la tecla como "presionada" (true)
});

// Función para escuchar cuando una tecla es soltada
document.addEventListener('keyup', (event) => {
    teclasPresionadas[event.key] = false; // Establece la tecla como "no presionada" (false)
});

// Función principal que maneja el movimiento del personaje
function moverFantasma() {
    // Si se presiona la tecla 'ArrowUp' (arriba), aceleramos hacia arriba
    if (teclasPresionadas['ArrowUp']) {
        velY = Math.max(velY - aceleracion, -velocidadMax);  // Reducimos velY para movernos hacia arriba (máximo -velocidadMax)
    } 
    // Si se presiona la tecla 'ArrowDown' (abajo), aceleramos hacia abajo
    else if (teclasPresionadas['ArrowDown']) {
        velY = Math.min(velY + aceleracion, velocidadMax);   // Aumentamos velY para movernos hacia abajo (máximo velocidadMax)
    } 
    // Si no se presiona ninguna tecla vertical, aplicamos fricción para desacelerar
    else {
        velY *= friccion;  // Reducimos velY de manera gradual
    }

    // Si se presiona la tecla 'ArrowLeft' (izquierda), aceleramos hacia la izquierda
    if (teclasPresionadas['ArrowLeft']) {
        velX = Math.max(velX - aceleracion, -velocidadMax);  // Reducimos velX para movernos hacia la izquierda
    } 
    // Si se presiona la tecla 'ArrowRight' (derecha), aceleramos hacia la derecha
    else if (teclasPresionadas['ArrowRight']) {
        velX = Math.min(velX + aceleracion, velocidadMax);   // Aumentamos velX para movernos hacia la derecha
    } 
    // Si no se presiona ninguna tecla horizontal, aplicamos fricción para desacelerar
    else {
        velX *= friccion;  // Reducimos velX de manera gradual
    }

    // Actualizamos la posición del personaje usando las velocidades calculadas
    posX += velX;  // Modificamos la posición horizontal (X)
    posY += velY;  // Modificamos la posición vertical (Y)

    // Limitamos la posición dentro del contenedor del juego para que no se salga de los bordes
    const contenedor = document.querySelector('.fondoGame');
    const maxX = contenedor.offsetWidth - fantasma.offsetWidth;  // Limite derecho
    const maxY = contenedor.offsetHeight - fantasma.offsetHeight; // Limite inferior

    posX = Math.max(0, Math.min(posX, maxX));  // Mantiene posX dentro de los límites
    posY = Math.max(0, Math.min(posY, maxY));  // Mantiene posY dentro de los límites

    // Aplicamos el movimiento usando transform para mover al fantasma con translate
    fantasma.style.transform = `translate(${posX}px, ${posY}px)`;

    // Continuamos el ciclo de animación, llamando a esta función repetidamente
    requestAnimationFrame(moverFantasma);
}

// Iniciamos el movimiento llamando a la función de animación por primera vez
moverFantasma();
