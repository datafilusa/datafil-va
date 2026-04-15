// Select the video element
const video = document.querySelector('.video-card video');

if (video) {
  // Add smooth transitions
  video.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s ease';
  video.style.opacity = '0.7';

  // Create enhanced Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade in, scale up, and play
        video.currentTime = 0;
        video.style.opacity = '1';
        video.style.transform = 'scale(1)';
        video.play().catch(err => console.log('Autoplay prevented:', err));
      } else {
        // Fade out, scale down, and pause
        video.style.opacity = '0.7';
        video.style.transform = 'scale(0.98)';
        video.pause();
      }
    });
  }, { 
    threshold: 0.5,
    rootMargin: '0px'
  });

  // Observe the video container
  const videoCard = document.querySelector('.video-card');
  if (videoCard) {
    observer.observe(videoCard);
  }
}
