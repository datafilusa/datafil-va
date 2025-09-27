
  // Select the video element
  const video = document.querySelector('.video-card video');

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Play the video when it scrolls into view
        video.currentTime = 0; // Start from the beginning
        video.play();
      } else {
        // Pause the video when it's out of view
        video.pause();
      }
    });
  }, { threshold: 0.5 }); // triggers when 50% of the video is visible

  // Observe the video container
  observer.observe(document.querySelector('.video-card'));
