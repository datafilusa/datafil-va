document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollDownBtn');
  const overlay = document.querySelector('.hero-overlay');
  const video = document.querySelector('.hero-video video');
  const nextSection = document.querySelector('.services');
  const spacing = 30;
  const extraOffset = 15;

  if (!scrollBtn || !overlay || !nextSection) return;

  // Position the scroll button
  function positionScrollButton() {
    if (window.innerWidth < 1100) return;

    const top = overlay.offsetTop + overlay.offsetHeight + spacing - extraOffset;
    scrollBtn.style.top = top + 'px';
    scrollBtn.style.position = 'absolute';
    scrollBtn.style.zIndex = '10';
    scrollBtn.style.display = 'flex';
  }

  // Responsive sizing
  function resizeButton() {
    let btnSize = 44;
    const width = window.innerWidth;

    if (width < 1500) btnSize = 40;
    if (width < 1200) btnSize = 38;
    if (width < 900) btnSize = 36;

    scrollBtn.style.width = scrollBtn.style.height = btnSize + 'px';
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
    resizeButton();
    updateVisibility();
    positionScrollButton();
  }

  window.addEventListener('load', init);
  window.addEventListener('resize', init);
  window.addEventListener('scroll', positionScrollButton);

  const observer = new ResizeObserver(positionScrollButton);
  observer.observe(overlay);

  if (video) {
    video.addEventListener('loadeddata', positionScrollButton);
    video.addEventListener('loadedmetadata', positionScrollButton);
  }
});
