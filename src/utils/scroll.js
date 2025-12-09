// src/utils/scroll.js

// Función de Easing para que el movimiento sea suave (arranca despacio, acelera, frena suave)
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

export const smoothScrollTo = (targetId, duration = 1500) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  // Calculamos la posición considerando el Header fijo (60px) + un poco de aire extra (20px)
  const headerOffset = 80; 
  const elementPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const offsetPosition = elementPosition + startPosition - headerOffset;

  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    const run = easeInOutQuad(timeElapsed, startPosition, offsetPosition - startPosition, duration);
    
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};