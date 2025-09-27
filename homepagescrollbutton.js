document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollDownBtn');
  const overlay = document.querySelector('.hero-overlay');
  const nextSection = document.querySelector('.services');
  const spacing = 20; // Reduced px between overlay and scroll button to move it up
  const extraOffset = 10; // Additional upward shift

  if (!scrollBtn || !overlay || !nextSection) return;

  const arrowSpan = scrollBtn.querySelector('.double-v');

  // Position the scroll button
  function positionScrollButton() {
    if (window.innerWidth < 1100) return;

    const top = overlay.offsetTop + overlay.offsetHeight + spacing - extraOffset;
    scrollBtn.style.top = top + 'px';
    scrollBtn.style.position = 'absolute';
    scrollBtn.style.zIndex = '10';
    scrollBtn.style.display = 'flex';
  }

  // Resize the arrow
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

    const existingStyle = document.getElementById('dynamicArrowStyle');
    if (existingStyle) existingStyle.remove();

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

  // Show/hide button based on width
  function updateVisibility() {
    if (window.innerWidth < 1100) {
      scrollBtn.style.display = 'none';
    } else {
      positionScrollButton();
    }
  }

  // Scroll to next section
  scrollBtn.addEventListener('click', () => {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Initialize
  function init() {
    resizeArrow();
    updateVisibility();
    positionScrollButton();
  }

  // Run after everything (images, videos) loads
  window.addEventListener('load', init);

  // Adjust on resize
  window.addEventListener('resize', init);

  // Adjust on scroll
  window.addEventListener('scroll', positionScrollButton);

  // Observe overlay for dynamic size changes
  const observer = new ResizeObserver(positionScrollButton);
  observer.observe(overlay);
});
