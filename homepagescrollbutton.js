document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollDownBtn');
  const overlay = document.querySelector('.hero-overlay');
  const nextSection = document.querySelector('.services');
  const spacing =20; // Reduced px between overlay and scroll button to move it up
  const extraOffset = 10; // Additional upward shift

  if (!scrollBtn || !overlay || !nextSection) return;

  const arrowSpan = scrollBtn.querySelector('.double-v');

  function positionScrollButton() {
    if (window.innerWidth < 1100) return;

    // Vertical position below overlay with extra offset
    const top = overlay.offsetTop + overlay.offsetHeight + spacing - extraOffset;
    scrollBtn.style.top = top + 'px';

    // Horizontal position handled by CSS
    scrollBtn.style.position = 'absolute';
    scrollBtn.style.zIndex = '10';
    scrollBtn.style.display = 'flex';
  }

  function resizeArrow() {
    let btnSize = 60;
    let arrowBorder = 12;
    const width = window.innerWidth;

    if (width < 1500) { btnSize = 50; arrowBorder = 10; }
    if (width < 1200) { btnSize = 45; arrowBorder = 9; }
    if (width < 900)  { btnSize = 40; arrowBorder = 8; }
    if (width < 600)  { btnSize = 35; arrowBorder = 7; }

    scrollBtn.style.width = scrollBtn.style.height = btnSize + 'px';
    arrowSpan.style.width = arrowSpan.style.height = (arrowBorder * 2) + 'px';

    if (document.getElementById('dynamicArrowStyle')) {
      document.getElementById('dynamicArrowStyle').remove();
    }

    const style = document.createElement('style');
    style.id = 'dynamicArrowStyle';
    style.innerHTML = `
      .scroll-down-btn .double-v::before,
      .scroll-down-btn .double-v::after {
        border-left: ${arrowBorder}px solid transparent;
        border-right: ${arrowBorder}px solid transparent;
        border-top: ${arrowBorder}px solid #2d2d62;
      }
      .scroll-down-btn .double-v::after {
        top: ${arrowBorder}px;
      }
    `;
    document.head.appendChild(style);
  }

  function updateVisibility() {
    if (window.innerWidth < 1100) {
      scrollBtn.style.display = 'none';
    } else {
      positionScrollButton();
    }
  }

  scrollBtn.addEventListener('click', () => {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });

  function init() {
    resizeArrow();
    updateVisibility();
    positionScrollButton();
  }

  window.requestAnimationFrame(() => setTimeout(init, 50));

  window.addEventListener('resize', init);
  window.addEventListener('scroll', positionScrollButton);
});
