// ===================
// CANVAS LOADER
// ===================
const canvas = document.getElementById("loaderCanvas");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  canvas.width = 500;
  canvas.height = 500;

  const radius = 200;
  let angle = 0;
  let loadingSpeed = 1.5;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  function drawLoadingCircle() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, (Math.PI * 2) * (angle / 360));
    ctx.strokeStyle = "#7FFFD4";
    ctx.lineWidth = 6;
    ctx.stroke();

    angle += loadingSpeed;

    if (angle <= 360) {
      requestAnimationFrame(drawLoadingCircle);
    } else {
      expandLoader();
    }
  }

  function expandLoader() {
    canvas.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
    canvas.style.opacity = "0";

    setTimeout(() => {
      canvas.style.display = "none";

      const finalCircle = document.getElementById("finalCircle");
      const imgLeft = document.getElementById("imgLeft");
      const imgRight = document.getElementById("imgRight");
      const navbar = document.querySelector(".navbar");
      const menuToggle = document.querySelector(".menu-toggle");

      finalCircle.style.display = "flex";

      imgLeft.style.display = "block";
      imgRight.style.display = "block";
      navbar.style.opacity = "1";
      menuToggle.style.opacity = "1";

      setTimeout(() => {
        imgLeft.style.opacity = "1";
        imgRight.style.opacity = "1";
      }, 100);

      // Iniciar animación de rebote después del loader
      animarRebote();
    }, 800);
  }

  // Iniciar cuando cargue todo
  window.addEventListener('load', drawLoadingCircle);
}

// ===================
// REBOTE PELOTA NAVBAR
// ===================
const menuToggle = document.querySelector('.menu-toggle');

const bounceAnimations = ['bounce1', 'bounce2', 'bounce3'];
let currentBounce = 0;

function animarRebote() {
  if (!menuToggle) return;

  if (currentBounce >= bounceAnimations.length) {
    menuToggle.classList.remove(...bounceAnimations);
    menuToggle.classList.add('final-slide');

    setTimeout(() => {
      menuToggle.classList.remove('final-slide');
      menuToggle.classList.add('sombra-activa');

      menuToggle.style.setProperty('--pelota-opacity', '0');
    }, 1000);
    return;
  }

  menuToggle.classList.remove(...bounceAnimations);
  menuToggle.classList.add(bounceAnimations[currentBounce]);
  menuToggle.classList.remove('sombra-activa');

  setTimeout(() => {
    currentBounce++;
    animarRebote();
  }, 800);
}
