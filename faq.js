document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  let suppressClick = false; // 🔑 prevent clicks after double-tap

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    const chat = item.querySelector(".faq-chat");

    let lastTap = 0; 
    let clickTimeout; 

    // ----- Single click expands/collapses -----
    questionBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (suppressClick) {
        suppressClick = false; // reset
        return; // 🚫 skip single-click after double-tap
      }

      if (clickTimeout) clearTimeout(clickTimeout);

      clickTimeout = setTimeout(() => {
        const isActive = item.classList.contains("active");

        // Close all others
        faqItems.forEach(i => {
          if (i !== item) {
            i.classList.remove("active");
            const iChat = i.querySelector(".faq-chat");
            if (iChat) iChat.style.display = "none";
          }
        });

        if (isActive) {
          item.classList.remove("active");
          if (chat) chat.style.display = "none";
        } else {
          item.classList.add("active");
          if (chat) chat.style.display = "flex";

          // ✅ Scroll logic
          setTimeout(() => {
            const rect = item.getBoundingClientRect();
            const questionRect = questionBtn.getBoundingClientRect();
            const itemHeight = rect.height;
            const viewportHeight = window.innerHeight;

            let targetScroll;

            if (itemHeight < viewportHeight * 0.9) {
              targetScroll =
                rect.top + window.scrollY - (viewportHeight / 2) + itemHeight / 2;
            } else {
              targetScroll = questionRect.top + window.scrollY - 80;
            }

            window.scrollTo({
              top: targetScroll,
              behavior: "smooth"
            });
          }, 100);
        }

        clickTimeout = null;
      }, 250);
    });

    // ----- Double click (desktop) -----
    item.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        if (chat) chat.style.display = "none";
      }
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }
    });

    // ----- Double tap (mobile/tablet) -----
    item.addEventListener("touchend", () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
          if (chat) chat.style.display = "none";
        }
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
        }
        suppressClick = true; // 🚫 block next click after double tap
      }
      lastTap = now;
    });
  });

  // Collapse all when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInside = [...faqItems].some(item => item.contains(e.target));
    if (!clickedInside) {
      faqItems.forEach(item => {
        item.classList.remove("active");
        const chat = item.querySelector(".faq-chat");
        if (chat) chat.style.display = "none";
      });
    }
  });
});
