// 1. Selección de elementos del DOM
const container = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');
const mensaje = document.getElementById('mensajeInicial')

// 2. Variables de Estado
let playerX = 180;
const playerSpeed = 15;
let score = 0;
let gameOver = false;
let gameInterval;
let bugSpawnInterval;
let bestScore = 0;

// 3. Controles del Teclado
document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  if ((e.key === 'ArrowLeft' || e.key === 'a') && playerX > 0) {
    playerX -= playerSpeed;
  }
  if ((e.key === 'ArrowRight' || e.key === 'd') && playerX < container.clientWidth - 40) {
    playerX += playerSpeed;
  }
  
  player.style.left = `${playerX}px`;
});

// 4. Función utilitaria para detectar colisión entre 2 elementos del DOM
function checkCollision(elem1, elem2) {
    const r1 = elem1.getBoundingClientRect();
  const r2 = elem2.getBoundingClientRect();

  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

// 5. TODO por los alumnos:
// - Función para crear bugs periódicamente (`document.createElement`)
function crearBugs(){

    const nuevoDiv= document.createElement("div");

    nuevoDiv.textContent = "💎";
    nuevoDiv.style.position = "absolute";
    nuevoDiv.style.top = "0px";
    nuevoDiv.style.left = Math.random() * (container.clientWidth - 40) + "px";
    nuevoDiv.style.width = "40px";
    nuevoDiv.style.height = "40px";
    nuevoDiv.style.fontSize = "30px";

    container.appendChild(nuevoDiv);
    let posicionY = 0;

    const caida = setInterval(() => {
        posicionY += 5;
        nuevoDiv.style.top = posicionY + "px";

        if (posicionY > container.clientHeight) {
            nuevoDiv.remove();
            clearInterval(caida);

        }

        if(checkCollision(nuevoDiv,player)){
            nuevoDiv.remove();
            score += 1;
            bestScore += 1;
            highScoreEl.innerHTML = bestScore;
            scoreEl.innerHTML = score;
            perdida();
        }
    }, 30);

    

}

function crearMalicioso(){
    const divMalicioso = document.createElement("div");

    divMalicioso.textContent = "❌";
    divMalicioso.style.position = "absolute";
    divMalicioso.style.top = "0px";
    divMalicioso.style.left = Math.random() * (container.clientWidth - 100) + "px";
    divMalicioso.style.width = "40px";
    divMalicioso.style.height = "40px";
    divMalicioso.style.fontSize = "30px";

    container.appendChild(divMalicioso);
    let posicionY = 0;

    const caida = setInterval(() => {
        posicionY += 7;
        divMalicioso.style.top = posicionY + "px";

        if (posicionY > container.clientHeight) {
            divMalicioso.remove();
            clearInterval(caida);
        }

        if(checkCollision(divMalicioso,player)){
            divMalicioso.remove();
            score -= 1;
            scoreEl.innerHTML = score;
            perdida();
        }
    }, 30);

}

setTimeout(() => {
  mensaje.remove();
  bugSpawnInterval = setInterval(() => {
    crearBugs();
}, 2000);

maliciosoSpawn = setInterval(() => {
    crearMalicioso();
}, 3000);


}, 1500) 



function perdida(){
  if (score <= 0){
    const pantallaOver = document.createElement("div");

    pantallaOver.textContent = "GAME OVER";
    pantallaOver.style.position = "absolute";
    pantallaOver.style.left = "110px";
    pantallaOver.style.top = "215px";
    pantallaOver.style.fontSize = "30px";


    container.appendChild(pantallaOver);
    player.innerHTML = "☠️";
    clearInterval(bugSpawnInterval);
    clearInterval(maliciosoSpawn);
  }
}




document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        playerX -= playerSpeed;
    }

    if (e.key === "ArrowRight") {
        playerX += playerSpeed;
    }

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > container.clientWidth - 40) {
        playerX = container.clientWidth - 40;
    }

    player.style.left = playerX + "px";
});



// - Mover los bugs hacia abajo en un intervalo/frame
// - Comprobar colisión con `checkCollision(player, bug)
// - Actualizar puntuación y gestionar Game Over